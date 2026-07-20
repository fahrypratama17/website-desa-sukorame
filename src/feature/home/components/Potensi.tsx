import { potensiData } from "../data/data";
import { FiArrowRight } from "react-icons/fi";

const Potensi = () => {
  return (
    <section className="bg-white-250 flex items-center justify-center pb-20 md:pb-28">
      <div className="mx-auto flex w-[90%] flex-col items-start justify-center gap-2">
        <h1 className="font-montserrat-700 text-2xl md:text-3xl lg:text-[32px] text-green-50">
          Potensi Desa
        </h1>
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 sm:gap-0">
          <p className="font-inter-400 text-sm md:text-base lg:text-[16px] text-[#414844]">
            Kekayaan lokal yang menjadi pilar ekonomi Sukorame.
          </p>
          <div className="text-mint-350 font-inter-500 flex items-center gap-2 text-[14px]">
            <a href="/potensi">Lihat Semua</a>
            <FiArrowRight className="size-3" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
          {potensiData.map(({ id, src, title, desc }) => (
            <div
              className="bg-white-50 flex flex-col overflow-hidden rounded-xl shadow-2xl duration-300 hover:-translate-y-3"
              key={id}
            >
              <img src={src} alt={title} className="w-full" />
              <div className="flex flex-col gap-1 md:gap-2 p-3 md:p-6">
                <h3 className="font-montserrat-700 text-sm md:text-[20px] text-green-50">
                  {title}
                </h3>
                <p className="font-inter-400 text-xs md:text-[16px] line-clamp-3 md:line-clamp-none">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Potensi;
