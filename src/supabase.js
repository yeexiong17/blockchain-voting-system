import { createClient } from '@supabase/supabase-js'

const options = {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
}

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabaseRoleKey = process.env.REACT_APP_SUPABASE_ROLE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options)

export const supabaseAdmin = createClient(supabaseUrl, supabaseRoleKey, options)