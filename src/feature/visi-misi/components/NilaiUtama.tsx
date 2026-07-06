import type { ReactNode } from "react";
import { nilaiUtamaHeader } from "../data/data.ts";
import type { NilaiUtamaItem } from "../data/data.ts";

const nilaiItems: NilaiUtamaItem[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Gotong Royong",
    description: "Bersama membangun desa dengan kebersamaan dan kepedulian.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Transparansi",
    description: "Terbuka, jujur, dan akuntabel dalam setiap keputusan dan pengelolaan.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10 11 11 .9c.6 0 .9.5.8 1.1l-.8 5h-1"/><path d="M16 18h-5"/><path d="M18 5a1 1 0 0 0-1 1v5.573"/><path d="M3 4h9l1 7.246"/><path d="M4 11V4"/><path d="M7 15h.01"/><path d="M8 10.1V4"/><circle cx="18" cy="18" r="2"/><circle cx="7" cy="15" r="5"/>
      </svg>
    ),
    title: "Inovasi Agrikultur",
    description: "Mengembangkan pertanian modern untuk masa depan yang berkelanjutan.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="M2 16v-6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/>
      </svg>
    ),
    title: "Pelayanan Prima",
    description: "Melayani masyarakat dengan cepat, ramah, dan sepenuh hati.",
  },
];

interface NilaiCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const NilaiCard = ({ icon, title, description }: NilaiCardProps) => {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white px-5 pt-8 pb-3 text-center shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-lg">
      {/* Icon Circle */}
      <div className="bg-green-50 mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white">
        {icon}
      </div>

      {/* Title */}
      <h4 className="font-inter-600 text-green-50 mb-2 text-sm">
        {title}
      </h4>

      {/* Description */}
      <p className="font-inter-400 mb-6 text-xs leading-relaxed text-green-450">
        {description}
      </p>

      {/* Green accent bar at bottom */}
      <div className="bg-green-350 mt-auto h-1 w-12 rounded-full" />
    </div>
  );
};

const NilaiUtama = () => {
  return (
    <section className="mb-16">
      <div className="bg-green-950 relative overflow-hidden rounded-[40px] px-10 py-16">
        {/* Top-Left Watermark (Potted Plant) */}
        <div className="text-green-850 absolute -top-4 -left-4 opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 10v4" /><path d="M8 6h8" /><path d="M10 6v4" /><path d="M14 6v4" /><path d="M7 14h10l-1.5 6h-7z" />
          </svg>
        </div>

        {/* Bottom-Right Watermark (House/Hut) */}
        <div className="text-green-850 absolute -bottom-4 -right-4 opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10l9-7 9 7" /><path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10" /><path d="M10 22V12h4v10" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="font-montserrat-700 text-green-50 relative z-10 mb-2 text-center text-2xl">
          {nilaiUtamaHeader.title}
        </h3>

        {/* Ornament */}
        <div className="relative z-10 mb-4 flex justify-center text-[#2B694D]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>

        {/* Subtitle */}
        <p className="font-inter-400 text-green-450 relative z-10 mx-auto mb-10 max-w-lg text-center text-sm leading-relaxed">
          {nilaiUtamaHeader.subtitle}
        </p>

        {/* Cards Grid */}
        <div className="relative z-10 grid grid-cols-4 gap-6">
          {nilaiItems.map((item) => (
            <NilaiCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NilaiUtama;
