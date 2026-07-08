import { PrismaClient } from '@prisma/client';
import PerangkatClient from '../../../../feature/admin/components/PerangkatClient';
import { savePerangkat, deletePerangkat } from '../../../../feature/admin/actions/perangkat';

const prisma = new PrismaClient();

export default async function PerangkatPage() {
  const perangkatData = await prisma.perangkat.findMany({
    orderBy: { id: 'asc' }
  });

  return (
    <PerangkatClient 
      initialData={perangkatData} 
      saveAction={savePerangkat}
      deleteAction={deletePerangkat}
    />
  );
}
