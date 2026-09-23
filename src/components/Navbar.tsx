import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-sky-800">
          ⛵ SailMatch
        </Link>
        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <Link href="/explore" className="hidden text-slate-600 hover:text-slate-900 sm:inline">
              Explorar
            </Link>
            <Link href="/mis-salidas" className="hidden text-slate-600 hover:text-slate-900 sm:inline">
              Mis salidas
            </Link>
            <Link href="/profile" className="text-slate-600 hover:text-slate-900">
              Perfil
            </Link>
            <form action={signOut}>
              <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                Salir
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/auth"
            className="rounded-lg bg-sky-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-800"
          >
            Ingresar
          </Link>
        )}
      </nav>
    </header>
  );
}
