import { runReseed } from '@/src/lib/reseed'

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    await runReseed()
  } catch (error) {
    console.error('Error during reseed: ', error)
    return new Response('Internal Server Error', { status: 500 })
  }

  return new Response('Reseed completed successfully', { status: 200 })
}