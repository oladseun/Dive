'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center px-4">
          <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-4xl mb-2">
            ⚠️
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Interruption</h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              We encountered an unexpected error while processing your request. Our intelligence team has been notified.
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="primary" 
              onClick={() => window.location.reload()}
            >
              Reload Platform
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard'}
            >
              Return Home
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-8 p-4 bg-slate-50 rounded-xl text-left text-[10px] text-red-600 overflow-auto max-w-full font-mono border border-red-100">
              {this.state.error?.message}
            </pre>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
