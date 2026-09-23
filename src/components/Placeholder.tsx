export default function Placeholder({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <h1 className="mb-2 text-2xl font-semibold text-slate-900">{title}</h1>
      {children ?? <p className="text-slate-500">Pantalla en construcción.</p>}
    </main>
  );
}
