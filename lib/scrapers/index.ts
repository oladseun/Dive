import { createAdminClient } from '@/lib/supabase/admin'
import { OpportunityDeskScraper } from './sources/opportunity-desk'
import { YouthOpportunitiesScraper } from './sources/youth-opportunities'
import { normalizeOpportunity } from './utils/normalize'
import { isDuplicate } from './utils/dedup'
import { enrichOpportunity } from './utils/enrich'

export async function runAllScrapers() {
  const scrapers = [
    new OpportunityDeskScraper(),
    new YouthOpportunitiesScraper(),
  ]

  const supabase = createAdminClient()
  let totalNew = 0

  // Run all scrapers in parallel
  const scraperResults = await Promise.all(
    scrapers.map(async (scraper) => {
      console.log(`Starting scraper: ${scraper.name}`)
      try {
        const result = await scraper.scrape()
        return { scraperName: scraper.name, opportunities: result.opportunities }
      } catch (error) {
        console.error(`Scraper ${scraper.name} failed:`, error)
        return { scraperName: scraper.name, opportunities: [] }
      }
    })
  )

  // Process all opportunities from all scrapers
  for (const { scraperName, opportunities } of scraperResults) {
    // Process each scraper's results
    // We process these sequentially per scraper to avoid hitting DB/AI limits too hard, 
    // but the scrapers themselves ran in parallel.
    for (const raw of opportunities) {
      if (await isDuplicate(raw.title, raw.url)) {
        continue
      }

      console.log(`Enriching: ${raw.title}`)
      
      try {
        const enriched = await enrichOpportunity(raw.title, raw.description || '')

        if (enriched.scamScore !== undefined && enriched.scamScore >= 7) {
          console.log(`Skipping likely scam (Score ${enriched.scamScore}): ${raw.title}`)
          continue
        }

        const normalized = normalizeOpportunity({
          ...raw,
          tags: [...(raw.tags || []), ...enriched.tags],
          requirements: enriched.requirements,
          deadline: enriched.deadline || raw.deadline,
          region: enriched.region || raw.region,
        })

        const { error } = await (supabase
          .from('opportunities') as any)
          .insert([normalized])

        if (error) {
          console.error(`Error inserting opportunity from ${scraperName}:`, error)
        } else {
          totalNew++
        }
      } catch (error) {
        console.error(`Failed to process opportunity "${raw.title}":`, error)
      }
    }
  }

  return {
    success: true,
    totalNew,
    timestamp: new Date().toISOString()
  }
}
