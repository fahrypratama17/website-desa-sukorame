const Hero = () => {
  return (
    <section className="relative">
      <div className="relative flex items-center justify-center">
        <img
          src="/src/assets/images/hero-placeholder.png"
          alt="image"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute flex flex-col gap-6">
          <h1 className="font-montserrat-700 mx-auto w-[50%] text-center text-5xl leading-snug text-white">
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
    </section>
  );
};

export default Hero;
