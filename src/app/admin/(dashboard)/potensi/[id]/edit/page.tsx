import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PotensiEditClient from '@/feature/admin/components/PotensiEditClient';

export default async function EditPotensiPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const potensi = await prisma.potensi.findUnique({
    where: { id, deletedAt: null },
  });

  if (!potensi) {
    notFound();
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/potensi" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Edit Potensi Desa</h2>
          <p className="text-[#414844] mt-1 font-inter-400 text-sm">Perbarui informasi potensi desa yang sudah ada.</p>
        </div>
      </div>

      <PotensiEditClient potensi={potensi} />
    </div>
  );
}
