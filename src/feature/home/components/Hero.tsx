import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  settings: Record<string, string>;
}

const Hero = ({ settings }: HeroProps) => {
  return (
    <section className="relative">
      <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[600px] lg:min-h-[80vh] overflow-hidden">
        <Image
          src={settings.hero_banner_image || "/assets/images/hero-placeholder.png"}
          alt="Banner Desa"
          fill
          priority
          unoptimized
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col gap-6 w-[90%] md:w-full py-16">
          <h1 className="font-montserrat-700 mx-auto w-full md:w-[80%] lg:w-[70%] text-center text-3xl md:text-4xl lg:text-5xl leading-snug text-white">
            {settings.hero_title || "Selamat Datang di Desa Sukorame"}
          </h1>
          <p className="font-inter-400 mx-auto w-full md:w-[80%] lg:w-[70%] text-center text-sm md:text-base lg:text-[18px] leading-snug text-white">
            {settings.hero_subtitle || "Mewujudkan masyarakat yang mandiri, sejahtera, dan berbudaya melalui pengelolaan potensi lokal yang berkelanjutan."}
          </p>
          <div className="mx-auto flex flex-col md:flex-row w-full md:w-[50%] lg:w-[40%] items-center justify-center gap-4">
            <Link href="/potensi" className="font-inter-500 flex w-full justify-center items-center cursor-pointer rounded-lg bg-green-50 py-3 text-[14px] text-white transition-colors hover:bg-green-600">
              Jelajahi Potensi
            </Link>
            <Link href="/perangkat" className="font-inter-500 flex w-full justify-center items-center cursor-pointer rounded-lg bg-white py-3 text-[14px] text-green-50 transition-colors hover:bg-gray-100">
              Struktur Organisasi
            </Link>
          </div>
        </div>
      </div>
      <div className="relative md:absolute mt-8 md:mt-0 md:-bottom-25 left-1/2 grid grid-cols-2 gap-4 md:flex md:gap-0 w-[90%] md:w-[80%] -translate-x-1/2 items-center justify-around rounded-xl bg-white p-4 md:p-8 shadow-2xl">
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <div className="bg-mint-850 flex size-10 md:size-16 items-center justify-center rounded-full">
            <Image
              src="/assets/icons/person.svg"
              alt="penduduk"
              width={32}
              height={32}
              className="size-5 md:size-8"
            />
          </div>
          <p className="font-montserrat-600 text-center text-lg md:text-[32px]">{settings.statistik_penduduk || "3.245"}</p>
          <p className="font-inter-400 text-center text-[10px] md:text-[14px]">Penduduk</p>
        </div>
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <div className="bg-mint-850 flex size-10 md:size-16 items-center justify-center rounded-full">
            <Image
              src="/assets/icons/home.svg"
              alt="dusun"
              width={32}
              height={32}
              className="size-5 md:size-8"
            />
          </div>
          <p className="font-montserrat-600 text-center text-lg md:text-[32px]">{settings.statistik_dusun || "2"}</p>
          <p className="font-inter-400 text-center text-[10px] md:text-[14px]">Dusun</p>
        </div>
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <div className="bg-mint-850 flex size-10 md:size-16 items-center justify-center rounded-full">
            <Image
              src="/assets/icons/map.svg"
              alt="rtrw"
              width={32}
              height={32}
              className="size-5 md:size-8"
            />
          </div>
          <p className="font-montserrat-600 text-center text-lg md:text-[32px]">{settings.statistik_rtrw || "24/6"}</p>
          <p className="font-inter-400 text-center text-[10px] md:text-[14px]">RT/RW</p>
        </div>
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <div className="bg-mint-850 flex size-10 md:size-16 items-center justify-center rounded-full">
            <Image
              src="/assets/icons/star.svg"
              alt="potensi"
              width={32}
              height={32}
              className="size-5 md:size-8"
            />
          </div>
          <p className="font-montserrat-600 text-center text-lg md:text-[32px]">{settings.statistik_potensi || "12"}</p>
          <p className="font-inter-400 text-center text-[10px] md:text-[14px]">
            Potensi Unggulan
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
