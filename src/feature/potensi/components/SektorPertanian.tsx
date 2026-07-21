import { sektorPertanianData } from "../data/data";
import DynamicIcon from "@/shared/components/DynamicIcon";
import { FiArrowRight } from "react-icons/fi";

const SektorPertanian = () => {
  return (
    <section className="bg-[#FAF9F6] py-16">
      <div className="mx-auto flex w-[90%] flex-col gap-12 lg:flex-row lg:items-center">
        
        {/* Left Images Collage */}
        <div className="relative w-full lg:w-1/2">
          {/* Subtle glow behind images */}
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B2D8C6] opacity-40 blur-3xl"></div>
          
          <div className="relative flex items-center justify-center gap-4">
            <img
              src={sektorPertanianData.image1}
              alt="Rice Fields"
              className="mt-12 h-44 sm:h-64 w-1/2 rounded-3xl object-cover shadow-lg"
            />
            <img
              src={sektorPertanianData.image2}
              alt="Farmer"
              className="mb-12 h-44 sm:h-64 w-1/2 rounded-3xl object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="flex w-full flex-col items-start gap-8 lg:w-1/2 lg:pl-10">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <DynamicIcon name={sektorPertanianData.icon} className="h-8 w-8 text-[#1C3F2D]" />
              <h2 className="font-montserrat-700 text-2xl lg:text-3xl text-[#1C3F2D]">
                {sektorPertanianData.title}
              </h2>
            </div>
            <p className="font-inter-400 text-base leading-relaxed text-[#414844]">
              {sektorPertanianData.description}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {sektorPertanianData.features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5F2EC]">
                  <DynamicIcon name={feature.icon} className="h-5 w-5 text-[#1C3F2D]" />
                </div>
                <div>
                  <h4 className="font-montserrat-700 mb-1 text-lg text-[#1C3F2D]">
                    {feature.title}
                  </h4>
                  <p className="font-inter-400 text-sm leading-relaxed text-[#414844]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={sektorPertanianData.buttonLink}
            className="font-inter-600 flex w-fit items-center gap-2 rounded-lg bg-[#285A43] px-6 py-3 text-sm text-white transition-colors hover:bg-[#1C3F2D]"
          >
            {sektorPertanianData.buttonText}
            <FiArrowRight className="h-4 w-4 text-white" />
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default SektorPertanian;
