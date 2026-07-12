"use client";

import Link from "next/link";
import { Berita } from "@prisma/client";
import { FiSearch, FiImage, FiCalendar } from "react-icons/fi";

interface SearchResultSectionProps {
  query: string;
  results: Berita[];
}

const SearchResultSection = ({ query, results }: SearchResultSectionProps) => {
  return (
    <section className="bg-white min-h-screen pt-32 pb-16">
      <div className="mx-auto w-[90%]">
        <div className="mb-12 border-b border-gray-100 pb-8">
          <h2 className="text-3xl md:text-4xl font-montserrat-700 text-[#1C3F2D] mb-3">Hasil Pencarian</h2>
          <p className="text-[#414844] font-inter-400 text-lg">
            Menampilkan hasil untuk: <span className="font-inter-700 text-[#285A43]">"{query}"</span>
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center justify-center">
            <FiSearch className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-montserrat-600 text-gray-600 mb-2">Pencarian tidak ditemukan</h3>
            <p className="text-gray-500 font-inter-400 text-sm max-w-md">Kami tidak dapat menemukan berita atau program yang cocok dengan kata kunci tersebut. Coba gunakan kata kunci lain.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {results.map((item) => (
              <Link href={`/berita/${item.slug}`} key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition duration-300 flex flex-col sm:flex-row h-auto sm:h-48">
                <div className="w-full sm:w-1/3 h-48 sm:h-full bg-gray-100 shrink-0 relative overflow-hidden">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#EBE9DE]">
                      <FiImage className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-inter-600 text-[#1C3F2D] shadow-sm">
                    {item.kategori}
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-grow w-full">
                  <div className="text-xs text-gray-500 font-inter-500 mb-2 flex items-center gap-1">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="font-montserrat-700 text-lg md:text-xl text-[#1C3F2D] mb-3 group-hover:text-[#285A43] transition line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-inter-400 text-sm text-[#414844] line-clamp-2 sm:line-clamp-3 mt-auto">
                    {item.content.replace(/<[^>]*>?/gm, '').replace(/[#*`_\[\]]/g, '')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultSection;
