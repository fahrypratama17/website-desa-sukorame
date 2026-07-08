export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Selamat Datang di Dashboard!</h2>
        <p className="text-[#414844] mt-2 font-inter-400">Ringkasan aktivitas dan data Website Desa Sukorame.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card: Total Program */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0A2615]/5 rounded-full group-hover:scale-110 transition duration-300"></div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0A2615]/10 rounded-xl text-[#1C3F2D]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <span className="text-sm font-inter-500 text-gray-500">Total Program</span>
          </div>
          <span className="text-3xl font-montserrat-700 text-[#1C3F2D] mt-2">12</span>
        </div>
        
        {/* Card: Total Potensi */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0A2615]/5 rounded-full group-hover:scale-110 transition duration-300"></div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0A2615]/10 rounded-xl text-[#1C3F2D]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <span className="text-sm font-inter-500 text-gray-500">Total Potensi</span>
          </div>
          <span className="text-3xl font-montserrat-700 text-[#1C3F2D] mt-2">8</span>
        </div>

        {/* Card: Jumlah Perangkat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0A2615]/5 rounded-full group-hover:scale-110 transition duration-300"></div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0A2615]/10 rounded-xl text-[#1C3F2D]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <span className="text-sm font-inter-500 text-gray-500">Jumlah Perangkat</span>
          </div>
          <span className="text-3xl font-montserrat-700 text-[#1C3F2D] mt-2">5</span>
        </div>

        {/* Card: Status Website */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0A2615]/5 rounded-full group-hover:scale-110 transition duration-300"></div>
          <div className="flex items-center gap-3">
             <div className="p-3 bg-green-100 rounded-xl text-green-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             </div>
            <span className="text-sm font-inter-500 text-gray-500">Status Website</span>
          </div>
          <span className="text-xl font-montserrat-700 text-green-600 mt-3">Online</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
        <h3 className="text-lg font-montserrat-600 text-[#1C3F2D] mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Aktivitas Terakhir
        </h3>
        <p className="text-gray-500 text-sm italic font-inter-400">Belum ada aktivitas baru. Data aktivitas akan muncul di sini setelah Anda mulai mengelola konten desa.</p>
      </div>
    </div>
  );
}
