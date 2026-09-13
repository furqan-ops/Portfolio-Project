import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bnzbkrkybyzfljalgwkr.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_syAtgRJNOrQJU9VMipWeng_ECIsi80K'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)