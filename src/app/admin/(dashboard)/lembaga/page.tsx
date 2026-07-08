import { PrismaClient } from '@prisma/client';
import LembagaClient from '../../../../feature/admin/components/LembagaClient';
import { saveLembaga, deleteLembaga } from '../../../../feature/admin/actions/lembaga';

const prisma = new PrismaClient();

export default async function LembagaPage() {
  const lembagaData = await prisma.lembaga.findMany({
    orderBy: { id: 'asc' }
  });

  return (
    <LembagaClient 
      initialData={lembagaData} 
      saveAction={saveLembaga}
      deleteAction={deleteLembaga}
    />
  );
}
