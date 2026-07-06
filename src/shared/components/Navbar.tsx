export const navLink = [
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
    link: "/perangkat",
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

const Navbar = () => {
  return (
    <nav className="py-8 shadow-2xl">
      <div className="mx-auto flex w-[90%] items-center justify-between">
        <div className="flex items-center gap-2 text-green-50">
          <img
            src="/src/assets/icons/desa.svg"
            alt="desa"
            className="h-6 w-6"
          />
          <h3 className="font-montserrat-700 text-xl">Desa Sukorame</h3>
        </div>
        <div className="flex items-center justify-between gap-8">
          {navLink.map(({ name, link }) => (
            <a
              className="font-inter-500 text-base transition-transform duration-200 hover:scale-105"
              href={link}
              key={name}
            >
              {name}
            </a>
          ))}
        </div>
        <button className="font-inter-500 bg-mint-850 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-base transition-transform duration-300 hover:scale-105">
          <img src="/src/assets/icons/loc.svg" alt="desa" className="h-6 w-6" />
          <p>Kec. Binangung, Blitar</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
