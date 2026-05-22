'use server'

import { createClient } from '@/lib/supabase/server'
import { generateEssayDraft } from '@/lib/ai/essay-generator'

export async function draftWithAI(taskId: string) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // 1. Get task
  const { data: task } = await (supabase
    .from('tasks') as any)
    .select('*')
    .eq('id', taskId)
    .eq('user_id', user.id)
    .single()

  if (!task) throw new Error('Task not found')

  // 2. Get opportunity
  const { data: opportunity } = await (supabase
    .from('opportunities') as any)
    .select('*')
    .eq('id', task.opportunity_id)
    .single()

  // 3. Get user profile
  const { data: profile } = await (supabase
    .from('users') as any)
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.tier !== 'pro') {
    throw new Error('Premium feature')
  }

  // Generate draft
  const draft = await generateEssayDraft(task.title, opportunity, profile)
  
  return draft
}
