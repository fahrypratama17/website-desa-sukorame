import LembagaClient from '@/feature/admin/components/LembagaClient';
import { saveLembaga, deleteLembaga } from '@/feature/admin/actions/lembaga';
import prisma from '@/lib/prisma';

export default async function LembagaPage() {
  const lembagaData = await prisma.lembaga.findMany({
    where: { deletedAt: null },
    orderBy: { id: 'asc' },
  });

  return (
    <LembagaClient
      initialData={lembagaData}
      saveAction={saveLembaga}
      deleteAction={deleteLembaga}
    />
  );
}
