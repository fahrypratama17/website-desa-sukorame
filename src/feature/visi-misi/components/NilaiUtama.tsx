import { nilaiUtamaHeader } from "../data/data.ts";
import type { NilaiUtamaItem } from "../data/data.ts";

const nilaiItems: NilaiUtamaItem[] = [
  {
    icon: "/src/assets/icons/three-people.svg",
    title: "Gotong Royong",
    description: "Bersama membangun desa dengan kebersamaan dan kepedulian.",
  },
  {
    icon: "/src/assets/icons/eye.svg",
    title: "Transparansi",
    description: "Terbuka, jujur, dan akuntabel dalam setiap keputusan dan pengelolaan.",
  },
  {
    icon: "/src/assets/icons/agriculture.svg",
    title: "Inovasi Agrikultur",
    description: "Mengembangkan pertanian modern untuk masa depan yang berkelanjutan.",
  },
  {
    icon: "/src/assets/icons/hand-care.svg",
    title: "Pelayanan Prima",
    description: "Melayani masyarakat dengan cepat, ramah, dan sepenuh hati.",
  },
];

interface NilaiCardProps {
  icon: string;
  title: string;
  description: string;
}

const NilaiCard = ({ icon, title, description }: NilaiCardProps) => {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white px-5 pt-8 pb-3 text-center shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-lg">
      {/* Icon Circle */}
      <div className="bg-green-50 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <img src={icon} alt={title} className="size-6" />
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
      <div className="bg-green-850/50 mt-auto h-1 w-12 rounded-full" />
    </div>
  );
};

const NilaiUtama = () => {
  return (
    <section className="mb-16">
      <div className="bg-green-950 relative overflow-hidden rounded-[40px] px-10 py-16">
        {/* Top-Left Accent */}
        <img
          src="/src/assets/icons/potted_plant.svg"
          alt=""
          className="absolute -top-2 -left-2 z-0 h-28 w-28 opacity-30"
        />

        {/* Bottom-Right Accent (flipped) */}
        <img
          src="/src/assets/icons/potted_plant.svg"
          alt=""
          className="absolute -right-2 -bottom-2 z-0 h-28 w-28 rotate-180 opacity-30"
        />

        {/* Title */}
        <h3 className="font-montserrat-700 text-green-50 relative z-10 mb-2 text-center text-2xl">
          {nilaiUtamaHeader.title}
        </h3>

        {/* Ornament */}
        <div className="relative z-10 mb-4 flex justify-center">
          <img
            src="/src/assets/icons/leaf-green.svg"
            alt="ornament"
            className="size-5"
          />
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
