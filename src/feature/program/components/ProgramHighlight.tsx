import { programHighlightData } from "../data/data";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const ProgramHighlight = () => {
  return (
    <section className="bg-[#FAF9F6] pb-16 md:pb-24">
      <div className="mx-auto flex w-[90%] flex-col overflow-hidden rounded-3xl lg:rounded-[40px] bg-white shadow-sm lg:flex-row">
        
        {/* Left Content */}
        <div className="flex w-full flex-col items-start justify-center p-6 sm:p-10 lg:p-16 lg:w-1/2">
          {/* Badge */}
          <div className="mb-4 md:mb-6 rounded-full bg-[#0A2615] px-4 py-1.5">
            <span className="font-inter-600 text-xs tracking-wider text-white">
              {programHighlightData.badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-montserrat-700 mb-4 md:mb-6 text-2xl sm:text-3xl leading-tight text-[#1C3F2D] lg:text-4xl">
            {programHighlightData.title}
          </h2>

          {/* Description */}
          <p className="font-inter-400 mb-6 md:mb-8 text-sm sm:text-base leading-relaxed text-[#414844]">
            {programHighlightData.description}
          </p>

        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 h-[250px] sm:h-[350px] lg:h-auto overflow-hidden">
          <Image
            src={programHighlightData.image}
            alt="Program Highlight"
            width={800}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default ProgramHighlight;
