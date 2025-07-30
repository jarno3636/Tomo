// app/not-found.tsx

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-5xl font-bold text-purple-600 mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! That Tomagotchu page doesn’t exist.
      </p>
      <Link
        href="/"
        className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
      >
        Go back home 🐸
      </Link>
    </div>
  )
}
