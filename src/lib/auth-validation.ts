export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Ingresá tu email.";
  if (!EMAIL_RE.test(email.trim())) return "El email no tiene un formato válido.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH)
    return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  return null;
}

export function validatePasswordConfirm(
  password: string,
  confirm: string,
): string | null {
  if (password !== confirm) return "Las contraseñas no coinciden.";
  return null;
}

// Traduce los mensajes más comunes de Supabase Auth a algo amigable.
export function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("failed to fetch") || m.includes("networkerror") || m.includes("load failed"))
    return "No se pudo conectar con el servidor. Revisá tu conexión e intentá de nuevo.";
  if (m.includes("invalid login credentials"))
    return "Email o contraseña incorrectos.";
  if (m.includes("email not confirmed"))
    return "Todavía no confirmaste tu email. Revisá tu casilla (y el spam).";
  if (m.includes("user already registered"))
    return "Ya existe una cuenta con ese email. Probá iniciar sesión.";
  if (m.includes("password should be at least"))
    return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  if (m.includes("rate limit") || m.includes("too many requests"))
    return "Demasiados intentos. Esperá unos minutos y volvé a probar.";
  if (m.includes("same password"))
    return "La nueva contraseña tiene que ser distinta de la anterior.";
  return message;
}
