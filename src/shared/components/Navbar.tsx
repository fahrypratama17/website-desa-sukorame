export const navLink = [
  {
    name: "Beranda",
    link: "/",
  },
  {
    name: "Profil",
    children: [
      {
        name: "Profil Desa",
        link: "/profil/profil-desa",
      },
      {
        name: "Visi & Misi",
        link: "/profil/visi-misi",
      },
    ],
  },
  {
    name: "Potensi",
    link: "/potensi",
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
          {navLink.map((item) =>
            item.children ? (
              <div key={item.name} className="group relative">
                <button className="font-inter-500 flex cursor-pointer items-center gap-1 text-base transition-transform duration-200 hover:scale-105">
                  {item.name}
                  <img
                    src="/src/assets/icons/chevron-down.svg"
                    alt="down"
                    className="size-2"
                  />
                </button>

                <div className="invisible absolute top-full left-0 z-50 mt-2 min-w-45 origin-top scale-95 rounded-lg bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <a
                      key={child.name}
                      href={child.link}
                      className="font-inter-500 block px-4 py-2 text-green-50 transition-colors hover:bg-green-100 hover:text-green-700"
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.name}
                href={item.link}
                className="font-inter-500 text-base transition-transform duration-200 hover:scale-105"
              >
                {item.name}
              </a>
            ),
          )}
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
