import { runAllScrapers } from '../lib/scrapers'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function test() {
  console.log('--- Starting Scraper Test ---')
  try {
    const result = await runAllScrapers()
    console.log('Scraper Result:', result)
  } catch (error) {
    console.error('Scraper failed:', error)
  }
  console.log('--- Test Complete ---')
}

test()
