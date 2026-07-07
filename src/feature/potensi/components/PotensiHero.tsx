import { potensiHeroData } from "../data/data.ts";

const PotensiHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] py-16 lg:py-24">
      {/* Decorative leaf on the left */}
      <div className="absolute top-1/2 -left-10 h-32 w-32 -translate-y-1/2 rounded-full bg-[#B2D8C6] opacity-60 blur-xl"></div>

      <div className="mx-auto flex w-[90%] flex-col items-center gap-12 lg:flex-row lg:justify-between">
        {/* Left Content */}
        <div className="relative z-10 flex max-w-lg flex-col items-start gap-6 lg:w-1/2">
          {/* Badge */}
          <div className="flex items-center gap-2 rounded-full bg-[#E5F2EC] px-4 py-2">
            <img
              src="/src/assets/icons/star-circle.svg"
              alt="Leaf"
              className="h-4 w-4"
            />
            <span className="font-inter-600 text-xs text-[#285A43]">
              {potensiHeroData.badge}
            </span>
          </div>

          {/* Titles */}
          <div className="flex flex-col gap-2">
            <span className="font-inter-400 text-lg text-[#414844]">
              Potensi Lokal
            </span>
            <h1 className="font-montserrat-700 text-4xl leading-tight text-[#1C3F2D] lg:text-5xl">
              Desa Sukorame
            </h1>
          </div>

          {/* Description */}
          <p className="font-inter-400 text-base leading-relaxed text-[#414844]">
            {potensiHeroData.description}
          </p>
        </div>

        {/* Right Image */}
        <div className="relative z-10 w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={potensiHeroData.image}
              alt="Potensi Desa Sukorame"
              className="h-[400px] w-full object-cover lg:h-[500px]"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2615] via-[#0A2615]/40 to-transparent"></div>
            
            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 p-8 lg:p-12">
              <p className="font-inter-600 mb-2 text-xs tracking-[0.2em] text-[#A3C7B3] uppercase">
                {potensiHeroData.imageTitle}
              </p>
              <h3 className="font-montserrat-700 text-3xl text-white">
                {potensiHeroData.imageSubtitle}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PotensiHero;
