export const shortcutData = [
  {
    name: "Beranda",
    link: "/",
  },
  {
    name: "Profil",
    link: "/profil",
  },
  {
    name: "Potensi",
    link: "/potensi",
  },
  {
    name: "Layanan",
    link: "/Perangkat",
  },
  {
    name: "Struktur Organisasi",
    link: "/perangkat",
  },
  {
    name: "Program",
    link: "/program",
  },
  {
    name: "Kontak",
    link: "/kontak",
  },
];

export const contactData = [
  {
    icon: "/src/assets/icons/loc-white.svg",
    name: "Jl. Raya Sukorame No. 1",
  },
  {
    icon: "/src/assets/icons/mail.svg",
    name: "info@sukorame.desa.id",
  },
  {
    icon: "/src/assets/icons/phone.svg",
    name: "(0355) 123456",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white-250">
      <div className="mx-auto grid w-[90%] grid-cols-2 items-center justify-between rounded-tl-xl rounded-tr-xl bg-green-50 px-16 py-20">
        <div className="flex h-full flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h3 className="font-montserrat-700 text-[32px] text-white">
              Desa Sukorame
            </h3>
            <p className="font-inter-400 w-[60%] text-base text-[#FCF9F2CC]">
              Pusat informasi dan pelayanan publik Pemerintah Desa Sukorame
              untuk mewujudkan desa yang mandiri dan inovatif.
            </p>
          </div>
          <div className="mt-auto">
            <p className="font-inter-600 text-[12px] text-white/80">
              &copy; 2024 Pemerintah Desa Sukorame. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="flex items-start justify-around">
          <div className="flex flex-col gap-8">
            <h3 className="font-inter-700 text-white">Tautan Cepat</h3>

            <div className="flex flex-col gap-4">
              {shortcutData.map(({ name, link }) => (
                <a
                  className="font-inter-600 w-fit text-base text-[#FCF9F2CC] transition-transform duration-200 hover:scale-105"
                  href={link}
                  key={name}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="font-inter-700 text-white">Kontak Kami</h3>

            <div className="flex flex-col gap-4">
              {contactData.map(({ icon, name }) => (
                <div className="font-inter-600 flex w-fit cursor-pointer items-center gap-4 text-base text-[#FCF9F2CC] transition-transform duration-200 hover:scale-105">
                  <img src={icon} alt="desa" className="h-4 w-4" />
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
