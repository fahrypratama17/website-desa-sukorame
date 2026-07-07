import VisiSection from "../components/VisiSection.tsx";
import MisiCard from "../components/MisiCard.tsx";
import NilaiUtama from "../components/NilaiUtama.tsx";
import { visiMisiHeader } from "../data/data.ts";
import type { MisiItem } from "../data/data.ts";

const misiItems: MisiItem[] = [
  {
    icon: "/src/assets/icons/leaf.svg",
    title: "Pemberdayaan Ekonomi",
    description:
      "Meningkatkan perekonomian masyarakat melalui pemberdayaan UMKM, kelompok tani, dan pemanfaatan potensi agrikultur lokal secara berkelanjutan.",
  },
  {
    icon: "/src/assets/icons/grad.svg",
    title: "Peningkatan SDM",
    description:
      "Meningkatkan kualitas Sumber Daya Manusia melalui fasilitasi pendidikan yang inklusif, pelatihan keterampilan, dan pembinaan karakter generasi muda.",
  },
  {
    icon: "/src/assets/icons/shield.svg",
    title: "Kesehatan & Kesejahteraan",
    description:
      "Mewujudkan lingkungan desa yang sehat dan sejahtera melalui optimalisasi pelayanan posyandu, sanitasi lingkungan, dan program kesehatan masyarakat.",
  },
  {
    icon: "/src/assets/icons/transparancy.svg",
    title: "Tata Kelola Transparan",
    description:
      "Menyelenggarakan tata kelola pemerintahan desa yang bersih, transparan, dan akuntabel berbasis digitalisasi pelayanan publik.",
  },
  {
    icon: "/src/assets/icons/people-tree.svg",
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
          <div className="grid grid-cols-3 gap-6">
            {misiItems.slice(0, 3).map((item) => (
              <MisiCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          {/* Row 2: 2 cards centered */}
          <div className="mx-auto mt-6 grid max-w-[66.66%] grid-cols-2 gap-6">
            {misiItems.slice(3).map((item) => (
              <MisiCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        {/* Nilai-Nilai Utama */}
        <NilaiUtama />
      </div>
    </div>
  );
};

export default VisiMisiPage;
