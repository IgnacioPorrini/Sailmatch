import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Destino de los links de los mails (confirmación de cuenta y recuperación de contraseña).
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/explore";
  // Solo rutas internas, para evitar open redirects.
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/explore";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(`${origin}/auth?error=link`);
}
