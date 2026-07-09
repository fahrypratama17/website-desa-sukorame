import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BeritaEditClient from '@/feature/admin/components/BeritaEditClient';

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const beritaId = parseInt(resolvedParams.id);
  
  if (isNaN(beritaId)) {
    notFound();
  }

  const berita = await prisma.berita.findUnique({
    where: { id: beritaId }
  });

  if (!berita) {
    notFound();
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/berita" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Edit Berita</h2>
          <p className="text-[#414844] mt-1 font-inter-400 text-sm">Perbarui konten atau informasi berita.</p>
        </div>
      </div>

      <BeritaEditClient berita={berita} />
    </div>
  );
}
