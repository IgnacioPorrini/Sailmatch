"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  friendlyAuthError,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "@/lib/auth-validation";

type Mode = "login" | "signup" | "reset";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200";

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
}

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/explore";
  const callbackError = searchParams.get("error");

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(
    callbackError ? "El link expiró o no es válido. Pedí uno nuevo." : null,
  );
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function switchMode(m: Mode) {
    setMode(m);
    setError(null);
    setInfo(null);
    setPassword("");
    setConfirm("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const validationError =
      validateEmail(email) ??
      (mode !== "reset" ? validatePassword(password) : null) ??
      (mode === "signup" ? validatePasswordConfirm(password, confirm) : null);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const cleanEmail = email.trim();

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
        router.replace(next);
        router.refresh();
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            emailRedirectTo: `${siteUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        });
        if (error) throw error;
        if (data.session) {
          // "Confirm email" desactivado: la sesión arranca directo.
          router.replace(next);
          router.refresh();
        } else {
          setInfo(
            "¡Listo! Te mandamos un mail para confirmar tu cuenta. Revisá tu casilla (y el spam).",
          );
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: `${siteUrl()}/auth/callback?next=/auth/update-password`,
        });
        if (error) throw error;
        setInfo(
          "Si existe una cuenta con ese email, te llegará un link para crear una nueva contraseña.",
        );
      }
    } catch (err) {
      setError(friendlyAuthError(err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  const titles: Record<Mode, string> = {
    login: "Iniciar sesión",
    signup: "Crear cuenta",
    reset: "Recuperar contraseña",
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {mode !== "reset" && (
        <div className="mb-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1 text-sm font-medium">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`rounded-md py-2 transition ${
                mode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              {m === "login" ? "Ingresar" : "Registrarme"}
            </button>
          ))}
        </div>
      )}

      <h1 className="mb-4 text-xl font-semibold text-slate-900">{titles[mode]}</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Email</span>
          <input
            type="email"
            autoComplete="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {mode !== "reset" && (
          <label className="block text-sm">
            <span className="mb-1 block text-slate-700">Contraseña</span>
            <input
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        )}

        {mode === "signup" && (
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
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {info && (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-sky-700 py-2.5 font-medium text-white transition hover:bg-sky-800 disabled:opacity-60"
        >
          {loading
            ? "Un momento…"
            : mode === "login"
              ? "Ingresar"
              : mode === "signup"
                ? "Crear cuenta"
                : "Enviar link"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        {mode === "login" && (
          <button
            type="button"
            onClick={() => switchMode("reset")}
            className="text-sky-700 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        )}
        {mode === "reset" && (
          <button
            type="button"
            onClick={() => switchMode("login")}
            className="text-sky-700 hover:underline"
          >
            Volver a iniciar sesión
          </button>
        )}
      </div>
    </div>
  );
}
