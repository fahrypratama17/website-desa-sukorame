'use client';

import { Berita } from "@prisma/client";
import Link from "next/link";

interface BeritaTerbaruProps {
  beritaData: Berita[];
}

const BeritaTerbaru = ({ beritaData }: BeritaTerbaruProps) => {
  if (beritaData.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto flex w-[90%] flex-col gap-12">
        <h2 className="font-montserrat-700 text-2xl md:text-3xl lg:text-[32px] text-green-50">
          Berita Terbaru
        </h2>
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 sm:gap-0 -mt-10 md:-mt-8">
          <p className="font-inter-400 text-sm md:text-base lg:text-[16px] text-[#414844]">
            Tetap terhubung dengan kabar terkini Desa Sukorame.
          </p>
          <Link href="/berita" className="text-mint-350 font-inter-500 flex items-center gap-2 text-[14px]">
            Lihat Semua Berita
            <img src="/assets/icons/arrow.svg" alt="arrow" className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {beritaData.map((item) => (
            <Link href={`/berita/${item.slug}`} key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition duration-300 flex flex-col">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#EBE9DE]">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L17.5 4.5" /></svg>
                  </div>
                )}
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-inter-600 text-[#1C3F2D] shadow-sm">
                  {item.kategori}
                </div>
              </div>
              <div className="p-3 md:p-6 flex flex-col flex-grow">
                <div className="text-[10px] md:text-xs text-gray-500 font-inter-500 mb-2 md:mb-3 flex items-center gap-1 md:gap-2">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <h3 className="font-montserrat-700 text-sm md:text-xl text-[#1C3F2D] mb-2 md:mb-3 group-hover:text-[#285A43] transition line-clamp-2">
                  {item.title}
                </h3>
                <p className="font-inter-400 text-xs md:text-sm text-[#414844] line-clamp-2 md:line-clamp-3 mt-auto">
                  {item.content.replace(/[#*`_\[\]]/g, '')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeritaTerbaru;
