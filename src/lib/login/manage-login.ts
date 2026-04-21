import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { redirect } from 'next/navigation'

const jwtSecretKey: string | undefined = process.env.JWT_SECRET_KEY
if (!jwtSecretKey) throw new Error('JWT_SECRET_KEY enviroment variable is not defined')

const jwtEncodedKey: Uint8Array = new TextEncoder().encode(jwtSecretKey)

const loginExpSeconds: number = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400
const loginExpString: string = process.env.LOGIN_EXPIRATION_STRING || '1d'
const loginCookieName: string = process.env.LOGIN_COOKIE_NAME || 'loginSession'

export type JwtPayload = {
  username: string
  expiresAt: Date
}

export async function hashPassword(password: string): Promise<string> {
  const hash: string = await bcrypt.hash(password, 10)
  const base64Hash: string = Buffer.from(hash).toString('base64')
  return base64Hash
}

export async function verifyPassword(password: string, base64Hash: string): Promise<boolean> {
  const hash: string = Buffer.from(base64Hash, 'base64').toString('utf-8')
  return bcrypt.compare(password, hash)
}

export async function createLoginSession(username: string): Promise<void> {
  const expiresAt: Date = new Date(Date.now() + loginExpSeconds * 1000)
  const loginSession: string = await signJwt({ username, expiresAt })
  const cookieStore = await cookies()
  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  })
}

export async function deleteLoginSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(loginCookieName, '', { expires: new Date(0) })
  cookieStore.delete(loginCookieName)
}

export async function getLoginSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies()
  const token: string | undefined = cookieStore.get(loginCookieName)?.value

  return token ? await verifyJwt(token) : null
}

export async function verifyLoginSession(): Promise<boolean | null> {
  if (process.env.SHOWCASE_MODE === 'true') return true

  const loginSession = await getLoginSession()

  if (!loginSession) return null

  return loginSession.username === process.env.LOGIN_USERNAME
}

export async function requireLoginSessionOrRedirect(): Promise<void> {
  if (process.env.SHOWCASE_MODE === 'true') return

  const loginSession = await getLoginSession()

  if (!loginSession) redirect('/admin/login')
}

export async function signJwt(jwtPayload: JwtPayload): Promise<string> {
  return new SignJWT(jwtPayload as unknown as JWTPayload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(loginExpString)
    .sign(jwtEncodedKey)
}

export async function verifyJwt(token: string | undefined = ''): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, jwtEncodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('JWT verification failed: ', error)
    return null
  }
}
