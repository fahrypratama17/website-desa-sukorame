import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#FAF9F6] p-4 text-center">
      <div className="w-24 h-24 mb-8 bg-[#285A43]/10 rounded-full flex items-center justify-center">
        <span className="text-5xl">🌱</span>
      </div>
      
      <h1 className="text-6xl font-montserrat-700 text-[#1C3F2D] mb-4">404</h1>
      <h2 className="text-2xl font-montserrat-600 text-[#285A43] mb-6">Halaman Tidak Ditemukan</h2>
      
      <p className="text-gray-600 font-inter-400 max-w-md mb-10 leading-relaxed">
        Maaf, sepertinya halaman yang Anda cari sedang dalam pengembangan atau tautannya mungkin rusak. Mari kembali menjelajahi keindahan Desa Sukorame.
      </p>
      
      <Link 
        href="/"
        className="px-8 py-4 bg-[#0A2615] text-white rounded-xl font-inter-600 hover:bg-[#1C3F2D] transition-colors duration-300 flex items-center gap-2"
      >
        <span>Kembali ke Beranda</span>
      </Link>
    </main>
  );
}
