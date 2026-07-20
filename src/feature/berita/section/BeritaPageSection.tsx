'use client';

import { Berita } from "@prisma/client";
import Link from "next/link";
import Pagination from "@/shared/components/Pagination";
import { FiImage, FiCalendar } from "react-icons/fi";

interface BeritaPageSectionProps {
  beritaData: Berita[];
  totalPages: number;
}

const BeritaPageSection = ({ beritaData, totalPages }: BeritaPageSectionProps) => {
  return (
    <section className="bg-white min-h-screen pt-32 pb-16">
      <div className="mx-auto w-[90%]">
        <div className="mb-12">
          <h2 className="text-4xl font-montserrat-700 text-[#1C3F2D] mb-4">Katalog Berita Desa</h2>
          <p className="text-[#414844] font-inter-400 text-lg">Informasi terbaru seputar kegiatan, pembangunan, dan pengumuman di Desa Sukorame.</p>
        </div>

        {beritaData.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-100">
            <h3 className="text-xl font-montserrat-600 text-gray-500">Belum ada berita yang diterbitkan.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {beritaData.map((item) => (
              <Link href={`/berita/${item.slug}`} key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition duration-300 flex flex-col">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#EBE9DE]">
                      <FiImage className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-inter-600 text-[#1C3F2D] shadow-sm">
                    {item.kategori}
                  </div>
                </div>
                <div className="p-3 md:p-6 flex flex-col flex-grow">
                  <div className="text-[10px] md:text-xs text-gray-500 font-inter-500 mb-2 md:mb-3 flex items-center gap-1 md:gap-2">
                    <FiCalendar className="w-3 h-3 md:w-4 md:h-4" />
                    {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <h3 className="font-montserrat-700 text-sm md:text-xl text-[#1C3F2D] mb-2 md:mb-3 group-hover:text-[#285A43] transition line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="font-inter-400 text-xs md:text-sm text-[#414844] line-clamp-2 md:line-clamp-3 mt-auto">
                    {/* We only show a brief text, stripping markdown isn't trivial here without a library, but basic plain text is fine for preview */}
                    {item.content.replace(/<[^>]*>?/gm, '').replace(/[#*`_\[\]]/g, '')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
};

export default BeritaPageSection;
