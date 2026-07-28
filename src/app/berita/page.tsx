import BeritaContainer from '@/feature/berita/container/BeritaContainer';
import prisma from '@/lib/prisma';

export const metadata = {
  title: "Berita & Artikel | Desa Sukorame",
  description: "Kumpulan berita, artikel, dan pengumuman terbaru dari Pemerintah Desa Sukorame.",
};

export const dynamic = 'force-dynamic';

export default async function BeritaPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const ITEMS_PER_PAGE = 6;
  const currentPage = Number(searchParams?.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [berita, totalCount] = await Promise.all([
    prisma.berita.findMany({
      where: { deletedAt: null, status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.berita.count({
      where: { deletedAt: null, status: 'PUBLISHED' },
    })
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  
  return <BeritaContainer beritaData={berita} totalPages={totalPages} />;
}
