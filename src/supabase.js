import { createClient } from "@supabase/supabase-js";

// Vite will inject these at build time
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
