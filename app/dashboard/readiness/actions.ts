'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleDocument(docType: string, isReady: boolean) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  if (isReady) {
    // Mark as ready (insert metadata)
    await (supabase.from('documents') as any).insert({
      user_id: user.id,
      doc_type: docType,
      file_name: docType, // Placeholder
      file_url: '#',      // Placeholder for No-Storage MVP
    })
  } else {
    // Mark as missing (delete metadata)
    await (supabase.from('documents') as any).delete().eq('user_id', user.id).eq('doc_type', docType)
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/readiness')
}
