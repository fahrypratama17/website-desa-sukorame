import Link from 'next/link';
import { restoreBerita, hardDeleteBerita } from '@/feature/admin/actions/berita';
import prisma from '@/lib/prisma';
import TrashActionButtons from '@/feature/admin/components/TrashActionButtons';

export default async function TrashBeritaPage() {
  const beritaList = await prisma.berita.findMany({
    where: { deletedAt: { not: null } },
    include: { author: true },
    orderBy: { deletedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-red-800 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Tong Sampah Berita
          </h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar berita yang telah Anda hapus. Anda masih dapat memulihkannya kembali ke daftar utama.</p>
        </div>
        <Link
          href="/admin/berita"
          className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-inter-600 hover:bg-gray-200 transition flex items-center gap-2 shadow-sm border border-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali ke Berita
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-50 border-b border-red-100 text-red-800 font-inter-600 text-sm">
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Penulis</th>
                <th className="px-6 py-4">Waktu Dihapus</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {beritaList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-inter-400">
                    Tong sampah kosong.
                  </td>
                </tr>
              ) : (
                beritaList.map((berita, index) => (
                  <tr key={berita.id} className="hover:bg-red-50/30 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {berita.thumbnail ? (
                          <img src={berita.thumbnail} alt={berita.title} className="w-12 h-12 rounded-lg object-cover opacity-50 grayscale" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 opacity-50">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-gray-600 max-w-xs truncate line-through">{berita.title}</p>
                          <p className="text-xs text-gray-400">/berita/{berita.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        {berita.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-500">
                      {berita.author?.name || berita.authorName}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-500 font-inter-500">
                      {berita.deletedAt ? new Date(berita.deletedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' }) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <TrashActionButtons 
                        id={berita.id}
                        itemName="berita"
                        onRestore={restoreBerita}
                        onHardDelete={hardDeleteBerita}
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
