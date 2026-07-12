'use client';

import { Berita } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useState } from "react";
import { incrementBeritaView } from "@/feature/berita/actions/view";
import { FiCalendar, FiEye } from "react-icons/fi";

interface BeritaDetailSectionProps {
  berita: Berita;
}

const BeritaDetailSection = ({ berita }: BeritaDetailSectionProps) => {
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    // Prevent double counting in development strict mode
    if (hasViewed) return;
    
    // Check local storage to prevent refreshing the page from counting as a new view
    const viewedKey = `viewed_berita_${berita.slug}`;
    if (!localStorage.getItem(viewedKey)) {
      incrementBeritaView(berita.slug).then((res) => {
        if (res.success) {
          localStorage.setItem(viewedKey, 'true');
        }
      });
    }
    setHasViewed(true);
  }, [berita.slug, hasViewed]);

  return (
    <section className="bg-white min-h-screen pt-32 pb-24">
      <div className="mx-auto w-[90%]">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#285A43]/10 text-[#285A43] px-4 py-1.5 rounded-full text-sm font-inter-600">
              {berita.kategori}
            </span>
            <span className="text-gray-500 text-sm font-inter-500 flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4" />
              {new Date(berita.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-gray-500 text-sm font-inter-500 flex items-center gap-1.5 ml-2">
              <FiEye className="w-4 h-4" />
              {berita.viewCount} Dilihat
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
        <article className="max-w-none w-full">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-montserrat-700 text-[#1C3F2D] mt-10 mb-6 leading-tight" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-montserrat-700 text-[#1C3F2D] mt-10 mb-6 leading-tight" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-montserrat-700 text-[#1C3F2D] mt-8 mb-4 leading-tight" {...props} />,
              h4: ({node, ...props}) => <h4 className="text-lg md:text-xl font-montserrat-700 text-[#1C3F2D] mt-6 mb-4" {...props} />,
              h5: ({node, ...props}) => <h5 className="text-base md:text-lg font-montserrat-700 text-[#1C3F2D] mt-5 mb-3" {...props} />,
              h6: ({node, ...props}) => <h6 className="text-sm md:text-base font-montserrat-700 text-[#1C3F2D] mt-5 mb-3 uppercase tracking-wider" {...props} />,
              p: ({node, ...props}) => <p className="font-inter-400 text-[#414844] text-lg leading-relaxed mb-6" {...props} />,
              a: ({node, ...props}) => <a className="text-[#285A43] font-inter-500 hover:underline hover:text-[#1C3F2D] transition-colors" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 font-inter-400 text-[#414844] text-lg space-y-3" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 font-inter-400 text-[#414844] text-lg space-y-3" {...props} />,
              li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
              strong: ({node, ...props}) => <strong className="font-inter-700 text-[#1C3F2D]" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#285A43] pl-6 italic my-8 text-gray-600 bg-gray-50 py-4 pr-6 rounded-r-xl" {...props} />,
              code: ({node, ...props}) => <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
              pre: ({node, ...props}) => <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto mb-6 text-sm" {...props} />,
              img: ({node, ...props}) => <img className="rounded-xl w-full h-auto my-8 shadow-sm border border-gray-100" {...props} />,
              hr: ({node, ...props}) => <hr className="my-10 border-gray-200" {...props} />,
            }}
          >
            {berita.content}
          </ReactMarkdown>
        </article>

      </div>
    </section>
  );
};

export default BeritaDetailSection;
