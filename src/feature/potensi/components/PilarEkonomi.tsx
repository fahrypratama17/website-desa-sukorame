import { pilarEkonomiData } from "../data/data.ts";

const PilarEkonomi = () => {
  return (
    <section className="bg-[#FAF9F6] py-16">
      <div className="mx-auto w-[90%]">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-montserrat-700 mb-4 text-3xl text-[#1C3F2D]">
            {pilarEkonomiData.title}
          </h2>
          <p className="font-inter-400 text-[#414844]">
            {pilarEkonomiData.description}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid h-auto grid-cols-1 gap-6 md:h-[500px] md:grid-cols-3 md:grid-rows-2">
          
          {/* Card 1 (Large left) */}
          <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl md:col-span-1">
            <img
              src={pilarEkonomiData.items[0].image}
              alt={pilarEkonomiData.items[0].title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2615] via-[#0A2615]/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7BB08F]">
                <img
                  src={pilarEkonomiData.items[0].icon}
                  alt="icon"
                  className="h-6 w-6 brightness-0 invert"
                />
              </div>
              <h3 className="font-montserrat-700 mb-2 text-2xl text-white">
                {pilarEkonomiData.items[0].title}
              </h3>
              <p className="font-inter-400 text-sm text-[#D1E6DA]">
                {pilarEkonomiData.items[0].description}
              </p>
            </div>
          </div>

          {/* Card 2 (Top right, wide) */}
          <div className="group col-span-1 row-span-1 flex overflow-hidden rounded-3xl bg-white shadow-sm md:col-span-2 md:flex-row">
            <img
              src={pilarEkonomiData.items[1].image}
              alt={pilarEkonomiData.items[1].title}
              className="h-48 w-full object-cover md:h-full md:w-1/3"
            />
            <div className="flex flex-col justify-center p-8 md:w-2/3">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={pilarEkonomiData.items[1].icon}
                  alt="icon"
                  className="h-6 w-6"
                />
                <h3 className="font-montserrat-700 text-xl text-[#1C3F2D]">
                  {pilarEkonomiData.items[1].title}
                </h3>
              </div>
              <p className="font-inter-400 text-sm leading-relaxed text-[#414844]">
                {pilarEkonomiData.items[1].description}
              </p>
            </div>
          </div>

          {/* Card 3 (Bottom right 1) */}
          <div className="group col-span-1 row-span-1 flex flex-col justify-between rounded-3xl bg-[#0A2615] p-8 md:col-span-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1C3F2D]">
              <img
                src={pilarEkonomiData.items[2].icon}
                alt="icon"
                className="h-6 w-6 brightness-0 invert"
              />
            </div>
            <div>
              <h3 className="font-montserrat-700 mb-2 text-xl text-white">
                {pilarEkonomiData.items[2].title}
              </h3>
              <p className="font-inter-400 text-sm text-[#A3C7B3]">
                {pilarEkonomiData.items[2].description}
              </p>
            </div>
          </div>

          {/* Card 4 (Bottom right 2) */}
          <div className="group col-span-1 row-span-1 flex flex-col justify-between rounded-3xl bg-[#EBE9DE] p-8 md:col-span-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCD8C5]">
              <div
                className="h-6 w-6 bg-[#2F2C1A]"
                style={{
                  WebkitMaskImage: `url(${pilarEkonomiData.items[3].icon})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url(${pilarEkonomiData.items[3].icon})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />
            </div>
            <div>
              <h3 className="font-montserrat-700 mb-2 text-xl text-[#2F2C1A]">
                {pilarEkonomiData.items[3].title}
              </h3>
              <p className="font-inter-400 text-sm text-[#66604D]">
                {pilarEkonomiData.items[3].description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PilarEkonomi;
