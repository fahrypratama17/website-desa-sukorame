'use client';

import { useState } from 'react';
import Link from 'next/link';
import { updateProgram } from '@/feature/admin/actions/program';
import { uploadImage } from '@/feature/admin/actions/upload';
import type { Program } from '@prisma/client';

export default function ProgramEditClient({ program }: { program: Program }) {
  const [imageUrl, setImageUrl] = useState(program.image || '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bind the ID to the server action
  const updateProgramWithId = updateProgram.bind(null, program.id);

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
    formData.append("folder", "program");

    const result = await uploadImage(formData);
    setIsUploading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      setImageUrl(result.url);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-inter-500 text-sm rounded-r-lg shadow-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form action={updateProgramWithId} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-inter-600 text-gray-700 mb-2">Judul Program <span className="text-red-500">*</span></label>
              <input type="text" id="title" name="title" defaultValue={program.title} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
            </div>

            <div>
              <label htmlFor="kategori" className="block text-sm font-inter-600 text-gray-700 mb-2">Kategori <span className="text-red-500">*</span></label>
              <select id="kategori" name="kategori" defaultValue={program.kategori} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] bg-white">
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-inter-600 text-gray-700 mb-2">Gambar Program (Opsional)</label>
              
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
                id="image" 
                name="image" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" 
              />
              
              {imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 relative aspect-video flex items-center justify-center max-w-sm">
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover relative z-10" 
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-inter-600 text-gray-700 mb-2">Deskripsi Program <span className="text-red-500">*</span></label>
              <textarea id="description" name="description" defaultValue={program.description} required rows={6} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link href="/admin/program" className="px-6 py-3 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition">
              Batal
            </Link>
            <button type="submit" disabled={isUploading} className="px-6 py-3 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
              {isUploading ? 'Tunggu Upload...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
