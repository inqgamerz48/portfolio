'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-[#050507] text-[#e8e4f0]">
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h2 className="font-display text-6xl mb-4">Error</h2>
            <p className="text-[#8e8ea0] mb-8">
              A critical error occurred. Please try again.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 border border-[#c41230] text-[#e8e4f0] text-sm uppercase tracking-widest hover:bg-[#c41230] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
