import prisma from '@/lib/prisma';
import SearchResultSection from '@/feature/pencarian/section/SearchResultSection';

export const metadata = {
  title: "Hasil Pencarian | Desa Sukorame",
  description: "Hasil pencarian berita dan program di Desa Sukorame.",
};

export const dynamic = 'force-dynamic';

export default async function PencarianPage(props: { searchParams: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";

  let results: any[] = [];

  if (query.trim().length > 0) {
    results = await prisma.berita.findMany({
      where: {
        deletedAt: null,
        status: 'PUBLISHED',
        OR: [
          {
            title: {
              contains: query,
            }
          },
          {
            content: {
              contains: query,
            }
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20 // limit to top 20 results for now
    });
  }

  return (
    <>
      <SearchResultSection query={query} results={results} />
    </>
  );
}
