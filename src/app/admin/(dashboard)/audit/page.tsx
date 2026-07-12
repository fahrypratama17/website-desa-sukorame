import prisma from '@/lib/prisma';
import { FiFileText } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

function getActionBadge(action: string) {
  switch (action) {
    case 'CREATE':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">TAMBAH BARU</span>;
    case 'UPDATE':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">DIPERBARUI</span>;
    case 'SOFT_DELETE':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">KE TONG SAMPAH</span>;
    case 'RESTORE':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 border border-teal-200">DIPULIHKAN</span>;
    case 'HARD_DELETE':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">HAPUS PERMANEN</span>;
    default:
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{action}</span>;
  }
}

export default async function AuditLogPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100, // Limit to recent 100 for performance
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D] flex items-center gap-2">
          <FiFileText className="w-6 h-6" />
          Log Audit Aktivitas
        </h2>
        <p className="text-[#414844] mt-1 font-inter-400">Rekam jejak aktivitas terbaru yang dilakukan oleh pengguna di dalam sistem.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100 text-[#414844] font-inter-600 text-sm">
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4">Pelaku</th>
                <th className="px-6 py-4">Aksi</th>
                <th className="px-6 py-4">Modul</th>
                <th className="px-6 py-4 w-1/3">Detail Objek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-inter-400">
                    Belum ada aktivitas yang terekam.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-500">
                      {new Date(log.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#E8F3ED] text-[#1C3F2D] flex items-center justify-center font-bold text-xs uppercase">
                          {log.userName.substring(0, 2)}
                        </div>
                        <span className="font-inter-600 text-gray-700 text-sm">{log.userName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-inter-500 text-[#1C3F2D] px-2 py-1 bg-gray-50 rounded-md border border-gray-100">
                        {log.entity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 font-inter-400 line-clamp-2">
                        {log.entityName}
                      </p>
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
