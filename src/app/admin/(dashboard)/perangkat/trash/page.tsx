import Link from 'next/link';
import { FiTrash2, FiArrowLeft, FiUser } from 'react-icons/fi';
import prisma from '@/lib/prisma';
import TrashActionButtons from '@/feature/admin/components/TrashActionButtons';
import { restorePerangkat, hardDeletePerangkat } from '@/feature/admin/actions/perangkat';

export default async function PerangkatTrashPage() {
  const perangkatList = await prisma.perangkat.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { deletedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-red-700 flex items-center gap-2">
            <FiTrash2 className="w-7 h-7" />
            Tong Sampah Perangkat Desa
          </h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar perangkat desa yang telah dihapus. Anda dapat memulihkannya kembali atau menghapusnya secara permanen.</p>
        </div>
        <Link
          href="/admin/perangkat"
          className="px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-inter-600 hover:bg-gray-50 transition flex items-center gap-2"
        >
          <FiArrowLeft className="w-5 h-5" />
          Kembali ke Perangkat
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-50/50 border-b border-red-100 text-red-900 font-inter-600 text-sm">
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Nama Perangkat</th>
                <th className="px-6 py-4">Jabatan</th>
                <th className="px-6 py-4">Dihapus Pada</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {perangkatList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-inter-400">
                    Tong sampah kosong.
                  </td>
                </tr>
              ) : (
                perangkatList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-red-50/30 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover grayscale opacity-70" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <FiUser className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-gray-700">{item.name}</p>
                          {item.email && <p className="text-xs text-gray-500 truncate max-w-[150px]">{item.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {item.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600 font-inter-500">
                      {item.deletedAt ? new Date(item.deletedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <TrashActionButtons 
                        id={item.id}
                        itemName="perangkat"
                        onRestore={restorePerangkat}
                        onHardDelete={hardDeletePerangkat}
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
