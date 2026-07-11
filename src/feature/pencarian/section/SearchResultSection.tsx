"use client";

import Link from "next/link";
import { Berita } from "@prisma/client";

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
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
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
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L17.5 4.5" /></svg>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-inter-600 text-[#1C3F2D] shadow-sm">
                    {item.kategori}
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-grow w-full">
                  <div className="text-xs text-gray-500 font-inter-500 mb-2 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
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
