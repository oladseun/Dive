import Parser from 'rss-parser'
import { BaseScraper, ScraperResult } from '../utils/base'
import { RawOpportunity } from '../utils/normalize'

export class YouthOpportunitiesScraper extends BaseScraper {
  name = 'Youth Opportunities'
  private feedUrl = 'https://www.youthop.com/feed'
  private parser = new Parser()

  async scrape(): Promise<ScraperResult> {
    try {
      const feed = await this.parser.parseURL(this.feedUrl)
      const opportunities: RawOpportunity[] = feed.items.map(item => {
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
    if (text.includes('workshop') || text.includes('conference')) return 'Workshop'
    if (text.includes('contest') || text.includes('competition')) return 'Competition'
    return 'Other'
  }

  private extractDeadline(text: string): string | undefined {
    const dateRegex = /(?:deadline|closing date|apply by):\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i
    const match = text.match(dateRegex)
    return match ? match[1] : undefined
  }
}
