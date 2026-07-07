const Tentang = () => {
  return (
    <section className="bg-white-250 flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-[90%] items-center justify-center gap-12">
        <div className="flex flex-col gap-8">
          <h1 className="font-montserrat-700 text-[32px] text-green-50">
            Tentang Desa Sukorame
          </h1>
          <p className="font-inter-400 text-[16px] text-[#414844]">
            Desa Sukorame adalah sebuah desa agraris yang terletak di jantung
            kabupaten. Dengan luas wilayah yang didominasi oleh lahan pertanian
            produktif, desa ini menjadi salah satu lumbung pangan daerah. Kami
            berkomitmen untuk memadukan kearifan lokal dengan inovasi modern
            dalam pelayanan publik dan pengembangan ekonomi kerakyatan.
          </p>
          <div className="text-mint-350 font-inter-500 flex items-center gap-2 text-[14px]">
            <a href="/">Baca Profil Desa</a>
            <img
              src="/assets/icons/arrow.svg"
              alt="arrow"
              className="size-3"
            />
          </div>
        </div>
        <img
          src="/assets/images/tentang-placeholder.png"
          alt="desa"
          className="rounded-2xl duration-200 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Tentang;
