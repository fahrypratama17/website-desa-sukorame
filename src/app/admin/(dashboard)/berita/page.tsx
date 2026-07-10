import Link from 'next/link';
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Kelola Berita &amp; Artikel</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar semua berita dan artikel yang dipublikasikan.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <AdminSearch placeholder="Cari judul berita..." />
          <Link
            href="/admin/berita/trash"
            className="px-4 py-2.5 bg-red-50 text-red-700 rounded-lg font-inter-600 hover:bg-red-100 transition flex items-center gap-2 border border-red-200"
            title="Lihat Tong Sampah"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            <span className="hidden sm:inline">Tong Sampah</span>
          </Link>
          <Link
            href="/admin/berita/tambah"
            className="px-5 py-2.5 bg-[#0A2615] text-white rounded-lg font-inter-600 hover:bg-[#1C3F2D] transition flex items-center gap-2 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Tulis Berita
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100 text-[#414844] font-inter-600 text-sm">
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Penulis</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {beritaList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-inter-400">
                    Tidak ada berita ditemukan.
                  </td>
                </tr>
              ) : (
                beritaList.map((berita, index) => (
                  <tr key={berita.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-400">
                      {skip + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {berita.thumbnail ? (
                          <img src={berita.thumbnail} alt={berita.title} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-[#1C3F2D] max-w-xs truncate">{berita.title}</p>
                          <p className="text-xs text-gray-400">/berita/{berita.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {berita.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-inter-500">
                      {berita.author?.name || berita.authorName}
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-400">
                      {new Date(berita.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/berita/${berita.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
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
