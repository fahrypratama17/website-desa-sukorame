import { savePerangkat, deletePerangkat } from '@/feature/admin/actions/perangkat';
import PerangkatClient from '@/feature/admin/components/PerangkatClient';
import prisma from '@/lib/prisma';

export default async function PerangkatPage() {
  const perangkatData = await prisma.perangkat.findMany({
    where: { deletedAt: null },
    orderBy: { order: 'asc' },
  });

  return (
    <PerangkatClient
      initialData={perangkatData}
      saveAction={savePerangkat}
      deleteAction={deletePerangkat}
    />
  );
}
