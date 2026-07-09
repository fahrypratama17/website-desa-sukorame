"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  settings?: Record<string, string>;
}

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
    name: "Publikasi",
    children: [
      {
        name: "Program Desa",
        link: "/program",
      },
      {
        name: "Berita & Artikel",
        link: "/berita",
      },
    ],
  },
  {
    name: "Kontak",
    link: "/kontak",
  },
];

const Navbar = ({ settings }: NavbarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
    <nav className="relative z-[100] py-4 lg:py-8 bg-white shadow-sm">
      <div className="mx-auto flex w-[90%] items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-green-50" onClick={() => setIsOpen(false)}>
          <img
            src="/assets/icons/desa.svg"
            alt="desa"
            className="h-6 w-6"
          />
          <h3 className="font-montserrat-700 text-lg xl:text-xl whitespace-nowrap">Desa Sukorame</h3>
        </Link>
        
        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden p-2 text-green-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between gap-4 xl:gap-8">
          {navLink.map((item) =>
            item.children ? (
              <div key={item.name} className="group relative">
                <button
                  className={`flex cursor-pointer items-center gap-1 text-sm xl:text-base whitespace-nowrap transition-all duration-200 hover:scale-105 ${
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
                className={`text-sm xl:text-base whitespace-nowrap transition-all duration-200 hover:scale-105 ${
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
        
        {/* Desktop Location Button */}
        <button className="hidden lg:flex font-inter-500 bg-mint-850 cursor-pointer items-center gap-2 rounded-full px-3 py-2 xl:px-4 text-sm xl:text-base whitespace-nowrap transition-transform duration-300 hover:scale-105 text-green-50">
          <img src="/assets/icons/loc.svg" alt="desa" className="h-5 w-5 xl:h-6 xl:w-6" />
          <p>{settings?.kontak_lokasi || "Kec. Binangun, Blitar"}</p>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 max-h-[80vh] overflow-y-auto">
          <div className="w-[90%] mx-auto flex flex-col gap-4">
            {navLink.map((item) => (
              <div key={item.name} className="flex flex-col border-b border-gray-50 pb-2">
                {item.children ? (
                  <>
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="flex items-center justify-between font-inter-600 text-green-50 py-2"
                    >
                      {item.name}
                      <svg className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="flex flex-col gap-2 pl-4 pt-2 border-l-2 border-gray-100 ml-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.link}
                            onClick={() => setIsOpen(false)}
                            className={`py-2 ${pathname === child.link ? 'text-green-700 font-inter-700' : 'text-gray-500 font-inter-500'}`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className={`py-2 ${isLinkActive(item.link) ? 'font-inter-700 text-green-700' : 'font-inter-600 text-green-50'}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 font-inter-500 bg-mint-850 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-base text-green-50">
              <img src="/assets/icons/loc.svg" alt="desa" className="h-6 w-6" />
              <p>Kec. Binangun, Blitar</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
