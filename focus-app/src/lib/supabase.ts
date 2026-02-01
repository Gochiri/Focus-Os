import { createClient } from '@supabase/supabase-js'

// Use placeholders if env variables are missing to prevent crash during local UI testing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not found. Database features will not work. UI is in "offline/demo" mode.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
