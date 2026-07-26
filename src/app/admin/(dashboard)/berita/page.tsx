import Link from 'next/link';
import { FiTrash2, FiPlus, FiImage, FiEye, FiEdit } from 'react-icons/fi';
import { deleteBerita } from '@/feature/admin/actions/berita';
import prisma from '@/lib/prisma';
import DeleteButton from '@/feature/admin/components/DeleteButton';
import AdminSearch from '@/feature/admin/components/AdminSearch';
import AdminPagination from '@/feature/admin/components/AdminPagination';

export default async function BeritaPage(props: { searchParams?: Promise<{ q?: string; page?: string }> }) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 10;
  const skip = (currentPage - 1) * itemsPerPage;

  const whereClause = {
    deletedAt: null,
    ...(q ? { title: { contains: q } } : {}),
  };

  const [beritaList, totalItems] = await Promise.all([
    prisma.berita.findMany({
      where: whereClause,
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: itemsPerPage,
    }),
    prisma.berita.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Kelola Berita &amp; Artikel</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar semua berita dan artikel yang dipublikasikan.</p>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full xl:w-auto">
          <AdminSearch placeholder="Cari judul berita..." />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Link
              href="/admin/berita/trash"
              className="px-4 py-2.5 bg-red-50 text-red-700 rounded-lg font-inter-600 hover:bg-red-100 transition flex items-center justify-center gap-2 border border-red-200 whitespace-nowrap w-full sm:w-auto shrink-0"
              title="Lihat Data yang Terhapus"
            >
              <FiTrash2 className="w-5 h-5" />
              <span>Tong Sampah</span>
            </Link>
            <Link
              href="/admin/berita/tambah"
              className="px-5 py-2.5 bg-[#0A2615] text-white rounded-lg font-inter-600 hover:bg-[#1C3F2D] transition flex items-center justify-center gap-2 shadow-sm whitespace-nowrap w-full sm:w-auto shrink-0"
            >
              <FiPlus className="w-5 h-5" />
              <span>Tulis Artikel Baru</span>
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
                <th className="px-4 sm:px-6 py-3 sm:py-4">Judul</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Kategori</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Penulis</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Status</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Tanggal</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-center">Dilihat</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {beritaList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 sm:px-6 py-12 text-center text-gray-500 font-inter-400">
                    Belum ada berita yang diterbitkan. Mari tulis artikel pertama untuk desa kita!
                  </td>
                </tr>
              ) : (
                beritaList.map((berita, index) => (
                  <tr key={berita.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 font-inter-400">
                      {skip + index + 1}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-4">
                        {berita.thumbnail ? (
                          <img src={berita.thumbnail} alt={berita.title} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <FiImage className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-[#1C3F2D] max-w-xs truncate">{berita.title}</p>
                          <p className="text-xs text-gray-400">/berita/{berita.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {berita.kategori}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600 font-inter-500">
                      {berita.author?.name || berita.authorName}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      {berita.status === 'PUBLISHED' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Terbit
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Draf
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 font-inter-400">
                      {new Date(berita.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-inter-600 bg-blue-50 text-blue-700">
                        <FiEye className="w-3.5 h-3.5" />
                        {berita.viewCount}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/berita/${berita.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FiEdit className="w-5 h-5" />
                        </Link>
                        <DeleteButton 
                          itemName="berita"
                          isSoftDelete={true}
                          onDelete={async () => {
                            'use server';
                            await deleteBerita(berita.id);
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
