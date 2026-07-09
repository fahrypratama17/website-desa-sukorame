import DashboardOverview from '@/feature/admin/section/DashboardOverview';
import prisma from '@/lib/prisma';

export default async function DashboardPage() {
  const [beritaCount, programCount, perangkatCount, lembagaCount, latestBerita] = await Promise.all([
    prisma.berita.count({ where: { deletedAt: null } }),
    prisma.program.count({ where: { deletedAt: null } }),
    prisma.perangkat.count({ where: { deletedAt: null } }),
    prisma.lembaga.count({ where: { deletedAt: null } }),
    prisma.berita.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  return (
    <DashboardOverview
      stats={{ 
        totalBerita: beritaCount, 
        totalProgram: programCount, 
        totalPerangkat: perangkatCount, 
        totalLembaga: lembagaCount 
      }}
      recentActivities={latestBerita.map((berita) => ({
        id: berita.id,
        type: 'Berita',
        title: berita.title,
        createdAt: berita.createdAt,
        link: `/admin/berita/${berita.id}/edit`,
      }))}
    />
  );
}
