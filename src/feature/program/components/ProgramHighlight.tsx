import { programHighlightData } from "../data/data.ts";

const ProgramHighlight = () => {
  return (
    <section className="bg-[#FAF9F6] pb-24">
      <div className="mx-auto flex w-[90%] flex-col overflow-hidden rounded-[40px] bg-white shadow-sm lg:flex-row">
        
        {/* Left Content */}
        <div className="flex w-full flex-col items-start justify-center p-12 lg:w-1/2 lg:p-16">
          {/* Badge */}
          <div className="mb-6 rounded-full bg-[#0A2615] px-4 py-1.5">
            <span className="font-inter-600 text-xs tracking-wider text-white">
              {programHighlightData.badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-montserrat-700 mb-6 text-3xl leading-tight text-[#1C3F2D] lg:text-4xl">
            {programHighlightData.title}
          </h2>

          {/* Description */}
          <p className="font-inter-400 mb-8 text-base leading-relaxed text-[#414844]">
            {programHighlightData.description}
          </p>

          {/* Button */}
          <a
            href={programHighlightData.buttonLink}
            className="font-inter-600 rounded-lg bg-[#0A2615] px-6 py-3.5 text-sm text-white transition-colors hover:bg-[#1C3F2D]"
          >
            {programHighlightData.buttonText}
          </a>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={programHighlightData.image}
            alt="Program Highlight"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default ProgramHighlight;
