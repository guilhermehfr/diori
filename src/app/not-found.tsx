import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <title>Page Not Found</title>
      <div className="text-center">
        <p className="text-base font-extrabold text-slate-500">404</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-slate-600 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-slate-900 px-3.5 py-2.5 text-sm font-bold text-slate-100 shadow-xs hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Go back home
          </Link>
          <Link
            href="https://git.new/vB5S7Cg"
            className="text-sm font-bold text-slate-700 hover:text-slate-900"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
