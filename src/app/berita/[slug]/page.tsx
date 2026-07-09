import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BeritaDetailSection from '@/feature/berita/section/BeritaDetailSection';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const berita = await prisma.berita.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan | Desa Sukorame'
    };
  }

  return {
    title: `${berita.title} | Desa Sukorame`,
    description: berita.content.substring(0, 160).replace(/[#*`]/g, '') + '...',
    openGraph: {
      title: berita.title,
      description: berita.content.substring(0, 160).replace(/[#*`]/g, '') + '...',
      images: berita.thumbnail ? [berita.thumbnail] : [],
    }
  };
}

export const dynamic = 'force-dynamic';

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const berita = await prisma.berita.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!berita) {
    notFound();
  }

  return (
    <>
      <BeritaDetailSection berita={berita} />
    </>
  );
}
