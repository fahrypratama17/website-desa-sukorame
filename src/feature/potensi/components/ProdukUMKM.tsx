import { produkUMKMData } from "../data/data";
import DynamicIcon from "@/shared/components/DynamicIcon";

const ProdukUMKM = () => {
  return (
    <section className="bg-[#FAF9F6] py-16 pb-24">
      <div className="mx-auto flex w-[90%] flex-col-reverse gap-12 lg:flex-row lg:items-center">

        {/* Left Content */}
        <div className="flex w-full flex-col gap-8 lg:w-5/12">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <DynamicIcon name={produkUMKMData.icon} className="h-8 w-8 text-[#1C3F2D]" />
              <h2 className="font-montserrat-700 text-2xl lg:text-3xl text-[#1C3F2D]">
                {produkUMKMData.title}
              </h2>
            </div>
            <p className="font-inter-400 text-base leading-relaxed text-[#414844]">
              {produkUMKMData.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {produkUMKMData.tags.map((tag, index) => (
              <span
                key={index}
                className="font-inter-500 rounded-md bg-[#E5F2EC] px-4 py-2 text-xs text-[#285A43]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Info Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="font-montserrat-700 mb-2 text-lg text-[#1C3F2D]">
              {produkUMKMData.dukunganTitle}
            </h4>
            <p className="font-inter-400 text-sm leading-relaxed text-[#414844]">
              {produkUMKMData.dukunganDesc}
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full lg:w-7/12">
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <img
              src={produkUMKMData.image}
              alt="Produk UMKM"
              className="h-[250px] sm:h-[400px] w-full object-cover lg:h-[450px]"
            />

            {/* Floating Stat Card */}
            <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 flex items-center gap-3 md:gap-4 rounded-2xl bg-white/90 p-3 md:p-4 shadow-lg backdrop-blur-md">
              <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A2615]">
                <DynamicIcon name={produkUMKMData.statIcon} className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h4 className="font-montserrat-700 text-base md:text-xl text-[#1C3F2D]">
                  {produkUMKMData.statNumber}
                </h4>
                <p className="font-inter-400 text-[10px] md:text-xs text-[#414844]">
                  {produkUMKMData.statText}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProdukUMKM;
