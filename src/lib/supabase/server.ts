import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export async function createClient() {
  return createSupabaseJsClient(supabaseUrl, supabaseAnonKey);
}

export const supabaseServer = createSupabaseJsClient(supabaseUrl, supabaseAnonKey);
export default supabaseServer;
