import LembagaContainer from "@/feature/lembaga/container/LembagaContainer";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Lembaga Desa | Desa Sukorame",
  description: "Daftar lembaga kemasyarakatan yang aktif di lingkungan Desa Sukorame.",
};

export const dynamic = 'force-dynamic';

export default async function Lembaga() {
  const lembagaData = await prisma.lembaga.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'asc' }
  });

  return <LembagaContainer lembagaData={lembagaData} />;
}
