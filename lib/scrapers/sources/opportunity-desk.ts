import Parser from 'rss-parser'
import { BaseScraper, ScraperResult } from '../utils/base'
import { RawOpportunity } from '../utils/normalize'

export class OpportunityDeskScraper extends BaseScraper {
  name = 'Opportunity Desk'
  private feedUrl = 'https://opportunitydesk.org/feed/'
  private parser = new Parser()

  async scrape(): Promise<ScraperResult> {
    try {
      const feed = await this.parser.parseURL(this.feedUrl)
      const opportunities: RawOpportunity[] = feed.items.map(item => {
        // Basic extraction from RSS item
        const type = this.detectType(item.title || '', item.categories || [])
        
        return {
          title: item.title || 'Untitled Opportunity',
          url: item.link || '',
          description: item.contentSnippet || '',
          type: type,
          deadline: this.extractDeadline(item.contentSnippet || ''),
          tags: item.categories || [],
        }
      })

      return {
        source: this.name,
        opportunities,
        count: opportunities.length
      }
    } catch (error) {
      console.error(`Error scraping ${this.name}:`, error)
      return { source: this.name, opportunities: [], count: 0 }
    }
  }

  private detectType(title: string, categories: string[]): string {
    const text = (title + ' ' + categories.join(' ')).toLowerCase()
    if (text.includes('scholarship')) return 'Scholarship'
    if (text.includes('grant')) return 'Grant'
    if (text.includes('fellowship')) return 'Fellowship'
    if (text.includes('internship')) return 'Internship'
    if (text.includes('contest') || text.includes('competition')) return 'Competition'
    return 'Other'
  }

  private extractDeadline(text: string): string | undefined {
    // Simple regex for common date formats in descriptions
    // This is a placeholder, real extraction would use AI or more robust patterns
    const dateRegex = /(?:deadline|closing date|apply by):\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i
    const match = text.match(dateRegex)
    return match ? match[1] : undefined
  }
}
