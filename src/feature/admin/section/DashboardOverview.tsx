import Link from "next/link";

interface DashboardDataProps {
  stats: {
    totalBerita: number;
    totalProgram: number;
    totalPerangkat: number;
    totalLembaga: number;
  };
  recentActivities: {
    id: number;
    type: string;
    title: string;
    createdAt: Date;
    link: string;
    author?: string;
  }[];
}

export default function DashboardOverview({ stats, recentActivities }: DashboardDataProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Selamat Datang di Dashboard!</h2>
        <p className="text-[#414844] mt-2 font-inter-400">Ringkasan aktivitas dan statistik Website Desa Sukorame.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card: Total Berita */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0A2615]/5 rounded-full group-hover:scale-110 transition duration-300"></div>
          <div className="flex items-center gap-3">
             <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L17.5 4.5" /></svg>
             </div>
            <span className="text-sm font-inter-500 text-gray-500">Total Berita</span>
          </div>
          <span className="text-3xl font-montserrat-700 text-[#1C3F2D] mt-2">{stats.totalBerita}</span>
        </div>

        {/* Card: Total Program */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0A2615]/5 rounded-full group-hover:scale-110 transition duration-300"></div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <span className="text-sm font-inter-500 text-gray-500">Total Program</span>
          </div>
          <span className="text-3xl font-montserrat-700 text-[#1C3F2D] mt-2">{stats.totalProgram}</span>
        </div>
        
        {/* Card: Jumlah Perangkat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0A2615]/5 rounded-full group-hover:scale-110 transition duration-300"></div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <span className="text-sm font-inter-500 text-gray-500">Jumlah Perangkat</span>
          </div>
          <span className="text-3xl font-montserrat-700 text-[#1C3F2D] mt-2">{stats.totalPerangkat}</span>
        </div>

        {/* Card: Jumlah Lembaga */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0A2615]/5 rounded-full group-hover:scale-110 transition duration-300"></div>
          <div className="flex items-center gap-3">
             <div className="p-3 bg-green-950 rounded-xl text-green-50">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
             </div>
            <span className="text-sm font-inter-500 text-gray-500">Jumlah Lembaga</span>
          </div>
          <span className="text-3xl font-montserrat-700 text-[#1C3F2D] mt-2">{stats.totalLembaga}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-montserrat-600 text-[#1C3F2D] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Aktivitas Terakhir
          </h3>
          {recentActivities.length > 0 ? (
            <div className="flex flex-col gap-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition">
                  <div className="flex flex-col">
                    <span className="font-inter-600 text-[#1C3F2D] text-sm">{activity.title}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-inter-500 px-2 py-0.5 bg-white border border-gray-200 rounded-md text-gray-600">{activity.type}</span>
                      <span className="text-xs text-gray-500 font-inter-400">
                        {activity.author && <span className="font-inter-500">{activity.author} &bull; </span>}
                        {new Date(activity.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <Link href={activity.link} className="text-[#1C3F2D] hover:text-green-700 bg-white p-2 rounded-lg border border-gray-200 shadow-sm transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic font-inter-400">Belum ada aktivitas baru. Data aktivitas akan muncul di sini setelah Anda mulai mengelola konten desa.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-montserrat-600 text-[#1C3F2D] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Aksi Cepat
          </h3>
          <div className="flex flex-col gap-3">
            <Link href="/admin/berita/tambah" className="flex items-center gap-3 p-3 rounded-xl bg-green-50/5 text-[#1C3F2D] font-inter-500 hover:bg-green-50/10 transition border border-green-50/10">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L17.5 4.5" /></svg>
              </div>
              Tulis Berita Baru
            </Link>
            <Link href="/admin/program/tambah" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 font-inter-500 hover:bg-gray-100 transition border border-gray-200">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              Tambah Program
            </Link>
            <Link href="/admin/pengaturan" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 font-inter-500 hover:bg-gray-100 transition border border-gray-200">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              Pengaturan Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
