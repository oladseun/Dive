'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateProfile(formData: FormData) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return redirect('/login')
  }

  const interestsRaw = formData.get('interests') as string
  const educationLevel = formData.get('education_level') as string
  const country = formData.get('country') as string
  
  const interest_tags = JSON.parse(interestsRaw)

  const { error } = await (supabase
    .from('users') as any)
    .update({
      interest_tags,
      education_level: educationLevel,
      country,
      last_active: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating profile:', error)
    return
  }

  revalidatePath('/dashboard', 'layout')
  return redirect('/dashboard')
}
