'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleTaskStatus(taskId: string, isComplete: boolean) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await (supabase
    .from('tasks') as any)
    .update({ is_complete: isComplete })
    .eq('id', taskId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error toggling task:', error)
    throw new Error('Failed to update task')
  }

  revalidatePath('/dashboard', 'layout')
}

export async function updateTaskDetails(
  taskId: string, 
  data: { status: string; notes: string | null; link_url?: string | null }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const updatePayload: any = {
    status: data.status,
    is_complete: data.status === 'completed',
    notes: data.notes,
  }
  
  if ('link_url' in data) {
    updatePayload.link_url = data.link_url
  }

  const { error } = await (supabase
    .from('tasks') as any)
    .update(updatePayload)
    .eq('id', taskId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating task details:', error)
    throw new Error('Failed to update task details')
  }

  revalidatePath('/dashboard', 'layout')
}
