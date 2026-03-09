'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
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
    <div className="min-h-screen flex items-center justify-center bg-void px-6">
      <div className="text-center max-w-md">
        <h2 className="font-display text-6xl text-parchment mb-4">Oops</h2>
        <p className="text-mist mb-8">
          Something went wrong. The page encountered an unexpected error.
        </p>
        <Button
          onClick={() => reset()}
          className="btn-primary"
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
