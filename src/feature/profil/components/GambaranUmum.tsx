import { gambaranUmum } from "../data/data";
import Image from "next/image";

interface GambaranUmumProps {
  data: {
    title: string;
    description: string;
    stats: { label: string; value: string }[];
  }
}

const GambaranUmum = ({ data }: GambaranUmumProps) => {
  return (
    <section className="mt-12 mb-16">
      <div className="flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-lg">
        {/* Foto Sawah */}
        <div className="w-full lg:w-1/2 min-h-[250px] sm:min-h-[350px] lg:min-h-[400px] relative">
          <Image
            src="/assets/images/profile-placeholder.png"
            alt="Profil Desa Sukorame"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Konten Gambaran Umum */}
        <div className="bg-white-150 flex w-full lg:w-1/2 flex-col justify-center px-6 py-8 md:px-10 md:py-10">
          <h2 className="font-montserrat-700 text-green-50 mb-4 text-2xl">
            {data.title}
          </h2>

          <p className="font-inter-400 text-green-250 mb-8 text-base leading-relaxed">
            {data.description}
          </p>

          {/* Divider */}
          <div className="bg-green-850/30 mb-6 h-px w-full" />

          {/* Statistik */}
          <div className="flex gap-8 md:gap-16">
            {data.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-inter-600 text-green-450 mb-1 text-xs tracking-widest">
                  {stat.label}
                </p>
                <p className="font-montserrat-700 text-green-50 text-2xl">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GambaranUmum;
