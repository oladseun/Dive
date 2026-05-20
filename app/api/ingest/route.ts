import { NextResponse } from 'next/server'
import { runAllScrapers } from '@/lib/scrapers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  // Basic protection - in production this should use a proper secret from env
  if (process.env.CRON_SECRET && key !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('Starting manual ingestion trigger...')
    const result = await runAllScrapers()
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Ingestion failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

// Support POST as well for cron services that prefer it
export async function POST(request: Request) {
  const key = request.headers.get('x-api-key') || new URL(request.url).searchParams.get('key')

  if (process.env.CRON_SECRET && key !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await runAllScrapers()
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
