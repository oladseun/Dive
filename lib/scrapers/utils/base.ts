import { RawOpportunity } from './normalize'

export interface ScraperResult {
  source: string
  opportunities: RawOpportunity[]
  count: number
}

export abstract class BaseScraper {
  abstract name: string
  abstract scrape(): Promise<ScraperResult>
}
