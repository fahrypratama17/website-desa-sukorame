"use client";

import { useState, useRef, useEffect } from "react";
import { Perangkat } from "@prisma/client";
import Image from "next/image";
import { FiMail, FiSearch } from "react-icons/fi";
import ScrollReveal from "@/shared/components/ScrollReveal";

const MemberPhoto = ({
  src,
  name,
  initials,
  avatarColor,
  className = "",
  priority = false,
}: {
  src: string;
  name: string;
  initials: string;
  avatarColor: string;
  className?: string;
  priority?: boolean;
}) => {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError || src === "") {
    return (
      <div
        className={`flex items-center justify-center w-full h-full ${className}`}
        style={{ backgroundColor: avatarColor }}
      >
        <span
          className="font-montserrat-700 text-white select-none"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "0.05em" }}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={400}
      height={400}
      className={`w-full h-80 md:h-60 object-cover object-[50%_20%] transition-transform duration-500 ${className}`}
      unoptimized
      priority={priority}
      onError={() => setImgError(true)}
    />
  );
};

const getInitials = (name: string) => {
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const colors = ["#2B694D", "#1A452F", "#3B8C66", "#4A9E7A", "#1C3F2D"];
const getColor = (id: number) => colors[id % colors.length];

interface PerangkatPageProps {
  perangkatData: Perangkat[];
}

const PerangkatPage = ({ perangkatData }: PerangkatPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Auto-center the scroll view on mount
      const centerScroll = (container.scrollWidth - container.clientWidth) / 2;
      container.scrollLeft = centerScroll;
    }
  }, []);

  const formattedData = perangkatData.map((p) => ({
    ...p,
    initials: getInitials(p.name),
    avatarColor: getColor(p.id),
  }));

  const kepalaDesa = formattedData.find(p => p.role.toLowerCase().includes('kepala desa')) || formattedData[0];
  const perangkatList = formattedData.filter(p => p.id !== kepalaDesa?.id);

  const filteredList = perangkatList.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white-250 py-10 md:py-16">
      <div className="mx-auto w-[92%] sm:w-[90%] flex flex-col gap-10 md:gap-16">

        {/* Header Section — lebar sama dengan jajaran perangkat (w-full di dalam 90%) */}
        <ScrollReveal direction="none">
          <section className="text-center w-full flex flex-col gap-4">
            <h1 className="font-montserrat-700 text-green-50 text-3xl md:text-[40px] leading-tight">
              Perangkat Desa Sukorame
            </h1>
            <p className="font-inter-400 text-green-350 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Mengenal lebih dekat struktur organisasi dan individu yang mengabdi untuk kemajuan dan
              kesejahteraan masyarakat Desa Sukorame.
            </p>
          </section>
        </ScrollReveal>

        {/* Highlight Kepala Desa — lebar penuh (w-full) */}
        <ScrollReveal>
          <section className="w-full">
            <div className="bg-white rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-md border border-green-850/10">
              {/* Foto Kepala Desa */}
              <div className="w-full max-w-[45%] md:max-w-[18%] rounded-2xl overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                <MemberPhoto
                  src={kepalaDesa.image || ""}
                  name={kepalaDesa.name}
                  initials={kepalaDesa.initials}
                  avatarColor={kepalaDesa.avatarColor}
                  priority={true}
                />
              </div>

              {/* Info Kepala Desa */}
              <div className="flex flex-col flex-grow gap-4 text-center md:text-left items-center md:items-start w-full">
                <div>
                  <span className="inline-block bg-[#DCFCE7] text-[#166534] font-inter-600 text-xs px-3 py-1 rounded-full mb-2 md:mb-3 uppercase tracking-wide">
                    {kepalaDesa.role}
                  </span>
                  <h2 className="font-montserrat-700 text-green-50 text-2xl sm:text-3xl md:text-4xl">
                    {kepalaDesa.name}
                  </h2>
                </div>

                {/* Kutipan Komitmen */}
                <div className="border-l-4 border-green-350 pl-4 py-1 text-left w-full">
                  <p className="font-inter-400 text-green-350 text-sm sm:text-base leading-relaxed italic">
                    "{kepalaDesa.quote}"
                  </p>
                </div>

                {/* Kontak Email */}
                <div className="flex items-center gap-2 mt-2 justify-center md:justify-start w-full">
                  <FiMail className="h-4 w-4 text-green-350" />
                  <a
                    href={`mailto:${kepalaDesa.email}`}
                    className="font-inter-600 text-green-50 hover:text-green-350 text-sm transition-colors truncate"
                  >
                    {kepalaDesa.email}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Struktur Organisasi (Bagan Pohon) — lebar penuh (w-full) */}
        <ScrollReveal>
          <section className="w-full flex flex-col gap-6 md:gap-8">
            <h2 className="font-montserrat-700 text-green-50 text-2xl md:text-3xl text-center">
              Struktur Organisasi
            </h2>

          <div className="w-full">
            {/* Hint Geser untuk Layar Kecil */}
            <div className="flex lg:hidden items-center justify-center gap-1.5 text-[11px] text-green-350 animate-pulse mb-3 bg-white/40 py-1.5 rounded-full border border-green-850/5">
              <span>&larr; Geser horizontal untuk melihat bagan &rarr;</span>
            </div>

            <div 
              ref={scrollContainerRef}
              className="bg-white/60 backdrop-blur-sm p-4 sm:p-8 md:p-12 rounded-3xl border border-green-850/10 shadow-sm flex flex-col overflow-x-auto"
            >
              <div className="min-w-[1000px] h-[520px] relative font-inter text-[11px] mx-auto w-full max-w-[1100px] mt-4">
                
                {/* --- LINES --- */}
                {/* Main Vertical Stem */}
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '50%', top: '40px', bottom: '60px' }}></div>
                
                {/* Kades to Sekdes Horizontal */}
                <div className="absolute bg-green-850/40 h-[2px] z-0" style={{ left: '50%', top: '60px', width: '24.5%' }}></div>
                {/* Sekdes Vertical Stem */}
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '74.5%', top: '60px', height: '100px' }}></div>
                
                {/* Kasi Horizontal Line */}
                <div className="absolute bg-green-850/40 h-[2px] z-0" style={{ left: '10%', top: '160px', width: '40%' }}></div>
                {/* Kasi Vertical Drops */}
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '10%', top: '160px', height: '20px' }}></div>
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '25.5%', top: '160px', height: '20px' }}></div>
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '41%', top: '160px', height: '20px' }}></div>
                
                {/* Kaur Horizontal Line */}
                <div className="absolute bg-green-850/40 h-[2px] z-0" style={{ left: '59%', top: '160px', width: '31%' }}></div>
                {/* Kaur Vertical Drops */}
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '59%', top: '160px', height: '20px' }}></div>
                {/* Sekdes vertical stem already covers 74.5% */}
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '74.5%', top: '160px', height: '20px' }}></div>
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '90%', top: '160px', height: '20px' }}></div>

                {/* Kasun Horizontal Line */}
                <div className="absolute bg-green-850/40 h-[2px] z-0" style={{ left: '25.5%', top: '320px', width: '49%' }}></div>
                {/* Kasun Vertical Drops */}
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '25.5%', top: '320px', height: '20px' }}></div>
                <div className="absolute bg-green-850/40 w-[2px] z-0" style={{ left: '74.5%', top: '320px', height: '20px' }}></div>

                {/* --- NODES --- */}
                {/* Kades */}
                <div className="absolute -translate-x-1/2 w-44 bg-[#0A2615] border border-white/20 text-white shadow-lg flex items-center justify-center text-center rounded-lg py-3 px-3 font-inter-700 text-xs z-10 hover:scale-105 transition-transform" style={{ left: '50%', top: '0' }}>
                  KEPALA DESA
                </div>

                {/* Sekdes */}
                <div className="absolute -translate-x-1/2 w-40 bg-[#1A452F] border border-white/20 text-white shadow-md flex items-center justify-center text-center rounded-lg py-2.5 px-3 font-inter-600 text-[10px] z-10 hover:scale-105 transition-transform" style={{ left: '74.5%', top: '90px' }}>
                  SEKRETARIS DESA
                </div>

                {/* Kasi Group */}
                <div className="absolute -translate-x-1/2 w-36 bg-[#2B694D] border border-white/20 text-white shadow-sm flex flex-col items-center justify-center text-center rounded-lg py-2 px-2 font-inter-600 text-[9px] uppercase leading-tight h-[42px] z-10 hover:bg-[#1A452F] hover:scale-105 transition-all" style={{ left: '10%', top: '180px' }}>
                  Kepala Seksi Pemerintahan
                </div>
                <div className="absolute -translate-x-1/2 w-36 bg-[#2B694D] border border-white/20 text-white shadow-sm flex flex-col items-center justify-center text-center rounded-lg py-2 px-2 font-inter-600 text-[9px] uppercase leading-tight h-[42px] z-10 hover:bg-[#1A452F] hover:scale-105 transition-all" style={{ left: '25.5%', top: '180px' }}>
                  Kepala Seksi Kesejahteraan Masyarakat
                </div>
                <div className="absolute -translate-x-1/2 w-36 bg-[#2B694D] border border-white/20 text-white shadow-sm flex flex-col items-center justify-center text-center rounded-lg py-2 px-2 font-inter-600 text-[9px] uppercase leading-tight h-[42px] z-10 hover:bg-[#1A452F] hover:scale-105 transition-all" style={{ left: '41%', top: '180px' }}>
                  Kepala Seksi Pelayanan
                </div>

                {/* Kaur Group */}
                <div className="absolute -translate-x-1/2 w-36 bg-[#2B694D] border border-white/20 text-white shadow-sm flex flex-col items-center justify-center text-center rounded-lg py-2 px-2 font-inter-600 text-[9px] uppercase leading-tight h-[42px] z-10 hover:bg-[#1A452F] hover:scale-105 transition-all" style={{ left: '59%', top: '180px' }}>
                  Kepala Urusan Perencanaan
                </div>
                <div className="absolute -translate-x-1/2 w-36 bg-[#2B694D] border border-white/20 text-white shadow-sm flex flex-col items-center justify-center text-center rounded-lg py-2 px-2 font-inter-600 text-[9px] uppercase leading-tight h-[42px] z-10 hover:bg-[#1A452F] hover:scale-105 transition-all" style={{ left: '74.5%', top: '180px' }}>
                  Kepala Urusan Umum & TU
                </div>
                <div className="absolute -translate-x-1/2 w-36 bg-[#2B694D] border border-white/20 text-white shadow-sm flex flex-col items-center justify-center text-center rounded-lg py-2 px-2 font-inter-600 text-[9px] uppercase leading-tight h-[42px] z-10 hover:bg-[#1A452F] hover:scale-105 transition-all" style={{ left: '90%', top: '180px' }}>
                  Kepala Urusan Keuangan
                </div>

                {/* Kasun Group */}
                <div className="absolute -translate-x-1/2 w-40 bg-[#2B694D] border border-white/20 text-white shadow-sm flex flex-col items-center justify-center text-center rounded-lg py-2 px-2 font-inter-600 text-[10px] uppercase h-[42px] z-10 hover:bg-[#1A452F] hover:scale-105 transition-all" style={{ left: '25.5%', top: '340px' }}>
                  Kepala Dusun Sukomulyo
                </div>
                <div className="absolute -translate-x-1/2 w-40 bg-[#2B694D] border border-white/20 text-white shadow-sm flex flex-col items-center justify-center text-center rounded-lg py-2 px-2 font-inter-600 text-[10px] uppercase h-[42px] z-10 hover:bg-[#1A452F] hover:scale-105 transition-all" style={{ left: '74.5%', top: '340px' }}>
                  Kepala Dusun Sukodadi
                </div>

                {/* Staf Group */}
                <div className="absolute -translate-x-1/2 w-44 bg-[#2B694D] border border-white/20 text-white shadow-sm flex flex-col items-center justify-center text-center rounded-lg py-2 px-2 font-inter-600 text-[10px] uppercase h-[42px] z-10 hover:bg-[#1A452F] hover:scale-105 transition-all" style={{ left: '50%', bottom: '0' }}>
                  Staf Desa
                </div>

              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

        {/* Jajaran Perangkat Desa & Pencarian */}
        <ScrollReveal>
          <section className="w-full flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-green-850/10 pb-4">
              <h2 className="font-montserrat-700 text-green-50 text-2xl md:text-3xl">
                Jajaran Perangkat Desa
              </h2>

              {/* Input Pencarian */}
              <div className="relative w-full sm:w-80">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch className="w-4 h-4 text-green-350" aria-hidden="true" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama atau jabatan..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-green-850/20 rounded-full text-sm text-green-50 placeholder-green-350 focus:outline-none focus:border-green-250 focus:ring-1 focus:ring-green-250 transition-colors"
                />
              </div>
            </div>

            {/* Grid Kartu Perangkat */}
            {filteredList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {filteredList.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden border border-green-850/15 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
                  >
                    {/* Foto Perangkat */}
                    <div className="relative overflow-hidden flex-shrink-0">
                      <MemberPhoto
                        src={member.image || ""}
                        name={member.name}
                        initials={member.initials}
                        avatarColor={member.avatarColor}
                        className="object-cover"
                      />
                    </div>

                    {/* Keterangan */}
                    <div className="p-4 flex flex-col flex-grow gap-2">
                      <span className="inline-block bg-white-150 text-green-350 text-[10px] font-inter-600 px-2.5 py-1 rounded-full uppercase tracking-wider w-fit">
                        {member.role}
                      </span>
                      <h3 className="font-inter-700 text-green-50 text-sm leading-snug">
                        {member.name}
                      </h3>

                      {/* Email */}
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-1.5 text-[11px] text-green-350 hover:text-green-250 transition-colors mt-auto pt-2 border-t border-green-850/10 min-w-0"
                      >
                        <FiMail className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-inter-500 text-green-350 text-base">
                  Tidak ditemukan perangkat desa dengan nama atau jabatan "{searchQuery}".
                </p>
              </div>
            )}
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default PerangkatPage;