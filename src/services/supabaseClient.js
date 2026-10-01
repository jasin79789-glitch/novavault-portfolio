import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

export const getSupabaseClient = (url, anonKey) => {
  if (supabaseInstance) return supabaseInstance;

  const resolvedUrl = url || import.meta.env.VITE_SUPABASE_URL;
  const resolvedKey = anonKey || import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (resolvedUrl && resolvedKey) {
    supabaseInstance = createClient(resolvedUrl, resolvedKey);
    return supabaseInstance;
  }
  return null;
};
