import Placeholder from "@/components/Placeholder";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Perfil · SailMatch" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Placeholder title="Mi perfil">
      <p className="text-slate-600">
        Sesión iniciada como <strong>{user?.email}</strong>
      </p>
    </Placeholder>
  );
}
