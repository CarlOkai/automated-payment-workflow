// Import the createClient function from the Supabase JavaScript SDK
import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase URL and the anonymous public API key from environment variables

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // URL of the Supabase instance
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Public key for accessing Supabase services


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
