'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateBasicProfile(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const name = formData.get('name') as string
  const country = formData.get('country') as string
  const education_level = formData.get('education_level') as string

  const { error } = await (supabase.from('users') as any)
    .upsert({
      id: user.id,
      email: user.email,
      name,
      country,
      education_level
    })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard/profile')
}

export async function updateInterestTags(tags: string[]) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await (supabase.from('users') as any)
    .upsert({
      id: user.id,
      email: user.email,
      interest_tags: tags
    })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard/profile')
}

export async function updateNotificationPrefs(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const notification_pref = formData.get('notification_pref') as string || 'email'
  const whatsapp_number = formData.get('whatsapp_number') as string || ''

  const { error } = await (supabase.from('users') as any)
    .update({
      notification_pref,
      whatsapp_number
    })
    .eq('id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard/profile')
}
