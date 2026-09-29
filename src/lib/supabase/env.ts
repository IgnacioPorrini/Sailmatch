// Supabase ahora entrega una "publishable key" (sb_publishable_…) que reemplaza a la
// vieja "anon key". Se acepta cualquiera de las dos variables.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPABASE_KEY = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!;
