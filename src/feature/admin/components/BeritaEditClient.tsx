'use client';

import { useState, useMemo, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { updateBerita } from '@/feature/admin/actions/berita';
import { uploadImage } from '@/feature/admin/actions/upload';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Berita } from '@prisma/client';
import { FiLoader } from 'react-icons/fi';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

export default function BeritaEditClient({ berita }: { berita: Berita }) {
  const [title, setTitle] = useState(berita.title);
  const [content, setContent] = useState(berita.content || '');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [submitAction, setSubmitAction] = useState<string | null>(null);

  const AUTOSAVE_KEY = `autosave_berita_edit_${berita.id}`;

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only load if the content in local storage is different from the database
        // This avoids confusion if they saved normally previously.
        if (parsed.title && parsed.title !== berita.title) setTitle(parsed.title);
        if (parsed.content && parsed.content !== berita.content) setContent(parsed.content);
      } catch (e) {
        // ignore JSON parse error
      }
    }
  }, [berita.id, berita.title, berita.content]);

  // Save to local storage whenever title or content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only save if it's different from the DB
      if (title !== berita.title || content !== berita.content) {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ title, content }));
      } else {
        localStorage.removeItem(AUTOSAVE_KEY);
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [title, content, berita.title, berita.content]);

  const [thumbnailUrl, setThumbnailUrl] = useState(berita.thumbnail || '');
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditorUploading, setIsEditorUploading] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [thumbnailUrl]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran gambar maksimal adalah 2 MB. Silakan pilih atau kompres gambar yang lebih kecil.");
      return;
    }

    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "berita");

    const result = await uploadImage(formData);
    setIsUploading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      setThumbnailUrl(result.url);
    }
  };

  const mdeOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: "Mulai menulis isi berita di sini menggunakan format Markdown...",
    toolbar: [
      "bold", "italic", "heading", "|", 
      "quote", "unordered-list", "ordered-list", "|", 
      "link", "upload-image", "|", 
      "preview", "guide"
    ] as any,
    uploadImage: true,
    imageUploadFunction: async (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => {
      if (file.size > 2 * 1024 * 1024) {
        onError("Ukuran gambar maksimal 2 MB.");
        return;
      }
      
      setIsEditorUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "berita");
      
      try {
        const result = await uploadImage(formData);
        setIsEditorUploading(false);
        if (result.error) {
          onError(result.error);
        } else if (result.url) {
          onSuccess(result.url);
        }
      } catch (e) {
        setIsEditorUploading(false);
        onError("Gagal mengunggah gambar.");
      }
    },
    imageTexts: {
      sbInit: "Tarik atau tempel gambar ke sini, atau klik tombol ini.",
      sbOnDragEnter: "Lepaskan gambar untuk mengunggah...",
      sbOnDrop: "Mengunggah gambar...",
      sbProgress: "Mengunggah... {0}%",
      sbOnUploaded: "Gambar berhasil diunggah!",
      sizeError: "Gambar terlalu besar."
    },
    errorCallback: (errorMessage: string) => {
      setError(errorMessage);
    }
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
        } else {
          localStorage.removeItem(AUTOSAVE_KEY);
        }
      } catch (err) {
        const isRedirect = err && typeof err === 'object' && 'digest' in err && typeof (err as any).digest === 'string' && (err as any).digest.startsWith('NEXT_REDIRECT');
        if (isRedirect) {
          localStorage.removeItem(AUTOSAVE_KEY);
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
              <button type="submit" name="status" value="PUBLISHED" onClick={() => setSubmitAction('PUBLISHED')} disabled={isPending || isUploading || isEditorUploading} className="w-full px-5 py-2.5 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isPending && submitAction === 'PUBLISHED' ? <FiLoader className="w-4 h-4 animate-spin" /> : ''}
                {isUploading || isEditorUploading ? 'Tunggu Upload...' : berita.status === 'PUBLISHED' ? 'Simpan Perubahan' : 'Publikasikan Sekarang'}
              </button>
              <button type="submit" name="status" value="DRAFT" onClick={() => setSubmitAction('DRAFT')} disabled={isPending || isUploading || isEditorUploading} className="w-full px-5 py-2.5 bg-gray-100 text-gray-700 font-inter-600 hover:bg-gray-200 rounded-xl transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-gray-200">
                {isPending && submitAction === 'DRAFT' ? <FiLoader className="w-4 h-4 animate-spin text-gray-500" /> : ''}
                {isUploading || isEditorUploading ? 'Tunggu Upload...' : 'Simpan sebagai Draf'}
              </button>
              <Link 
                href={isPending || isUploading || isEditorUploading ? "#" : "/admin/berita"} 
                onClick={(e) => {
                  if (isPending || isUploading || isEditorUploading) {
                    e.preventDefault();
                    return;
                  }
                  localStorage.removeItem(AUTOSAVE_KEY);
                }}
                className={`w-full text-center px-5 py-2.5 font-inter-500 rounded-xl transition ${isPending || isUploading || isEditorUploading ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
              >
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
                <label htmlFor="thumbnail" className="block text-sm font-inter-600 text-gray-700 mb-2">Thumbnail Berita</label>
                
                {/* Opsi Upload File */}
                <div className="mb-3">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={isUploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-inter-600 file:bg-[#E5F2EC] file:text-[#1C3F2D] hover:file:bg-[#C9E6D7] transition cursor-pointer border border-gray-200 rounded-xl"
                  />
                  {isUploading && <p className="text-sm text-[#285A43] mt-2 font-inter-500 animate-pulse">Mengunggah gambar...</p>}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-xs text-gray-400 font-inter-500 uppercase">ATAU URL MANUAL</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <input 
                  type="text" 
                  id="thumbnail" 
                  name="thumbnail" 
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] bg-white text-sm" 
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
