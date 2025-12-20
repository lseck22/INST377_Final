import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "YOUR_SUPABASE_URL", // <-- ADD YOUR SUPABASE URL
  "YOUR_SUPABASE_ANON_KEY" // <-- ADD YOUR SUPABASE KEY
);
