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
    description: berita.content.replace(/<[^>]*>?/gm, '').substring(0, 160).replace(/[#*`_\[\]]/g, '') + '...',
    openGraph: {
      title: berita.title,
      description: berita.content.replace(/<[^>]*>?/gm, '').substring(0, 160).replace(/[#*`_\[\]]/g, '') + '...',
      images: berita.thumbnail ? [berita.thumbnail] : [],
    }
  };
}

export const revalidate = 3600;

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
