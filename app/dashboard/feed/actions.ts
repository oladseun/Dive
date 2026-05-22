'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { runAllScrapers } from "@/lib/scrapers";

export async function saveOpportunity(opportunityId: string) {
  const supabase = createClient()
  const adminAuth = createAdminClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  // Ensure user exists in public.users to prevent foreign key errors if they signed up before the upsert was added to the signup flow.
  // Using admin client because standard authenticated users do not have an INSERT policy for public.users
  await (adminAuth.from('users') as any).upsert({
    id: user.id,
    email: user.email,
  }, { onConflict: 'id' })

  const { error } = await (supabase.from('saved_opportunities') as any).insert({
    user_id: user.id,
    opportunity_id: opportunityId,
    status: 'saved'
  })

  if (error) {
    if (error.code === '23505') return // Already saved
    
    // Log the error for debugging
    console.error('Save Opportunity error:', error)
    throw new Error(error.message)
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
