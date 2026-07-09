import Link from 'next/link';
import { deleteBerita } from '@/feature/admin/actions/berita';
import prisma from '@/lib/prisma';
import DeleteButton from '@/feature/admin/components/DeleteButton';

export default async function BeritaPage() {
  const beritaList = await prisma.berita.findMany({
    where: { deletedAt: null },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Kelola Berita &amp; Artikel</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar semua berita dan artikel yang dipublikasikan.</p>
        </div>
        <Link
          href="/admin/berita/tambah"
          className="px-5 py-2.5 bg-[#0A2615] text-white rounded-lg font-inter-600 hover:bg-[#1C3F2D] transition flex items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tulis Berita
        </Link>
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
                    Belum ada berita. Klik &quot;Tulis Berita&quot; untuk memulai.
                  </td>
                </tr>
              ) : (
                beritaList.map((berita, index) => (
                  <tr key={berita.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {berita.thumbnail ? (
                          <img src={berita.thumbnail} alt={berita.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-[#1C3F2D] max-w-xs truncate">{berita.title}</p>
                          <p className="text-xs text-gray-500">/berita/{berita.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#285A43]/10 text-[#1C3F2D]">
                        {berita.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-inter-500">
                      {berita.author?.name || berita.authorName}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        berita.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {berita.status === 'PUBLISHED' ? 'Terbit' : 'Draft'}
                      </span>
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
                        <DeleteButton onDelete={async () => {
                          'use server';
                          await deleteBerita(berita.id);
                        }} />
                      </div>
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
