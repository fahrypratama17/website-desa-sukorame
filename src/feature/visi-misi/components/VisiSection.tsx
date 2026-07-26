interface VisiSectionProps {
  data: {
    quote: string;
    description: string;
  }
}

import { FiEye } from "react-icons/fi";

const VisiSection = ({ data }: VisiSectionProps) => {
  return (
    <section className="mb-16">
      <div className="bg-green-150 relative overflow-hidden rounded-2xl md:rounded-[32px] p-6 md:p-12 text-left flex flex-col items-start w-full">
        {/* Accent icon */}
        <FiEye className="absolute -top-12 -right-12 z-0 h-64 w-64 opacity-[0.05] text-white" />

        <div className="bg-green-250 relative z-10 mb-6 w-fit rounded-full px-4 py-1.5">
          <p className="font-inter-600 text-white text-xs tracking-wide">
            VISI DESA
          </p>
        </div>
        <h2 className="font-montserrat-700 relative z-10 text-white mb-4 text-2xl md:text-3xl leading-[1.4] max-w-4xl">
          {data.quote}
        </h2>
        <p className="font-inter-400 relative z-10 text-white/80 text-sm md:text-base leading-relaxed max-w-3xl">
          {data.description}
        </p>
      </div>
    </section>
  );
};

export default VisiSection;
