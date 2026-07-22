import Link from 'next/link';
import { FiTrash2, FiPlus, FiImage, FiEdit } from 'react-icons/fi';
import { deleteProgram } from '@/feature/admin/actions/program';
import prisma from '@/lib/prisma';
import DeleteButton from '@/feature/admin/components/DeleteButton';
import AdminSearch from '@/feature/admin/components/AdminSearch';
import AdminPagination from '@/feature/admin/components/AdminPagination';

export default async function ProgramPage(props: { searchParams?: Promise<{ q?: string; page?: string }> }) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 10;
  const skip = (currentPage - 1) * itemsPerPage;

  const whereClause = {
    deletedAt: null,
    ...(q ? { title: { contains: q } } : {}),
  };

  const [programs, totalItems] = await Promise.all([
    prisma.program.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip,
      take: itemsPerPage,
    }),
    prisma.program.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Kelola Program Desa</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar semua program kerja yang berjalan di Desa Sukorame.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <AdminSearch placeholder="Cari program..." />
          <Link
            href="/admin/program/trash"
            className="px-4 py-2.5 bg-red-50 text-red-700 rounded-lg font-inter-600 hover:bg-red-100 transition flex items-center gap-2 border border-red-200"
            title="Lihat Data yang Terhapus"
          >
            <FiTrash2 className="w-5 h-5" />
            <span className="hidden sm:inline">Tong Sampah</span>
          </Link>
          <Link
            href="/admin/program/tambah"
            className="px-5 py-2.5 bg-[#0A2615] text-white rounded-lg font-inter-600 hover:bg-[#1C3F2D] transition flex items-center gap-2 shadow-sm"
          >
            <FiPlus className="w-5 h-5" />
            Tambah Program
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100 text-[#414844] font-inter-600 text-sm">
                <th className="px-4 sm:px-6 py-3 sm:py-4">No</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Program</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Kategori</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {programs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 sm:px-6 py-12 text-center text-gray-500 font-inter-400">
                    Belum ada program kerja yang tercatat. Silakan tambah program baru.
                  </td>
                </tr>
              ) : (
                programs.map((program, index) => (
                  <tr key={program.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 font-inter-400">
                      {skip + index + 1}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-4">
                        {program.image ? (
                          <img src={program.image} alt={program.title} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <FiImage className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-[#1C3F2D]">{program.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{program.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {program.kategori}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/program/${program.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FiEdit className="w-5 h-5" />
                        </Link>
                        <DeleteButton 
                          itemName="program"
                          isSoftDelete={true}
                          onDelete={async () => {
                            'use server';
                            await deleteProgram(program.id);
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
