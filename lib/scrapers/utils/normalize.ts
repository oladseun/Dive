import type { Database } from '@/types/database'

type OpportunityInsert = Database['public']['Tables']['opportunities']['Insert']

export function normalizeOpportunity(raw: Record<string, unknown>): OpportunityInsert {
  // Normalize scraped data to opportunities table shape
  throw new Error('Not implemented')
}
