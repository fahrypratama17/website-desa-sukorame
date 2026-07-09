import BeritaContainer from '@/feature/berita/container/BeritaContainer';
import prisma from '@/lib/prisma';

export const metadata = {
  title: "Berita & Artikel | Desa Sukorame",
  description: "Kumpulan berita, artikel, dan pengumuman terbaru dari Pemerintah Desa Sukorame.",
};

export const dynamic = 'force-dynamic';

export default async function BeritaPage() {
  const berita = await prisma.berita.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' }
  });
  
  return <BeritaContainer beritaData={berita} />;
}
