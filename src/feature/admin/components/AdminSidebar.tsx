import Link from 'next/link';
import { handleSignOut } from '../../../app/admin/actions';

export default function AdminSidebar({ isOpen }: { isOpen?: boolean }) {
  return (
    <aside 
      className={`bg-[#0A2615] text-white flex flex-col fixed h-full z-30 shadow-2xl md:shadow-xl transition-transform duration-300 w-64 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-montserrat-700">CMS Sukorame</h2>
          <p className="text-xs text-gray-400 mt-1 font-inter-400">Panel Admin Desa</p>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2 font-inter-500 overflow-y-auto">
        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Dashboard
        </Link>
        <Link href="/admin/berita" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-white transition">
            <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm0 2.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zM6 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H6zm0 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H6z" clipRule="evenodd" />
            <path d="M18.75 15a.75.75 0 00-1.5 0v2.25c0 .414.336.75.75.75h1.5a.75.75 0 000-1.5h-.75V15z" />
          </svg>
          Kelola Berita
        </Link>
        <Link href="/admin/program" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Kelola Program
        </Link>

        <Link href="/admin/perangkat" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Kelola Perangkat
        </Link>
        <Link href="/admin/lembaga" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          Kelola Lembaga
        </Link>
        <Link href="/admin/pengaturan" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Pengaturan Global
        </Link>
        <Link href="/admin/audit" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group">
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Log Audit Aktivitas
        </Link>
      </nav>
      <div className="p-4 border-t border-white/10">
        <form action={handleSignOut}>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-400 rounded-lg hover:bg-white/10 transition font-inter-500 group">
            <svg className="w-5 h-5 text-red-500/70 group-hover:text-red-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
