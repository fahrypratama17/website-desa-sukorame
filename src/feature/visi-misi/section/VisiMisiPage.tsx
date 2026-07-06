import VisiSection from "../components/VisiSection.tsx";
import MisiCard from "../components/MisiCard.tsx";
import NilaiUtama from "../components/NilaiUtama.tsx";
import { visiMisiHeader } from "../data/data.ts";
import type { MisiItem } from "../data/data.ts";

const misiItems: MisiItem[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    title: "Pemberdayaan Ekonomi",
    description:
      "Meningkatkan perekonomian masyarakat melalui pemberdayaan UMKM, kelompok tani, dan pemanfaatan potensi agrikultur lokal secara berkelanjutan.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      </svg>
    ),
    title: "Peningkatan SDM",
    description:
      "Meningkatkan kualitas Sumber Daya Manusia melalui fasilitasi pendidikan yang inklusif, pelatihan keterampilan, dan pembinaan karakter generasi muda.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12h6" /><path d="M12 9v6" />
      </svg>
    ),
    title: "Kesehatan & Kesejahteraan",
    description:
      "Mewujudkan lingkungan desa yang sehat dan sejahtera melalui optimalisasi pelayanan posyandu, sanitasi lingkungan, dan program kesehatan masyarakat.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 8 4 8" />
      </svg>
    ),
    title: "Tata Kelola Transparan",
    description:
      "Menyelenggarakan tata kelola pemerintahan desa yang bersih, transparan, dan akuntabel berbasis digitalisasi pelayanan publik.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
        <path d="M5.5 14v-2.5a1.5 1.5 0 0 1 3 0V14z" />
        <path d="M8.5 14v4h10.5" />
        <path d="M14 18v-5" />
        <path d="M11 13a2.5 2.5 0 0 1-2-2.5 4 4 0 0 1 8 0 2.5 2.5 0 0 1 2 2.5h-8z" />
      </svg>
    ),
    title: "Pelestarian Budaya",
    description:
      "Melestarikan nilai-nilai gotong royong, kearifan lokal, dan tradisi budaya masyarakat desa sebagai identitas dan pemersatu warga.",
  },
];

const VisiMisiPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-[90%] pt-12">
        {/* Header */}
        <section className="mb-12 text-center">
          <h1 className="font-montserrat-700 text-green-50 mb-4 text-4xl">
            {visiMisiHeader.title}
          </h1>
          <p className="font-inter-400 text-green-350 mx-auto max-w-2xl text-base leading-relaxed">
            {visiMisiHeader.subtitle}
          </p>
        </section>

        {/* Visi */}
        <VisiSection />

        {/* Misi Pembangunan Desa */}
        <section className="mb-12">
          <h2 className="font-montserrat-700 text-green-50 mb-8 text-xl">
            Misi Pembangunan Desa
          </h2>

          {/* Row 1: 3 cards */}
          <div className="relative grid grid-cols-3 gap-6">
            {misiItems.slice(0, 3).map((item) => (
              <MisiCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}

            {/* Dashed connecting lines between cards */}
            <div className="pointer-events-none absolute top-1/2 left-[33.33%] h-0 w-[33.33%] -translate-y-1/2 border-t-2 border-dashed border-green-850/30" />
          </div>

          {/* Row 2: 2 cards centered */}
          <div className="relative mx-auto mt-6 grid max-w-[66.66%] grid-cols-2 gap-6">
            {misiItems.slice(3).map((item) => (
              <MisiCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}

            {/* Dashed connecting line */}
            <div className="pointer-events-none absolute top-1/2 left-[25%] h-0 w-[50%] -translate-y-1/2 border-t-2 border-dashed border-green-850/30" />
          </div>

          {/* Vertical dashed line connecting rows */}
          <div className="pointer-events-none mx-auto h-6 w-0 border-l-2 border-dashed border-green-850/30" />
        </section>

        {/* Nilai-Nilai Utama */}
        <NilaiUtama />
      </div>
    </div>
  );
};

export default VisiMisiPage;
