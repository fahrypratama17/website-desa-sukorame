import DashboardOverview from '@/feature/admin/section/DashboardOverview';
import prisma from '@/lib/prisma';

export default async function DashboardPage() {
  const [
    beritaCount, 
    programCount, 
    perangkatCount, 
    lembagaCount,
    latestBerita,
    latestProgram
  ] = await Promise.all([
    prisma.berita.count({ where: { deletedAt: null } }),
    prisma.program.count({ where: { deletedAt: null } }),
    prisma.perangkat.count({ where: { deletedAt: null } }),
    prisma.lembaga.count({ where: { deletedAt: null } }),
    prisma.berita.findMany({
      where: { deletedAt: null },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, updatedAt: true, authorName: true }
    }),
    prisma.program.findMany({
      where: { deletedAt: null },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, updatedAt: true }
    })
  ]);

  // Combine and sort activities (only Berita and Program)
  const combinedActivities = [
    ...latestBerita.map(b => ({
      id: b.id,
      type: 'Berita',
      title: b.title,
      createdAt: b.updatedAt,
      link: `/admin/berita/${b.id}/edit`,
      author: b.authorName || 'Admin'
    })),
    ...latestProgram.map(p => ({
      id: p.id,
      type: 'Program',
      title: p.title,
      createdAt: p.updatedAt,
      link: `/admin/program`, 
      author: 'Sistem'
    }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);

  return (
    <DashboardOverview
      stats={{ 
        totalBerita: beritaCount, 
        totalProgram: programCount, 
        totalPerangkat: perangkatCount, 
        totalLembaga: lembagaCount 
      }}
      recentActivities={combinedActivities}
    />
  );
}
