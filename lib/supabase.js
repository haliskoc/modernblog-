import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client-side Supabase (anon key)
export const supabase = createClient(supabaseUrl, supabaseKey)

// Server-side Supabase (service role key - admin işlemleri için)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
