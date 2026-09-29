// Supabase ahora entrega una "publishable key" (sb_publishable_…) que reemplaza a la
// vieja "anon key". Se acepta cualquiera de las dos variables.
// Se limpian espacios, comillas y la barra final por si se pegaron al cargarlas en Vercel.
function clean(value: string | undefined) {
  return (value ?? "").trim().replace(/^["']|["']$/g, "").trim();
}

export const SUPABASE_URL = clean(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/+$/, "");
export const SUPABASE_KEY = clean(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
