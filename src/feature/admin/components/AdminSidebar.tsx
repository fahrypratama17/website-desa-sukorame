import Link from 'next/link';
import { handleSignOut } from '../../../app/admin/actions';
import { FiGrid, FiFileText, FiBriefcase, FiUsers, FiBox, FiSettings, FiClipboard, FiLogOut, FiX } from 'react-icons/fi';

export default function AdminSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  return (
    <aside 
      className={`bg-[#0A2615] text-white flex flex-col fixed h-full z-40 shadow-2xl md:shadow-xl transition-transform duration-300 w-64 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-montserrat-700">CMS Sukorame</h2>
          <p className="text-xs text-gray-400 mt-1 font-inter-400">Panel Admin Desa</p>
        </div>
        <button 
          onClick={onClose}
          className="md:hidden p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
          aria-label="Tutup menu"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2 font-inter-500 overflow-y-auto">
        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <FiGrid className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          Dashboard
        </Link>
        <Link href="/admin/berita" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <FiFileText className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          Kelola Berita
        </Link>
        <Link href="/admin/program" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <FiBriefcase className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          Kelola Program
        </Link>

        <Link href="/admin/perangkat" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <FiUsers className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          Kelola Perangkat
        </Link>
        <Link href="/admin/lembaga" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <FiBox className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          Kelola Lembaga
        </Link>
        <Link href="/admin/pengaturan" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <FiSettings className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          Pengaturan Global
        </Link>
        <Link href="/admin/audit" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <FiClipboard className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          Log Audit Aktivitas
        </Link>
      </nav>
      <div className="p-4 border-t border-white/10">
        <form action={handleSignOut}>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-400 rounded-lg hover:bg-white/10 transition font-inter-500 group">
            <FiLogOut className="w-5 h-5 text-red-500/70 group-hover:text-red-400 transition" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
