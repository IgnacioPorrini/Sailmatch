import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SailMatch",
  description: "Encontrá tripulación o un barco para tu próxima salida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-slate-50 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
