import Link from 'next/link';
import { createProgram } from '@/feature/admin/actions/program';

export default function TambahProgramPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/program" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Tambah Program</h2>
          <p className="text-[#414844] mt-1 font-inter-400 text-sm">Tambahkan program kerja atau kegiatan baru desa.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form action={createProgram} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-inter-600 text-gray-700 mb-2">Judul Program <span className="text-red-500">*</span></label>
              <input type="text" id="title" name="title" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="Contoh: Pembangunan Irigasi Sawah" />
            </div>

            <div>
              <label htmlFor="kategori" className="block text-sm font-inter-600 text-gray-700 mb-2">Kategori <span className="text-red-500">*</span></label>
              <select id="kategori" name="kategori" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] bg-white">
                <option value="">-- Pilih Kategori --</option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-inter-600 text-gray-700 mb-2">URL/Path Gambar (Opsional)</label>
              <input type="text" id="image" name="image" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="/assets/program/gambar.jpg" />
              <p className="text-xs text-gray-500 mt-2">Untuk sementara, gunakan tautan gambar (URL) dari internet atau Google Drive.</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-inter-600 text-gray-700 mb-2">Deskripsi Program <span className="text-red-500">*</span></label>
              <textarea id="description" name="description" required rows={6} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y" placeholder="Jelaskan detail program ini..."></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Link href="/admin/program" className="px-6 py-3 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition">
              Batal
            </Link>
            <button type="submit" className="px-6 py-3 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition shadow-sm">
              Simpan Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
