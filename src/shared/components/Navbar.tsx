"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLink = [
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
    children: [
      {
        name: "Perangkat Desa",
        link: "/perangkat",
      },
      {
        name: "Lembaga Desa",
        link: "/lembaga",
      },
    ],
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
  const pathname = usePathname();

  const isLinkActive = (link: string) => {
    if (link === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(link);
  };

  const isDropdownActive = (children: { link: string }[]) => {
    return children.some((child) => pathname === child.link);
  };

  return (
    <nav className="z-100 py-8 bg-white shadow-sm">
      <div className="mx-auto flex w-[90%] items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-green-50">
          <img
            src="/assets/icons/desa.svg"
            alt="desa"
            className="h-6 w-6"
          />
          <h3 className="font-montserrat-700 text-xl">Desa Sukorame</h3>
        </Link>
        <div className="flex items-center justify-between gap-8">
          {navLink.map((item) =>
            item.children ? (
              <div key={item.name} className="group relative">
                <button
                  className={`flex cursor-pointer items-center gap-1 text-base transition-all duration-200 hover:scale-105 ${
                    isDropdownActive(item.children)
                      ? "font-inter-700 text-green-50 border-b-2 border-green-50 pb-1"
                      : "font-inter-500 text-green-50/70 hover:text-green-50"
                  }`}
                >
                  {item.name}
                  <img
                    src="/assets/icons/chevron-down.svg"
                    alt="down"
                    className="size-2"
                  />
                </button>

                <div className="invisible absolute top-full left-0 z-50 mt-2 min-w-45 origin-top scale-95 rounded-lg bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.link}
                      className={`font-inter-500 block px-4 py-2 transition-colors hover:bg-green-100 hover:text-green-700 ${
                        pathname === child.link
                          ? "text-green-700 font-inter-700 bg-green-50/5"
                          : "text-green-50"
                      }`}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.link}
                className={`text-base transition-all duration-200 hover:scale-105 ${
                  isLinkActive(item.link)
                    ? "font-inter-700 text-green-50 border-b-2 border-green-50 pb-1"
                    : "font-inter-500 text-green-50/70 hover:text-green-50"
                }`}
              >
                {item.name}
              </Link>
            ),
          )}
        </div>
        <button className="font-inter-500 bg-mint-850 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-base transition-transform duration-300 hover:scale-105 text-green-50">
          <img src="/assets/icons/loc.svg" alt="desa" className="h-6 w-6" />
          <p>Kec. Binangun, Blitar</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
