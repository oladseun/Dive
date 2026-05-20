import { createAdminClient } from '../lib/supabase/admin'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function checkCount() {
  const supabase = createAdminClient()
  const { count, error } = await supabase
    .from('opportunities')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error:', error)
  } else {
    console.log(`Total opportunities: ${count}`)
  }
}

checkCount()
