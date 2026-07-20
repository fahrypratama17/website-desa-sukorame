import Link from 'next/link';
import { FiTrash2, FiArrowLeft, FiImage } from 'react-icons/fi';
import prisma from '@/lib/prisma';
import TrashActionButtons from '@/feature/admin/components/TrashActionButtons';
import { restoreProgram, hardDeleteProgram } from '@/feature/admin/actions/program';

export default async function ProgramTrashPage() {
  const programs = await prisma.program.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { deletedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-red-700 flex items-center gap-2">
            <FiTrash2 className="w-7 h-7" />
            Tong Sampah Program
          </h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar program kerja yang telah dihapus. Anda dapat memulihkannya kembali atau menghapusnya secara permanen.</p>
        </div>
        <Link
          href="/admin/program"
          className="px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-inter-600 hover:bg-gray-50 transition flex items-center gap-2"
        >
          <FiArrowLeft className="w-5 h-5" />
          Kembali ke Program
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-50/50 border-b border-red-100 text-red-900 font-inter-600 text-sm">
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Dihapus Pada</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {programs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-inter-400">
                    Tong sampah kosong.
                  </td>
                </tr>
              ) : (
                programs.map((program, index) => (
                  <tr key={program.id} className="hover:bg-red-50/30 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {program.image ? (
                          <img src={program.image} alt={program.title} className="w-12 h-12 rounded-lg object-cover grayscale opacity-70" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <FiImage className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-gray-700">{program.title}</p>
                          <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            {program.kategori}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600 font-inter-500">
                      {program.deletedAt ? new Date(program.deletedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <TrashActionButtons 
                        id={program.id}
                        itemName="program"
                        onRestore={restoreProgram}
                        onHardDelete={hardDeleteProgram}
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
