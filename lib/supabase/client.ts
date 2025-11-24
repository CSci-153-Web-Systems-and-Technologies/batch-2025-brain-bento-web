'use client'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Remove the throw
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables required')
  }

  return createSupabaseClient(supabaseUrl!, supabaseAnonKey!)
}
