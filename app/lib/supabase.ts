import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function useAppSupabase() {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.public.supabasePublishableKey

  if (!supabaseUrl || !supabaseKey || supabaseKey.includes('replace-with')) {
    return null
  }

  if (!client) {
    client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  }

  return client
}
