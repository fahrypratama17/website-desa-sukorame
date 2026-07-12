import LembagaCard from "../components/LembagaCard";
import KolaborasiCard from "../components/KolaborasiCard";
import { kolaborasiData } from "../data/data";
import Link from "next/link";
import { Lembaga } from "@prisma/client";
import { FiShield } from "react-icons/fi";

interface LembagaPageProps {
  lembagaData: Lembaga[];
}

const LembagaPage = ({ lembagaData }: LembagaPageProps) => {
  return (
    <div className="min-h-screen bg-[#F9F7F3] pt-12 pb-24">
      {/* Header Section */}
      <section className="mx-auto w-[90%] text-center mb-16">
        <h1 className="font-montserrat-700 text-green-50 mb-6 text-4xl">
          Lembaga Desa
        </h1>
        <p className="font-inter-400 mx-auto max-w-3xl text-base leading-relaxed text-[#5F6561]">
          Mengenal lebih dekat organisasi dan institusi yang berperan aktif dalam membangun, 
          membina, dan memberdayakan masyarakat Desa Sukorame menuju desa yang mandiri dan sejahtera.
        </p>
      </section>

      {/* Lembaga Grid */}
      <section className="mx-auto w-[90%] mb-24">
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {lembagaData.map((item) => (
            <LembagaCard 
              key={item.name}
              name={item.name}
              description={item.description}
              logo={item.logo || ""}
            />
          ))}
        </div>
      </section>

      {/* Kolaborasi Section */}
      <section className="mx-auto w-[90%] mb-24">
        <div className="text-center mb-12">
          <h2 className="font-montserrat-700 text-green-50 mb-4 text-3xl">
            Kolaborasi untuk Desa
          </h2>
          <p className="font-inter-400 mx-auto max-w-2xl text-sm leading-relaxed text-[#5F6561]">
            Sinergi antar lembaga adalah kunci keberhasilan pembangunan. Kami mengundang 
            seluruh elemen masyarakat untuk berpartisipasi aktif.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
          {kolaborasiData.map((item) => (
            <KolaborasiCard 
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="mx-auto w-[90%]">
        <div className="rounded-[32px] bg-[#0A2615] px-12 py-16 relative overflow-hidden">
          {/* Accent icon */}
          <FiShield className="absolute -top-16 -right-12 z-0 h-80 w-80 opacity-[0.05] text-white" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="font-montserrat-700 text-white mb-6 text-3xl">
              Kolaborasi untuk Desa
            </h2>
            <p className="font-inter-400 text-white/80 mb-10 text-base leading-relaxed">
              Keberhasilan pembangunan Desa Sukorame tidak lepas dari sinergi kuat antar lembaga. 
              Mari bersama-sama wujudkan desa yang tangguh, inovatif, dan berbudaya melalui 
              partisipasi aktif dalam setiap program desa.
            </p>
            <Link 
              href="/kontak" 
              className="inline-flex items-center gap-2 rounded-full bg-[#1A452F] px-6 py-3 text-sm font-inter-600 text-white transition-colors hover:bg-[#235C3E]"
            >
              Hubungi Lembaga Desa
              <FiShield className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LembagaPage;