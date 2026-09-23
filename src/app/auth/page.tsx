import { Suspense } from "react";
import AuthForm from "./AuthForm";

export const metadata = { title: "Ingresar · SailMatch" };

export default function AuthPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <Suspense>
        <AuthForm />
      </Suspense>
    </main>
  );
}
