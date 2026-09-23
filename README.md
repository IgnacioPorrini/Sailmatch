# ⛵ SailMatch

Conecta capitanes que buscan tripulación con gente que quiere salir a navegar.

**Stack:** Next.js 15 (App Router) · Tailwind CSS 4 · Supabase (Auth con email + contraseña).

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completar NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev                  # http://localhost:3000
```

## Configuración en Supabase (una sola vez)

En el dashboard del proyecto `toqpkbloqghvgnnvpvhm`:

- **Authentication → Providers → Email:** habilitado.
- **Confirm email:** a gusto. Si está activado, el registro manda un mail y la cuenta se activa al hacer clic.
- **Authentication → URL Configuration:**
  - Site URL: `http://localhost:3000` (en producción, la URL de Vercel)
  - Redirect URLs: `http://localhost:3000/auth/callback` y, más adelante, `https://<tu-app>.vercel.app/auth/callback`

## Autenticación

| Qué | Dónde |
|---|---|
| Login / registro / recuperar contraseña | `src/app/auth/AuthForm.tsx` |
| Link de los mails (confirmación y reset) | `src/app/auth/callback/route.ts` |
| Elegir nueva contraseña | `src/app/auth/update-password/page.tsx` |
| Cerrar sesión | `src/app/auth/actions.ts` |
| Validaciones y mensajes de error | `src/lib/auth-validation.ts` |
| Rutas protegidas y refresco de sesión | `src/lib/supabase/middleware.ts` |

Rutas protegidas (redirigen a `/auth` sin sesión): `/explore`, `/trips/*` (detalle y nueva), `/mis-salidas`, `/profile`.

No se usa Google OAuth.
