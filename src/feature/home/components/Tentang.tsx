import { FiArrowRight } from "react-icons/fi";

interface TentangProps {
  settings: Record<string, string>;
}

const Tentang = ({ settings }: TentangProps) => {
  return (
    <section className="bg-white-250 flex items-center justify-center py-16 md:pt-48 md:pb-28">
      <div className="mx-auto flex flex-col-reverse lg:flex-row w-[90%] items-center justify-center gap-8 lg:gap-12">
        <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2">
          <h1 className="font-montserrat-700 text-2xl md:text-3xl lg:text-[32px] text-green-50">
            Tentang {settings.desa_nama || "Desa Sukorame"}
          </h1>
          <p className="font-inter-400 text-sm md:text-base lg:text-[16px] text-[#414844]">
            {settings.tentang_desa_deskripsi || 
              "Desa Sukorame adalah sebuah desa agraris yang terletak di jantung kabupaten. Dengan luas wilayah yang didominasi oleh lahan pertanian produktif, desa ini menjadi salah satu lumbung pangan daerah. Kami berkomitmen untuk memadukan kearifan lokal dengan inovasi modern dalam pelayanan publik dan pengembangan ekonomi kerakyatan."}
          </p>
          <div className="text-mint-350 font-inter-500 flex items-center gap-2 text-[14px]">
            <a href="/profil/profil-desa">Baca Profil Desa</a>
            <FiArrowRight className="size-3" />
          </div>
        </div>
        <img
          src="/assets/images/tentang-placeholder.png"
          alt="desa"
          className="rounded-2xl w-full lg:w-1/2 object-cover duration-200 hover:scale-105 shadow-lg"
        />
      </div>
    </section>
  );
};

export default Tentang;
