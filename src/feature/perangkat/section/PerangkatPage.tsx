"use client";

import { useState } from "react";
import { Perangkat } from "@prisma/client";

const MemberPhoto = ({
  src,
  name,
  initials,
  avatarColor,
  className = "",
}: {
  src: string;
  name: string;
  initials: string;
  avatarColor: string;
  className?: string;
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
    <img
      src={src}
      alt={name}
      className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${className}`}
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
    <div className="min-h-screen bg-white-250 py-16">
      <div className="mx-auto w-[90%] flex flex-col gap-16">

        {/* Header Section Ã¢â‚¬” lebar sama dengan jajaran perangkat (w-full di dalam 90%) */}
        <section className="text-center w-full flex flex-col gap-4">
          <h1 className="font-montserrat-700 text-green-50 text-[40px] leading-tight">
            Perangkat Desa Sukorame
          </h1>
          <p className="font-inter-400 text-green-350 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Mengenal lebih dekat struktur organisasi dan individu yang mengabdi untuk kemajuan dan
            kesejahteraan masyarakat Desa Sukorame.
          </p>
        </section>

        {/* Highlight Kepala Desa Ã¢â‚¬” lebar penuh (w-full) */}
        <section className="w-full">
          <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-md border border-green-850/10">
            {/* Foto Kepala Desa */}
            <div className="w-full md:w-[300px] h-[340px] rounded-2xl overflow-hidden flex-shrink-0">
              <MemberPhoto
                src={kepalaDesa.image || ""}
                name={kepalaDesa.name}
                initials={kepalaDesa.initials}
                avatarColor={kepalaDesa.avatarColor}
              />
            </div>

            {/* Info Kepala Desa */}
            <div className="flex flex-col flex-grow gap-4 text-left">
              <div>
                <span className="inline-block bg-[#DCFCE7] text-[#166534] font-inter-600 text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                  {kepalaDesa.role}
                </span>
                <h2 className="font-montserrat-700 text-green-50 text-3xl md:text-4xl">
                  {kepalaDesa.name}
                </h2>
              </div>

              {/* Kutipan Komitmen */}
              <div className="border-l-4 border-green-350 pl-4 py-1">
                <p className="font-inter-400 text-green-350 text-base leading-relaxed italic">
                  "{kepalaDesa.quote}"
                </p>
              </div>

              {/* Kontak Email */}
              <div className="flex items-center gap-2 mt-2">
                <img
                  src="/assets/icons/mail.svg"
                  alt="Email Icon"
                  className="h-4 w-4"
                  style={{ filter: "invert(23%) sepia(40%) saturate(700%) hue-rotate(103deg)" }}
                />
                <a
                  href={`mailto:${kepalaDesa.email}`}
                  className="font-inter-600 text-green-50 hover:text-green-350 text-sm transition-colors"
                >
                  {kepalaDesa.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Struktur Organisasi (Bagan Pohon) Ã¢â‚¬” lebar penuh (w-full) */}
        <section className="w-full flex flex-col gap-8">
          <h2 className="font-montserrat-700 text-green-50 text-2xl md:text-3xl text-center">
            Struktur Organisasi
          </h2>

          <div className="bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-green-850/10 shadow-sm flex flex-col items-center overflow-x-auto">
            <div className="min-w-[640px] flex flex-col items-center w-full">

              {/* Level 1: Kepala Desa */}
              <div className="bg-green-50 text-white font-inter-600 px-6 py-3 rounded-lg text-sm shadow-md transition-all duration-300 hover:scale-105 inline-block text-center w-52">
                Kepala Desa
              </div>

              {/* Line Level 1 to 2 */}
              <div className="w-[2px] h-8 bg-[#2B694D]/35"></div>

              {/* Level 2: Sekretaris Desa */}
              <div className="bg-[#2B694D] text-white font-inter-600 px-6 py-3 rounded-lg text-sm shadow-md transition-all duration-300 hover:scale-105 inline-block text-center w-52">
                Sekretaris Desa
              </div>

              {/* Line Level 2 ke branch horizontal */}
              <div className="w-[2px] h-8 bg-[#2B694D]/35"></div>

              {/* Level 3: Kaur & Kasi Branches */}
              <div className="relative flex justify-between w-full max-w-3xl">
                {/* Horizontal Connection Bar */}
                <div className="absolute top-0 left-[16.6%] right-[16.6%] h-[2px] bg-[#2B694D]/35"></div>

                {/* Column 1: Kaur Keuangan */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-[2px] h-8 bg-[#2B694D]/35"></div>
                  <div className="bg-white border border-[#2B694D]/20 text-green-50 font-inter-600 px-4 py-2.5 rounded-lg text-xs shadow-sm transition-all duration-300 hover:scale-105 text-center w-44">
                    Kaur Keuangan
                  </div>
                </div>

                {/* Column 2: Kasi Pelayanan */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-[2px] h-8 bg-[#2B694D]/35"></div>
                  <div className="bg-white border border-[#2B694D]/20 text-green-50 font-inter-600 px-4 py-2.5 rounded-lg text-xs shadow-sm transition-all duration-300 hover:scale-105 text-center w-44">
                    Kasi Pelayanan
                  </div>
                </div>

                {/* Column 3: Kasi Kesejahteraan */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-[2px] h-8 bg-[#2B694D]/35"></div>
                  <div className="bg-white border border-[#2B694D]/20 text-green-50 font-inter-600 px-4 py-2.5 rounded-lg text-xs shadow-sm transition-all duration-300 hover:scale-105 text-center w-44">
                    Kasi Kesejahteraan
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Jajaran Perangkat Desa & Pencarian */}
        <section className="w-full flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-green-850/10 pb-4">
            <h2 className="font-montserrat-700 text-green-50 text-2xl md:text-3xl">
              Jajaran Perangkat Desa
            </h2>

            {/* Input Pencarian */}
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-green-350"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredList.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden border border-green-850/15 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  {/* Foto Perangkat */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <MemberPhoto
                      src={member.image || ""}
                      name={member.name}
                      initials={member.initials}
                      avatarColor={member.avatarColor}
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
                      className="flex items-center gap-1.5 text-[11px] text-green-350 hover:text-green-250 transition-colors mt-auto pt-2 border-t border-green-850/10 break-all"
                    >
                      <img
                        src="/assets/icons/mail.svg"
                        alt="Email Icon"
                        className="h-3 w-3 flex-shrink-0"
                        style={{ filter: "invert(60%) sepia(20%) saturate(400%) hue-rotate(103deg)" }}
                      />
                      <span>{member.email}</span>
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

      </div>
    </div>
  );
};

export default PerangkatPage;