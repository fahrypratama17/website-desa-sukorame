import Link from "next/link";
import Image from "next/image";
import DynamicIcon from "./DynamicIcon";

export const shortcutData = [
  {
    name: "Beranda",
    link: "/",
  },
  {
    name: "Profil Desa",
    link: "/profil/profil-desa",
  },
  {
    name: "Potensi Desa",
    link: "/potensi",
  },
  {
    name: "Perangkat Desa",
    link: "/perangkat",
  },
  {
    name: "Lembaga Desa",
    link: "/lembaga",
  },
  {
    name: "Program Desa",
    link: "/program",
  },
  {
    name: "Berita & Artikel",
    link: "/berita",
  },
  {
    name: "Kontak Kami",
    link: "/kontak",
  },
];

interface FooterProps {
  settings?: Record<string, string>;
}

const Footer = ({ settings }: FooterProps) => {
  // Use fallback if settings are undefined (e.g. initial render)
  const safeSettings = settings || {};
  
  const dynamicContactData = [
    {
      icon: "FiMapPin",
      name: safeSettings.kontak_alamat || "Jl. Raya Sukorame No. 1",
    },
    {
      icon: "FiMail",
      name: safeSettings.kontak_email || "info@sukorame.desa.id",
    },
    {
      icon: "FiPhone",
      name: safeSettings.kontak_telepon || "(0355) 123456",
    },
  ];

  return (
    <footer className="bg-white-250">
      <div className="mx-auto grid w-[90%] grid-cols-1 lg:grid-cols-2 items-center justify-between gap-12 lg:gap-0 rounded-tl-xl rounded-tr-xl bg-green-50 px-8 py-12 lg:px-16 lg:py-20">
        <div className="flex h-full flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h3 className="font-montserrat-700 text-2xl md:text-3xl lg:text-[32px] text-white">
              {safeSettings.desa_nama || "Desa Sukorame"}
            </h3>
            <p className="font-inter-400 w-full lg:w-[60%] text-sm md:text-base text-[#FCF9F2CC]">
              {safeSettings.footer_deskripsi || "Pusat informasi dan pelayanan publik Pemerintah Desa Sukorame untuk mewujudkan desa yang mandiri dan inovatif."}
            </p>
          </div>
          <div className="mt-auto">
            <p className="font-inter-600 text-[12px] text-white/80">
              &copy; {new Date().getFullYear()} Pemerintah {safeSettings.desa_nama || "Desa Sukorame"}. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start justify-between lg:justify-around gap-12 sm:gap-0 w-full lg:w-auto">
          <div className="flex flex-col gap-8 w-full sm:w-auto">
            <h3 className="font-inter-700 text-white">Tautan Cepat</h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-col w-full">
              {shortcutData.map(({ name, link }) => (
                <Link
                  className="font-inter-600 w-fit text-sm md:text-base text-[#FCF9F2CC] transition-transform duration-200 hover:scale-105"
                  href={link}
                  key={name}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full sm:w-auto">
            <h3 className="font-inter-700 text-white">Kontak Kami</h3>

            <div className="flex flex-col gap-4">
              {dynamicContactData.map(({ icon, name }) => (
                <div key={name} className="font-inter-600 flex w-fit cursor-pointer items-center gap-4 text-base text-[#FCF9F2CC] transition-transform duration-200 hover:scale-105">
                  <DynamicIcon name={icon} className="h-4 w-4" />
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
