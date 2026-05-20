import { createAdminClient } from '@/lib/supabase/admin'

export async function isDuplicate(title: string, sourceUrl: string): Promise<boolean> {
  const supabase = createAdminClient()
  
  // Check if an opportunity with the same source URL already exists
  const { data, error } = await supabase
    .from('opportunities')
    .select('id')
    .eq('source_url', sourceUrl)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    console.error('Error checking duplicate:', error)
  }

  return !!data
}
