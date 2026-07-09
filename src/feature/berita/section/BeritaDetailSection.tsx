'use client';

import { Berita } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BeritaDetailSectionProps {
  berita: Berita;
}

const BeritaDetailSection = ({ berita }: BeritaDetailSectionProps) => {
  return (
    <section className="bg-white min-h-screen pt-32 pb-24">
      <div className="mx-auto w-[90%]">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#285A43]/10 text-[#285A43] px-4 py-1.5 rounded-full text-sm font-inter-600">
              {berita.kategori}
            </span>
            <span className="text-gray-500 text-sm font-inter-500">
              {new Date(berita.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-montserrat-700 text-[#1C3F2D] leading-[1.3] mb-6">
            {berita.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-inter-700 text-gray-500 text-lg">
              {berita.authorName.charAt(0)}
            </div>
            <div>
              <p className="font-inter-600 text-sm text-[#1C3F2D]">{berita.authorName}</p>
              <p className="text-xs text-gray-500">Penulis</p>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        {berita.thumbnail && (
          <div className="mb-12 rounded-3xl overflow-hidden aspect-[16/9] shadow-md border border-gray-100">
            <img src={berita.thumbnail} alt={berita.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content (Markdown) */}
        <article className="prose prose-lg prose-green max-w-none prose-headings:font-montserrat-700 prose-p:font-inter-400 prose-p:text-[#414844] prose-a:text-[#285A43] prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {berita.content}
          </ReactMarkdown>
        </article>

      </div>
    </section>
  );
};

export default BeritaDetailSection;
