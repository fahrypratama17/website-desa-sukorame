import Link from "next/link";
import { FiFileText, FiBriefcase, FiUsers, FiBox, FiClock, FiArrowRight, FiZap, FiSettings } from "react-icons/fi";

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
               <FiFileText className="w-6 h-6" />
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
              <FiBriefcase className="w-6 h-6" />
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
              <FiUsers className="w-6 h-6" />
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
               <FiBox className="w-6 h-6" />
             </div>
            <span className="text-sm font-inter-500 text-gray-500">Jumlah Lembaga</span>
          </div>
          <span className="text-3xl font-montserrat-700 text-[#1C3F2D] mt-2">{stats.totalLembaga}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-montserrat-600 text-[#1C3F2D] mb-4 flex items-center gap-2">
            <FiClock className="w-5 h-5 text-gray-400" />
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
                    <FiArrowRight className="w-4 h-4" />
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
            <FiZap className="w-5 h-5 text-gray-400" />
            Aksi Cepat
          </h3>
          <div className="flex flex-col gap-3">
            <Link href="/admin/berita/tambah" className="flex items-center gap-3 p-3 rounded-xl bg-green-50/5 text-[#1C3F2D] font-inter-500 hover:bg-green-50/10 transition border border-green-50/10">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FiFileText className="w-4 h-4 text-green-700" />
              </div>
              Tulis Berita Baru
            </Link>
            <Link href="/admin/program/tambah" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 font-inter-500 hover:bg-gray-100 transition border border-gray-200">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FiBriefcase className="w-4 h-4 text-purple-600" />
              </div>
              Tambah Program
            </Link>
            <Link href="/admin/pengaturan" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 font-inter-500 hover:bg-gray-100 transition border border-gray-200">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FiSettings className="w-4 h-4 text-amber-600" />
              </div>
              Pengaturan Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
