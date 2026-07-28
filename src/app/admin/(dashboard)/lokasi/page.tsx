import Link from 'next/link';
import { FiTrash2, FiPlus, FiMapPin, FiEdit } from 'react-icons/fi';
import { deleteLocation } from '@/feature/admin/actions/location';
import prisma from '@/lib/prisma';
import DeleteButton from '@/feature/admin/components/DeleteButton';
import AdminSearch from '@/feature/admin/components/AdminSearch';
import AdminPagination from '@/feature/admin/components/AdminPagination';

export const dynamic = 'force-dynamic';

export default async function LokasiPage(props: { searchParams?: Promise<{ q?: string; page?: string }> }) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 10;
  const skip = (currentPage - 1) * itemsPerPage;

  const whereClause = {
    deletedAt: null,
    ...(q ? { name: { contains: q } } : {}),
  };

  const [lokasiList, totalItems] = await Promise.all([
    prisma.location.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip,
      take: itemsPerPage,
    }),
    prisma.location.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Kelola Lokasi</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar semua lokasi yang ditampilkan di peta interaktif halaman kontak.</p>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full xl:w-auto">
          <AdminSearch placeholder="Cari lokasi..." />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Link
              href="/admin/lokasi/trash"
              className="px-4 py-2.5 bg-red-50 text-red-700 rounded-lg font-inter-600 hover:bg-red-100 transition flex items-center justify-center gap-2 border border-red-200 whitespace-nowrap w-full sm:w-auto shrink-0"
              title="Lihat Data yang Terhapus"
            >
              <FiTrash2 className="w-5 h-5" />
              <span>Tong Sampah</span>
            </Link>
            <Link
              href="/admin/lokasi/tambah"
              className="px-5 py-2.5 bg-[#0A2615] text-white rounded-lg font-inter-600 hover:bg-[#1C3F2D] transition flex items-center justify-center gap-2 shadow-sm whitespace-nowrap w-full sm:w-auto shrink-0"
            >
              <FiPlus className="w-5 h-5" />
              <span>Tambah Lokasi</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100 text-[#414844] font-inter-600 text-sm">
                <th className="px-4 sm:px-6 py-3 sm:py-4">No</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Lokasi</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Warna</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lokasiList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 sm:px-6 py-12 text-center text-gray-500 font-inter-400">
                    Belum ada data lokasi yang tercatat.
                  </td>
                </tr>
              ) : (
                lokasiList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
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
                          <p className="text-[10px] text-gray-400 mt-0.5">{item.latitude}, {item.longitude}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md shadow-sm border border-gray-200" style={{ backgroundColor: item.color || '#0A2615' }}></div>
                        <span className="text-xs text-gray-500">{item.color || '#0A2615'}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/lokasi/${item.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FiEdit className="w-5 h-5" />
                        </Link>
                        <DeleteButton 
                          itemName="lokasi"
                          isSoftDelete={true}
                          onDelete={async () => {
                            'use server';
                            await deleteLocation(item.id);
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
