import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sukorame.web.id';

  // Daftar rute statis
  const staticRoutes = [
    '',
    '/profil',
    '/program',
    '/potensi',
    '/berita',
    '/perangkat',
    '/lembaga',
    '/kontak'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Ambil semua slug berita untuk rute dinamis
  // Asumsikan kita hanya mengambil berita yang PUBLISHED dan tidak dihapus
  const beritaList = await prisma.berita.findMany({
    where: { 
      status: 'PUBLISHED',
      deletedAt: null
    },
    select: { 
      slug: true, 
      updatedAt: true 
    },
    orderBy: { createdAt: 'desc' }
  });

  const beritaRoutes = beritaList.map((berita) => ({
    url: `${baseUrl}/berita/${berita.slug}`,
    lastModified: berita.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...beritaRoutes];
}
