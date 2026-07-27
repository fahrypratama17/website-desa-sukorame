import Link from 'next/link';
import { FiArrowLeft, FiImage, FiRefreshCcw } from 'react-icons/fi';
import prisma from '@/lib/prisma';
import TrashActionButtons from '@/feature/admin/components/TrashActionButtons';
import { restorePotensi, hardDeletePotensi } from '@/feature/admin/actions/potensi';

export default async function TrashPotensiPage() {
  const trashedPotensi = await prisma.potensi.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { deletedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/potensi" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Tong Sampah - Potensi Desa</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar potensi desa yang telah dihapus.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100 text-[#414844] font-inter-600 text-sm">
                <th className="px-4 sm:px-6 py-3 sm:py-4">No</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Potensi</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Dihapus Pada</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trashedPotensi.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 sm:px-6 py-12 text-center text-gray-500 font-inter-400">
                    Tong sampah kosong.
                  </td>
                </tr>
              ) : (
                trashedPotensi.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition opacity-75">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 font-inter-400">
                      {index + 1}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-4">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover grayscale" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <FiImage className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-gray-600 line-through">{item.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-500">
                      {item.deletedAt?.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <TrashActionButtons 
                        id={item.id}
                        itemName="potensi"
                        onRestore={restorePotensi}
                        onHardDelete={hardDeletePotensi}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
