import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { normalizeOpportunity } from '@/lib/scrapers/utils/normalize'
import { isDuplicate } from '@/lib/scrapers/utils/dedup'
import { enrichOpportunity } from '@/lib/scrapers/utils/enrich'

export async function POST(request: Request) {
  const secret = request.headers.get('x-composio-secret')
  
  // Basic protection
  if (process.env.COMPOSIO_WEBHOOK_SECRET && secret !== process.env.COMPOSIO_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await request.json()
    console.log('Received Composio webhook:', payload)

    // Composio payloads can vary depending on the trigger.
    // We expect the trigger to provide at least a title and URL.
    // If it's a social post, we might need to extract the title.
    
    const rawData = {
      title: payload.title || payload.text?.substring(0, 100) || 'New Opportunity',
      description: payload.description || payload.text || '',
      url: payload.url || payload.link || '',
      type: payload.type || 'Other',
      tags: payload.tags || [],
      region: payload.region || 'Global',
    }

    if (!rawData.url) {
      return NextResponse.json({ error: 'Missing source URL' }, { status: 400 })
    }

    if (await isDuplicate(rawData.title, rawData.url)) {
      return NextResponse.json({ success: true, message: 'Duplicate skipped' })
    }

    const supabase = createAdminClient()
    
    // Enrich with AI for consistency
    const enriched = await enrichOpportunity(rawData.title, rawData.description)
    
    const normalized = normalizeOpportunity({
      ...rawData,
      tags: [...(rawData.tags || []), ...enriched.tags],
      requirements: enriched.requirements,
      deadline: enriched.deadline || undefined,
      region: enriched.region || rawData.region,
    })

    const { error } = await (supabase
      .from('opportunities') as any)
      .insert([normalized])

    if (error) throw error

    return NextResponse.json({ success: true, id: normalized.title })
  } catch (error: any) {
    console.error('Webhook processing failed:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
