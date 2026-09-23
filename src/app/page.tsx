import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-sky-900 sm:text-5xl">⛵ SailMatch</h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600">
        Conectamos capitanes que buscan tripulación con gente que quiere salir a navegar.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/explore"
          className="rounded-lg bg-sky-700 px-5 py-2.5 font-medium text-white hover:bg-sky-800"
        >
          Explorar salidas
        </Link>
        <Link
          href="/auth"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          Crear cuenta
        </Link>
      </div>
    </main>
  );
}
