import { kategoriProgramData } from "../data/data.ts";

const KategoriProgram = () => {
  return (
    <section className="bg-[#FAF9F6] pb-16">
      <div className="mx-auto grid w-[90%] grid-cols-1 gap-6 md:grid-cols-3">
        {kategoriProgramData.map((kategori) => (
          <div
            key={kategori.id}
            className="flex flex-col items-start gap-4 rounded-3xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F2EC]">
              <div
                className="h-6 w-6 bg-[#1C3F2D]"
                style={{
                  WebkitMaskImage: `url(${kategori.icon})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url(${kategori.icon})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="font-montserrat-700 mb-2 text-xl text-[#1C3F2D]">
                {kategori.title}
              </h3>
              <p className="font-inter-400 text-sm leading-relaxed text-[#414844]">
                {kategori.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KategoriProgram;
