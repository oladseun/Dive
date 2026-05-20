import type { Database } from '@/types/database'

type OpportunityInsert = Database['public']['Tables']['opportunities']['Insert']

export interface RawOpportunity {
  title: string
  description?: string
  url: string
  type: string
  deadline?: string
  region?: string
  tags?: string[]
  requirements?: string[]
  fee?: number
  fee_currency?: string
}

export function normalizeOpportunity(raw: RawOpportunity): OpportunityInsert {
  const parseDeadline = (d?: string) => {
    if (!d) return null
    const date = new Date(d)
    return isNaN(date.getTime()) ? null : date.toISOString()
  }

  const processedTags = [
    ...(raw.tags || [])
  ].filter(Boolean)
   .filter((tag, index, self) => self.indexOf(tag) === index)
   .slice(0, 3)

  return {
    title: raw.title,
    type: raw.type || 'Scholarship',
    deadline: parseDeadline(raw.deadline),
    source_url: raw.url,
    region: raw.region || 'Global',
    tags: processedTags,
    requirements: raw.requirements || [],
    description: raw.description || null,
    fee: raw.fee || 0,
    fee_currency: raw.fee_currency || 'USD',
    is_active: true,
    is_featured: false,
  }
}
