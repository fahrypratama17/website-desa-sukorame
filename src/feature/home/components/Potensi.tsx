import { potensiData } from "../data/data.ts";

const Potensi = () => {
  return (
    <section className="bg-white-250 flex items-center justify-center pb-32">
      <div className="mx-auto flex w-[90%] flex-col items-start justify-center gap-2">
        <h1 className="font-montserrat-700 text-[32px] text-green-50">
          Potensi Desa
        </h1>
        <div className="flex w-full items-center justify-between">
          <p className="font-inter-400 text-[16px] text-[#414844]">
            Kekayaan lokal yang menjadi pilar ekonomi Sukorame.
          </p>
          <div className="text-mint-350 font-inter-500 flex items-center gap-2 text-[14px]">
            <a href="/">Lihat Semua</a>
            <img
              src="/src/assets/icons/arrow.svg"
              alt="arrow"
              className="size-3"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-6">
          {potensiData.map(({ id, src, title, desc }) => (
            <div
              className="bg-white-50 flex flex-col overflow-hidden rounded-xl shadow-2xl duration-300 hover:-translate-y-3"
              key={id}
            >
              <img src={src} alt={title} className="w-full" />
              <div className="flex flex-col gap-2 p-6">
                <h3 className="font-montserrat-700 text-[20px] text-green-50">
                  {title}
                </h3>
                <p className="font-inter-400 text-[16px]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Potensi;
