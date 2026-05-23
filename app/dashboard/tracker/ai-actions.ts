'use server'

import { createClient } from '@/lib/supabase/server'
import { generateEssayDraft, reviewDocumentWithAI, getTaskAdvice } from '@/lib/ai/essay-generator'

export async function draftWithAI(taskId: string) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: task } = await (supabase.from('tasks') as any).select('*').eq('id', taskId).eq('user_id', user.id).single()
  if (!task) throw new Error('Task not found')

  const { data: opportunity } = await (supabase.from('opportunities') as any).select('*').eq('id', task.opportunity_id).single()
  const { data: profile } = await (supabase.from('users') as any).select('*').eq('id', user.id).single()

  if (profile?.tier !== 'pro') throw new Error('Premium feature')

  const draft = await generateEssayDraft(task.title, opportunity, profile)
  return draft
}

export async function reviewTaskDocument(taskId: string, documentText: string) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: task } = await (supabase.from('tasks') as any).select('*').eq('id', taskId).eq('user_id', user.id).single()
  if (!task) throw new Error('Task not found')

  const { data: opportunity } = await (supabase.from('opportunities') as any).select('*').eq('id', task.opportunity_id).single()
  const { data: profile } = await (supabase.from('users') as any).select('*').eq('id', user.id).single()

  if (profile?.tier !== 'pro') throw new Error('Premium feature')

  const review = await reviewDocumentWithAI(documentText, opportunity, profile)
  return review
}

export async function adviceForTask(taskId: string) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: task } = await (supabase.from('tasks') as any).select('*').eq('id', taskId).eq('user_id', user.id).single()
  if (!task) throw new Error('Task not found')

  const { data: opportunity } = await (supabase.from('opportunities') as any).select('*').eq('id', task.opportunity_id).single()
  const { data: profile } = await (supabase.from('users') as any).select('*').eq('id', user.id).single()

  if (profile?.tier !== 'pro') throw new Error('Premium feature')

  const advice = await getTaskAdvice(task.title, opportunity)
  return advice
}
