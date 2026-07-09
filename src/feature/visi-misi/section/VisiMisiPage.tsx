import VisiSection from "../components/VisiSection";
import MisiCard from "../components/MisiCard";
import NilaiUtamaSection from "../components/NilaiUtama";
import { visiMisiHeader } from "../data/data";
import type { Misi, NilaiUtama } from "@prisma/client";

interface VisiMisiPageProps {
  settings: Record<string, string>;
  misiItems: Misi[];
  nilaiItems: NilaiUtama[];
}

const VisiMisiPage = ({ settings, misiItems, nilaiItems }: VisiMisiPageProps) => {
  const visiData = {
    quote: settings.desa_visi || '"Terwujudnya Desa Sukorame yang Mandiri, Sejahtera, dan Berbudaya melalui Peningkatan Ekonomi Berbasis Agrikultur dan Tata Kelola Pemerintahan yang Transparan."',
    description: settings.desa_visi_subtitle || "Visi ini menjadi bintang penunjuk arah dalam setiap kebijakan dan program yang kami jalankan, memastikan bahwa pembangunan desa selalu berpusat pada kesejahteraan warga dan pelestarian lingkungan."
  };

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
        <VisiSection data={visiData} />

        {/* Misi Pembangunan Desa */}
        <section className="mb-12">
          <h2 className="font-montserrat-700 text-green-50 mb-8 text-xl">
            Misi Pembangunan Desa
          </h2>

          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {misiItems.slice(0, 3).map((item) => (
              <MisiCard
                key={item.id}
                icon={item.icon || "/assets/icons/leaf.svg"}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          {/* Row 2: remaining cards centered */}
          {misiItems.length > 3 && (
            <div className="mx-auto mt-6 grid max-w-[66.66%] grid-cols-1 md:grid-cols-2 gap-6">
              {misiItems.slice(3).map((item) => (
                <MisiCard
                  key={item.id}
                  icon={item.icon || "/assets/icons/leaf.svg"}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          )}

          {misiItems.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              Belum ada data misi.
            </div>
          )}
        </section>

        {/* Nilai-Nilai Utama */}
        <NilaiUtamaSection nilaiItems={nilaiItems} />
      </div>
    </div>
  );
};

export default VisiMisiPage;
