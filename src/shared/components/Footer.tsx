import Link from "next/link";
import Image from "next/image";
import DynamicIcon from "./DynamicIcon";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";

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
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(safeSettings.kontak_alamat || "Desa Sukorame")}`,
    },
    {
      icon: "FiMail",
      name: safeSettings.kontak_email || "info@sukorame.desa.id",
      href: `mailto:${safeSettings.kontak_email || "info@sukorame.desa.id"}`,
    },
    {
      icon: "FiPhone",
      name: safeSettings.kontak_telepon || "(0355) 123456",
      href: `https://wa.me/${(safeSettings.kontak_telepon || "(0355) 123456").replace(/\D/g, '').replace(/^0/, '62')}`,
    },
  ];

  return (
    <footer className="bg-white-250 relative z-50">
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
          <div className="mt-auto flex flex-col gap-6">
            {/* Social Media */}
            {(safeSettings.sosmed_facebook || safeSettings.sosmed_instagram || safeSettings.sosmed_youtube) && (
              <div className="flex items-center gap-4">
                {safeSettings.sosmed_facebook && (
                  <a href={safeSettings.sosmed_facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white transition-colors">
                    <FiFacebook className="w-5 h-5" />
                  </a>
                )}
                {safeSettings.sosmed_instagram && (
                  <a href={safeSettings.sosmed_instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white transition-colors">
                    <FiInstagram className="w-5 h-5" />
                  </a>
                )}
                {safeSettings.sosmed_youtube && (
                  <a href={safeSettings.sosmed_youtube} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white transition-colors">
                    <FiYoutube className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
            
            <p className="font-inter-600 text-[12px] text-white/80 hidden lg:block">
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
              {dynamicContactData.map(({ icon, name, href }) => (
                <a 
                  key={name} 
                  href={href}
                  target={icon === "FiMapPin" || icon === "FiPhone" ? "_blank" : undefined}
                  rel={icon === "FiMapPin" || icon === "FiPhone" ? "noopener noreferrer" : undefined}
                  className="font-inter-600 flex w-fit items-center gap-4 text-base text-[#FCF9F2CC] transition-transform duration-200 hover:scale-105"
                >
                  <DynamicIcon name={icon} className="h-4 w-4 flex-shrink-0" />
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Copyright (di paling bawah) */}
        <div className="col-span-1 lg:hidden mt-4 pt-8 border-t border-white/10 w-full flex justify-center">
          <p className="font-inter-600 text-[12px] text-white/80 text-center">
            &copy; {new Date().getFullYear()} Pemerintah {safeSettings.desa_nama || "Desa Sukorame"}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
