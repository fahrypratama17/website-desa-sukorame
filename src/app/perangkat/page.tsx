import PerangkatContainer from "@/feature/perangkat/container/PerangkatContainer";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Perangkat Desa | Desa Sukorame",
  description: "Susunan struktur organisasi dan aparatur Pemerintah Desa Sukorame.",
};

export const dynamic = 'force-dynamic';

export default async function Perangkat() {
  const perangkatData = await prisma.perangkat.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'asc' }
  });

  return <PerangkatContainer perangkatData={perangkatData} />;
}
