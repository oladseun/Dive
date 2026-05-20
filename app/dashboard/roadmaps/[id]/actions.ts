'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function toggleTask(taskId: string, isComplete: boolean) {
  const supabase = createClient()
  
  const { error } = await (supabase
    .from('tasks') as any)
    .update({ is_complete: isComplete, updated_at: new Date().toISOString() })
    .eq('id', taskId)

  if (error) {
    console.error('Error toggling task:', error)
    return
  }

  revalidatePath('/dashboard/roadmaps/[id]', 'page')
  revalidatePath('/dashboard', 'page')
}
