"use client";

import { useState, useEffect } from "react";
import { uploadImage } from "@/feature/admin/actions/upload";

export default function HeroBannerUploadClient({ initialUrl }: { initialUrl: string }) {
  const [imageUrl, setImageUrl] = useState(initialUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('submit-button-disable', { detail: isUploading }));
    // Cleanup in case component unmounts while uploading
    return () => {
      window.dispatchEvent(new CustomEvent('submit-button-disable', { detail: false }));
    };
  }, [isUploading]);

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
    formData.append("folder", "banner");

    const result = await uploadImage(formData);
    setIsUploading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      setImageUrl(result.url);
    }
  };

  return (
    <div>
      <label htmlFor="hero_banner_image" className="block text-sm font-inter-600 text-gray-700 mb-2">Background Banner Beranda (Opsional)</label>
      
      {error && (
        <div className="mb-3 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-inter-500 rounded-r-lg">
          {error}
        </div>
      )}

      {/* Hidden input to pass value to ToastForm action */}
      <input type="hidden" name="hero_banner_image" value={imageUrl} />

      <div className="mb-3">
        <input 
          type="file" 
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-inter-600 file:bg-[#E5F2EC] file:text-[#1C3F2D] hover:file:bg-[#C9E6D7] transition cursor-pointer border border-gray-200 rounded-xl"
        />
        {isUploading && <p className="text-sm text-[#285A43] mt-2 font-inter-500 animate-pulse">Mengunggah gambar banner...</p>}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-xs text-gray-400 font-inter-500 uppercase">ATAU URL MANUAL</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <input 
        type="text" 
        id="hero_banner_image" 
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Kosongkan untuk banner default, atau isi URL..." 
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" 
      />

      {imageUrl && (
        <div className="mt-4 w-full h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 relative flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt="Preview Banner" 
            className="w-full h-full object-cover relative z-10" 
          />
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">Rekomendasi ukuran: Resolusi tinggi, landscape (16:9), ukuran di bawah 2MB agar loading cepat.</p>
    </div>
  );
}
