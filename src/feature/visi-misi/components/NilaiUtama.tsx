import { nilaiUtamaHeader } from "../data/data";
import type { NilaiUtama } from "@prisma/client";
import Image from "next/image";
import DynamicIcon from "@/shared/components/DynamicIcon";
import { FiFeather, FiStar } from "react-icons/fi";
interface NilaiCardProps {
  icon: string;
  title: string;
  description: string;
}

const NilaiCard = ({ icon, title, description }: NilaiCardProps) => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-xl bg-white px-5 pt-8 pb-3 text-center shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-lg">
      {/* Accent icon — top right */}
      <DynamicIcon
        name={icon}
        className="absolute -top-4 -right-4 z-0 h-20 w-20 opacity-[0.04] text-[#1C3F2D]"
      />

      {/* Icon Circle */}
      <div className="bg-green-50 relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <DynamicIcon name={icon} className="size-6 text-white" />
      </div>

      {/* Title */}
      <h4 className="font-inter-600 text-green-50 relative z-10 mb-2 text-sm">
        {title}
      </h4>

      {/* Description */}
      <p className="font-inter-400 relative z-10 mb-6 text-xs leading-relaxed text-green-450 flex-1">
        {description}
      </p>

      {/* Green accent bar at bottom */}
      <div className="bg-green-850/50 relative z-10 mt-auto h-1 w-12 rounded-full" />
    </div>
  );
};

interface NilaiUtamaSectionProps {
  nilaiItems: NilaiUtama[];
}

const NilaiUtamaSection = ({ nilaiItems }: NilaiUtamaSectionProps) => {
  if (nilaiItems.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="bg-green-950 relative overflow-hidden rounded-2xl md:rounded-[40px] px-6 py-10 md:px-10 md:py-16">
        {/* Top-Left Accent */}
        <FiStar className="absolute -top-10 -left-10 z-0 h-64 w-64 opacity-[0.05] text-[#1C3F2D]" />

        {/* Bottom-Right Accent (flipped) */}
        <FiStar className="absolute -right-10 -bottom-10 z-0 h-64 w-64 rotate-180 opacity-[0.05] text-[#1C3F2D]" />

        {/* Title */}
        <h3 className="font-montserrat-700 text-green-50 relative z-10 mb-2 text-center text-2xl">
          {nilaiUtamaHeader.title}
        </h3>

        {/* Ornament */}
        <div className="relative z-10 mb-4 flex justify-center">
          <FiFeather className="size-5 text-[#285A43]" />
        </div>

        {/* Subtitle */}
        <p className="font-inter-400 text-green-450 relative z-10 mx-auto mb-10 max-w-lg text-center text-sm leading-relaxed">
          {nilaiUtamaHeader.subtitle}
        </p>

        {/* Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nilaiItems.map((item) => (
            <NilaiCard
              key={item.id}
              icon={item.icon || "FiFeather"}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NilaiUtamaSection;
