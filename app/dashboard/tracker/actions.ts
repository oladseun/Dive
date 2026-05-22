'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleTaskStatus(taskId: string, isComplete: boolean) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('tasks')
    .update({ is_complete: isComplete })
    .eq('id', taskId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error toggling task:', error)
    throw new Error('Failed to update task')
  }

  revalidatePath('/dashboard/tracker/[id]', 'page')
}
