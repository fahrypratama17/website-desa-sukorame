'use client';

import { useState, useMemo, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { updateBerita } from '@/feature/admin/actions/berita';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Berita } from '@prisma/client';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

export default function BeritaEditClient({ berita }: { berita: Berita }) {
  const [content, setContent] = useState(berita.content || '');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [submitAction, setSubmitAction] = useState<string | null>(null);

  const [thumbnailUrl, setThumbnailUrl] = useState(berita.thumbnail || '');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [thumbnailUrl]);

  const mdeOptions = useMemo(() => ({
    spellChecker: false,
    hideIcons: ["guide", "fullscreen", "side-by-side"] as any
  }), []);

  // Bind the ID to the server action
  const updateBeritaWithId = updateBerita.bind(null, berita.id);

  const handleAction = (formData: FormData) => {
    startTransition(async () => {
      setError(null);
      try {
        const result = await updateBeritaWithId(formData);
        if (result?.error) {
          setError(result.error);
        }
      } catch (err) {
        const isRedirect = err && typeof err === 'object' && 'digest' in err && typeof (err as any).digest === 'string' && (err as any).digest.startsWith('NEXT_REDIRECT');
        if (isRedirect) {
          throw err;
        }
        setError("Gagal menyimpan perubahan. Silakan periksa koneksi internet Anda atau coba beberapa saat lagi.");
      }
    });
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-inter-500 text-sm rounded-r-lg shadow-sm">
          {error}
        </div>
      )}

      <form action={handleAction} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Kolom Kiri: Konten Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-montserrat-700 text-[#1C3F2D] mb-6 border-b border-gray-100 pb-4">Konten Artikel</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-inter-600 text-gray-700 mb-2">Judul Berita <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  defaultValue={berita.title}
                  required 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] text-gray-800 font-inter-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-inter-600 text-gray-700 mb-3">Isi Konten Berita <span className="text-red-500">*</span></label>
                <input type="hidden" name="content" value={content} />
                <div className="prose-sm max-w-none">
                  <SimpleMdeReact 
                    value={content}
                    onChange={setContent}
                    options={mdeOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pengaturan & Meta */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card Aksi */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-montserrat-700 text-[#1C3F2D] mb-4 uppercase tracking-wider border-b border-gray-100 pb-3">Aksi Perubahan</h3>
            <div className="flex flex-col gap-3">
              <button type="submit" name="status" value="PUBLISHED" onClick={() => setSubmitAction('PUBLISHED')} disabled={isPending} className="w-full px-5 py-2.5 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition shadow-sm disabled:opacity-70 flex items-center justify-center gap-2">
                {isPending && submitAction === 'PUBLISHED' && <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                {berita.status === 'PUBLISHED' ? 'Simpan Perubahan' : 'Publikasikan Sekarang'}
              </button>
              <button type="submit" name="status" value="DRAFT" onClick={() => setSubmitAction('DRAFT')} disabled={isPending} className="w-full px-5 py-2.5 bg-gray-100 text-gray-700 font-inter-600 hover:bg-gray-200 rounded-xl transition shadow-sm disabled:opacity-70 flex items-center justify-center gap-2 border border-gray-200">
                {isPending && submitAction === 'DRAFT' && <svg className="w-4 h-4 animate-spin text-gray-500" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                Simpan sebagai Draf
              </button>
              <Link href="/admin/berita" className="w-full text-center px-5 py-2.5 text-gray-500 font-inter-500 hover:text-gray-700 rounded-xl transition">
                Batal
              </Link>
            </div>
          </div>

          {/* Card Meta */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-montserrat-700 text-[#1C3F2D] mb-4 uppercase tracking-wider border-b border-gray-100 pb-3">Atribut Berita</h3>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="kategori" className="block text-sm font-inter-600 text-gray-700 mb-2">Kategori <span className="text-red-500">*</span></label>
                <select id="kategori" name="kategori" defaultValue={berita.kategori} required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] bg-white">
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Pembangunan">Pembangunan</option>
                  <option value="Pemberdayaan">Pemberdayaan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label htmlFor="thumbnail" className="block text-sm font-inter-600 text-gray-700 mb-2">URL Thumbnail</label>
                <input 
                  type="text" 
                  id="thumbnail" 
                  name="thumbnail" 
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] bg-white" 
                />
                
                {thumbnailUrl && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 relative aspect-video flex items-center justify-center">
                    <img 
                      src={thumbnailUrl} 
                      alt="Preview" 
                      className={`w-full h-full object-cover relative z-10 ${imageError ? 'hidden' : 'block'}`} 
                      onError={() => setImageError(true)} 
                    />
                    {imageError && <span className="text-xs text-gray-400 absolute z-0 text-center px-4">Gambar tidak dapat dimuat.<br/>Pastikan URL valid dan dapat diakses publik.</span>}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">Rekomendasi rasio gambar 16:9 agar proporsional.</p>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
