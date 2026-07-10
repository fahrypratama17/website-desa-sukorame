import Link from 'next/link';
import prisma from '@/lib/prisma';
import TrashActionButtons from '@/feature/admin/components/TrashActionButtons';
import { restoreLembaga, hardDeleteLembaga } from '@/feature/admin/actions/lembaga';

export default async function LembagaTrashPage() {
  const lembagaList = await prisma.lembaga.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { deletedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-red-700 flex items-center gap-2">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Tong Sampah Lembaga
          </h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar lembaga desa yang telah dihapus sementara (Soft Delete).</p>
        </div>
        <Link
          href="/admin/lembaga"
          className="px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-inter-600 hover:bg-gray-50 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali ke Lembaga
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-50/50 border-b border-red-100 text-red-900 font-inter-600 text-sm">
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Lembaga</th>
                <th className="px-6 py-4">Dihapus Pada</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lembagaList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-inter-400">
                    Tong sampah kosong.
                  </td>
                </tr>
              ) : (
                lembagaList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-red-50/30 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {item.logo ? (
                          <img src={item.logo} alt={item.name} className="w-12 h-12 rounded-lg object-cover grayscale opacity-70" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-gray-700">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600 font-inter-500">
                      {item.deletedAt ? new Date(item.deletedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <TrashActionButtons 
                        id={item.id}
                        itemName="lembaga"
                        onRestore={restoreLembaga}
                        onHardDelete={hardDeleteLembaga}
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
