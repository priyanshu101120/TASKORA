import { createBrowserClient } from "@supabase/ssr"
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

const supabaseurl = SUPABASE_URL
const supabasekey = SUPABASE_ANON_KEY

export const supabase = createBrowserClient(supabaseurl, supabasekey);