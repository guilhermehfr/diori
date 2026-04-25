import { runCleanup } from '@/src/lib/cleanup'

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    await runCleanup()
  } catch (error) {
    console.error('Error during cleanup: ', error)
    return new Response('Internal Server Error', { status: 500 })
  }

  return new Response('Cleanup completed successfully', { status: 200 })
}
