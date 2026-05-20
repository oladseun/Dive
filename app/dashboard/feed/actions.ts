'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database'
import { revalidatePath } from 'next/cache'
import { runAllScrapers } from "@/lib/scrapers";

export async function saveOpportunity(opportunityId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { error } = await (supabase.from('saved_opportunities') as any).insert({
    user_id: user.id,
    opportunity_id: opportunityId,
    status: 'saved'
  })

  if (error) {
    if (error.code === '23505') return // Already saved
    throw error
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/feed')
}

export async function triggerIngest() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await runAllScrapers();
    revalidatePath("/dashboard/feed");
    return result;
  } catch (error: any) {
    console.error("Manual ingest failed:", error);
    throw new Error(error.message);
  }
}
