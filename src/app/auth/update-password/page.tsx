"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  friendlyAuthError,
  validatePassword,
  validatePasswordConfirm,
} from "@/lib/auth-validation";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError =
      validatePassword(password) ?? validatePasswordConfirm(password, confirm);
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await createClient().auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(friendlyAuthError(error.message));
      return;
    }
    router.replace("/explore");
    router.refresh();
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-slate-900">Nueva contraseña</h1>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Contraseña nueva</span>
          <input
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Confirmar contraseña</span>
          <input
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-sky-700 py-2.5 font-medium text-white hover:bg-sky-800 disabled:opacity-60"
        >
          {loading ? "Guardando…" : "Guardar contraseña"}
        </button>
      </form>
    </main>
  );
}
