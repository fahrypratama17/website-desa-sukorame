import { PrismaClient } from '@prisma/client';
import { saveSettings } from '../../../../feature/admin/actions/pengaturan';
import SubmitButton from '../../../../feature/admin/components/SubmitButton';
import DynamicMisiForm from '../../../../feature/admin/components/DynamicMisiForm';
import DynamicNilaiUtamaForm from '../../../../feature/admin/components/DynamicNilaiUtamaForm';
import ToastForm from '../../../../feature/admin/components/ToastForm';

const prisma = new PrismaClient();

export default async function PengaturanPage() {
  const rawSettings = await prisma.setting.findMany();
  
  const settings = rawSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Pengaturan Global</h2>
        <p className="text-[#414844] mt-1 font-inter-400">Atur seluruh teks, statistik, visi misi, dan kontak untuk Halaman Publik Desa Sukorame.</p>
      </div>

      <ToastForm action={saveSettings} className="space-y-8">
        
        {/* 1. Identitas Utama */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-montserrat-700 text-[#1C3F2D] flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              1. Identitas Utama (Beranda)
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="desa_nama" className="block text-sm font-inter-600 text-gray-700 mb-2">Nama Desa</label>
              <input type="text" id="desa_nama" name="desa_nama" defaultValue={settings.desa_nama || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
            </div>
            <div>
              <label htmlFor="hero_title" className="block text-sm font-inter-600 text-gray-700 mb-2">Slogan Utama / Judul Besar Beranda</label>
              <input type="text" id="hero_title" name="hero_title" defaultValue={settings.hero_title || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
            </div>
            <div>
              <label htmlFor="hero_subtitle" className="block text-sm font-inter-600 text-gray-700 mb-2">Sub-Slogan Beranda (Deskripsi Singkat)</label>
              <textarea id="hero_subtitle" name="hero_subtitle" defaultValue={settings.hero_subtitle || ''} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
            </div>
          </div>
        </div>

        {/* 2. Visi Misi */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-montserrat-700 text-[#1C3F2D] flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              2. Visi & Misi Pembangunan
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="desa_visi" className="block text-sm font-inter-600 text-gray-700 mb-2">Teks Visi Desa</label>
              <textarea id="desa_visi" name="desa_visi" defaultValue={settings.desa_visi || ''} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
            </div>
            <div>
              <label htmlFor="desa_visi_subtitle" className="block text-sm font-inter-600 text-gray-700 mb-2">Sub-Teks Visi Desa (Penjelasan)</label>
              <textarea id="desa_visi_subtitle" name="desa_visi_subtitle" defaultValue={settings.desa_visi_subtitle || ''} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <DynamicMisiForm initialData={settings.desa_misi} saveAction={saveSettings} />
            </div>
          </div>
        </div>

        {/* 3. Nilai Utama */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-montserrat-700 text-[#1C3F2D] flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              3. Nilai-Nilai Utama
            </h3>
          </div>
          <div className="p-6">
            <DynamicNilaiUtamaForm initialData={settings.desa_nilai_utama} saveAction={saveSettings} />
          </div>
        </div>

        {/* 4. Profil & Gambaran Umum */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-montserrat-700 text-[#1C3F2D] flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              4. Teks Profil & Deskripsi Desa
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="tentang_desa_deskripsi" className="block text-sm font-inter-600 text-gray-700 mb-2">Teks "Tentang Desa" (Muncul di Beranda)</label>
              <textarea id="tentang_desa_deskripsi" name="tentang_desa_deskripsi" defaultValue={settings.tentang_desa_deskripsi || ''} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
            </div>
            <div>
              <label htmlFor="profil_hero_subtitle" className="block text-sm font-inter-600 text-gray-700 mb-2">Teks Pengantar Halaman Profil</label>
              <textarea id="profil_hero_subtitle" name="profil_hero_subtitle" defaultValue={settings.profil_hero_subtitle || ''} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
            </div>
            <div>
              <label htmlFor="gambaran_umum_deskripsi" className="block text-sm font-inter-600 text-gray-700 mb-2">Teks "Gambaran Umum" (Halaman Profil)</label>
              <textarea id="gambaran_umum_deskripsi" name="gambaran_umum_deskripsi" defaultValue={settings.gambaran_umum_deskripsi || ''} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
            </div>
          </div>
        </div>

        {/* 5. Statistik Desa */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-montserrat-700 text-[#1C3F2D] flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              5. Angka Statistik Desa
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="statistik_penduduk" className="block text-sm font-inter-600 text-gray-700 mb-2">Jumlah Penduduk</label>
              <input type="text" id="statistik_penduduk" name="statistik_penduduk" defaultValue={settings.statistik_penduduk || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
            </div>
            <div>
              <label htmlFor="statistik_dusun" className="block text-sm font-inter-600 text-gray-700 mb-2">Jumlah Dusun</label>
              <input type="text" id="statistik_dusun" name="statistik_dusun" defaultValue={settings.statistik_dusun || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
            </div>
            <div>
              <label htmlFor="statistik_rtrw" className="block text-sm font-inter-600 text-gray-700 mb-2">Jumlah RT/RW</label>
              <input type="text" id="statistik_rtrw" name="statistik_rtrw" defaultValue={settings.statistik_rtrw || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
            </div>
            <div>
              <label htmlFor="statistik_potensi" className="block text-sm font-inter-600 text-gray-700 mb-2">Jumlah Potensi Unggulan</label>
              <input type="text" id="statistik_potensi" name="statistik_potensi" defaultValue={settings.statistik_potensi || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
            </div>
            <div>
              <label htmlFor="statistik_luas" className="block text-sm font-inter-600 text-gray-700 mb-2">Luas Wilayah</label>
              <input type="text" id="statistik_luas" name="statistik_luas" defaultValue={settings.statistik_luas || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
            </div>
            <div>
              <label htmlFor="statistik_ketinggian" className="block text-sm font-inter-600 text-gray-700 mb-2">Ketinggian (mdpl)</label>
              <input type="text" id="statistik_ketinggian" name="statistik_ketinggian" defaultValue={settings.statistik_ketinggian || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
            </div>
          </div>
        </div>

        {/* 6. Kontak & Sosial Media */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-montserrat-700 text-[#1C3F2D] flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              6. Kontak & Sosial Media
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="kontak_telepon" className="block text-sm font-inter-600 text-gray-700 mb-2">Nomor Telepon / WhatsApp</label>
                <input type="text" id="kontak_telepon" name="kontak_telepon" defaultValue={settings.kontak_telepon || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
              </div>
              <div>
                <label htmlFor="kontak_email" className="block text-sm font-inter-600 text-gray-700 mb-2">Email Desa</label>
                <input type="email" id="kontak_email" name="kontak_email" defaultValue={settings.kontak_email || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
              </div>
            </div>
            <div>
              <label htmlFor="kontak_alamat" className="block text-sm font-inter-600 text-gray-700 mb-2">Alamat Lengkap Balai Desa</label>
              <textarea id="kontak_alamat" name="kontak_alamat" defaultValue={settings.kontak_alamat || ''} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
            </div>
            <div className="border-t border-gray-100 pt-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="sosmed_facebook" className="block text-sm font-inter-600 text-gray-700 mb-2">Link Facebook (Opsional)</label>
                <input type="url" id="sosmed_facebook" name="sosmed_facebook" defaultValue={settings.sosmed_facebook || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label htmlFor="sosmed_instagram" className="block text-sm font-inter-600 text-gray-700 mb-2">Link Instagram (Opsional)</label>
                <input type="url" id="sosmed_instagram" name="sosmed_instagram" defaultValue={settings.sosmed_instagram || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="https://instagram.com/..." />
              </div>
              <div>
                <label htmlFor="sosmed_youtube" className="block text-sm font-inter-600 text-gray-700 mb-2">Link YouTube (Opsional)</label>
                <input type="url" id="sosmed_youtube" name="sosmed_youtube" defaultValue={settings.sosmed_youtube || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="https://youtube.com/..." />
              </div>
            </div>
          </div>
        </div>

        {/* 7. Footer */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-montserrat-700 text-[#1C3F2D] flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
              7. Pengaturan Footer
            </h3>
          </div>
          <div className="p-6">
            <label htmlFor="footer_deskripsi" className="block text-sm font-inter-600 text-gray-700 mb-2">Deskripsi Singkat Footer</label>
            <textarea id="footer_deskripsi" name="footer_deskripsi" defaultValue={settings.footer_deskripsi || ''} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12 sticky bottom-0">
          <SubmitButton text="Simpan Semua Pengaturan" loadingText="Menyimpan..." />
        </div>

      </ToastForm>
    </div>
  );
}
