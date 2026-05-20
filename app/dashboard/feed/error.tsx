'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'

export default function FeedError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Feed Error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-2xl">
        ⚠️
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
        <p className="text-slate-500 text-sm max-w-xs mx-auto">
          We encountered an error while loading the discovery feed. This might be a temporary connection issue.
        </p>
      </div>
      <Button 
        variant="secondary" 
        onClick={() => reset()}
      >
        Try Again
      </Button>
    </div>
  )
}
