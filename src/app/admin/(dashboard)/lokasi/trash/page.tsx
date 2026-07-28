import Link from 'next/link';
import { FiArrowLeft, FiMapPin } from 'react-icons/fi';
import prisma from '@/lib/prisma';
import TrashActionButtons from '@/feature/admin/components/TrashActionButtons';
import { restoreLocation, deleteLocation } from '@/feature/admin/actions/location';
import AdminPagination from '@/feature/admin/components/AdminPagination';

export default async function LokasiTrashPage(props: { searchParams?: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 10;
  const skip = (currentPage - 1) * itemsPerPage;

  const whereClause = {
    deletedAt: { not: null }
  };

  const [trashedItems, totalItems] = await Promise.all([
    prisma.location.findMany({
      where: whereClause,
      orderBy: { deletedAt: 'desc' },
      skip,
      take: itemsPerPage,
    }),
    prisma.location.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/lokasi" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Tong Sampah Lokasi</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar lokasi yang telah dihapus.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100 text-[#414844] font-inter-600 text-sm">
                <th className="px-4 sm:px-6 py-3 sm:py-4">No</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Lokasi</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trashedItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 sm:px-6 py-12 text-center text-gray-500 font-inter-400">
                    Tidak ada lokasi di tong sampah.
                  </td>
                </tr>
              ) : (
                trashedItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition opacity-75">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 font-inter-400">
                      {skip + index + 1}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: item.color || '#0A2615' }}>
                          <FiMapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-inter-600 text-[#1C3F2D]">{item.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-end">
                        <TrashActionButtons 
                          id={item.id}
                          itemName="lokasi"
                          onRestore={async () => {
                            'use server';
                            await restoreLocation(item.id);
                          }}
                          onHardDelete={async () => {
                            'use server';
                            await deleteLocation(item.id, true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <AdminPagination totalPages={totalPages} />
      </div>
    </div>
  );
}
