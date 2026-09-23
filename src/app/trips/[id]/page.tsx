import Placeholder from "@/components/Placeholder";

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Placeholder title={`Salida #${id}`} />;
}
