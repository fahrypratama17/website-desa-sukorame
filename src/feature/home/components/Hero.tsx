const Hero = () => {
  return (
    <section className="relative">
      <div className="relative flex items-center justify-center">
        <img
          src="/src/assets/images/hero-placeholder.png"
          alt="image"
          className="h-[80%] w-[120%]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute flex flex-col gap-6">
          <h1 className="font-montserrat-700 mx-auto w-[70%] text-center text-5xl leading-snug text-white">
            Selamat Datang di Desa Sukorame
          </h1>
          <p className="font-inter-400 mx-auto w-[70%] text-center text-[18px] leading-snug text-white">
            Mewujudkan masyarakat yang mandiri, sejahtera, dan berbudaya melalui
            pengelolaan potensi lokal yang berkelanjutan.
          </p>
          <div className="mx-auto flex w-[50%] items-center justify-center gap-4">
            <button className="font-inter-500 w-full cursor-pointer rounded-lg bg-green-50 py-3 text-[14px] text-white">
              Jelajahi Potensi
            </button>
            <button className="font-inter-500 w-full cursor-pointer rounded-lg bg-white py-3 text-[14px] text-green-50">
              Struktur Organisasi
            </button>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-25 left-1/2 flex w-[80%] -translate-x-1/2 items-center justify-around rounded-xl bg-white p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-mint-850 flex size-16 items-center justify-center rounded-full">
            <img
              src="/src/assets/icons/person.svg"
              alt="penduduk"
              className="size-8"
            />
          </div>
          <p className="font-montserrat-600 text-center text-[32px]">3.245</p>
          <p className="font-inter-400 text-center text-[14px]">Penduduk</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-mint-850 flex size-16 items-center justify-center rounded-full">
            <img
              src="/src/assets/icons/home.svg"
              alt="penduduk"
              className="size-8"
            />
          </div>
          <p className="font-montserrat-600 text-center text-[32px]">2</p>
          <p className="font-inter-400 text-center text-[14px]">Dusun</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-mint-850 flex size-16 items-center justify-center rounded-full">
            <img
              src="/src/assets/icons/map.svg"
              alt="penduduk"
              className="size-8"
            />
          </div>
          <p className="font-montserrat-600 text-center text-[32px]">24/6</p>
          <p className="font-inter-400 text-center text-[14px]">RT/RW</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-mint-850 flex size-16 items-center justify-center rounded-full">
            <img
              src="/src/assets/icons/star.svg"
              alt="penduduk"
              className="size-8"
            />
          </div>
          <p className="font-montserrat-600 text-center text-[32px]">12</p>
          <p className="font-inter-400 text-center text-[14px]">
            Potensi Unggulan
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
