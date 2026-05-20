'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { triggerIngest } from '@/app/dashboard/feed/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function RefreshButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRefresh = async () => {
    setIsLoading(true)
    const toastId = toast.loading('Searching for new opportunities...')
    
    try {
      const result = await triggerIngest()
      if (result.totalNew > 0) {
        toast.success(`Found ${result.totalNew} new opportunities!`, { id: toastId })
        router.refresh()
      } else {
        toast.info('No new opportunities found at this moment.', { id: toastId })
      }
    } catch (error) {
      toast.error('Failed to search for updates. Please try again.', { id: toastId })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={handleRefresh}
      disabled={isLoading}
      className="gap-2"
    >
      <svg 
        className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {isLoading ? 'Searching...' : 'Check for Updates'}
    </Button>
  )
}
