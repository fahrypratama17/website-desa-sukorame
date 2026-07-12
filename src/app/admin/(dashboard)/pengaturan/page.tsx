import Link from 'next/link';
import { FiHome, FiUser, FiDatabase, FiLock } from 'react-icons/fi';
import { saveSettings } from '@/feature/admin/actions/pengaturan';
import { createMisi, updateMisi, deleteMisi } from '@/feature/admin/actions/misi';
import { createNilaiUtama, updateNilaiUtama, deleteNilaiUtama } from '@/feature/admin/actions/nilai-utama';
import SubmitButton from '@/feature/admin/components/SubmitButton';
import DynamicMisiForm from '@/feature/admin/components/DynamicMisiForm';
import DynamicNilaiUtamaForm from '@/feature/admin/components/DynamicNilaiUtamaForm';
import ToastForm from '@/feature/admin/components/ToastForm';
import HeroBannerUploadClient from '@/feature/admin/components/HeroBannerUploadClient';
import ChangePasswordClient from '@/feature/admin/components/ChangePasswordClient';
import prisma from '@/lib/prisma';

export default async function PengaturanPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const resolvedParams = await searchParams;
  const currentTab = resolvedParams.tab || 'umum';

  const rawSettings = await prisma.setting.findMany();
  const settings = rawSettings.reduce((acc: Record<string, string>, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const misiData = currentTab === 'profil' ? await prisma.misi.findMany({ orderBy: { order: 'asc' } }) : [];
  const nilaiUtamaData = currentTab === 'profil' ? await prisma.nilaiUtama.findMany({ orderBy: { order: 'asc' } }) : [];

  const tabs = [
    { 
      id: 'umum', 
      label: 'Umum & Beranda', 
      icon: (
        <FiHome className="w-5 h-5" />
      )
    },
    { 
      id: 'profil', 
      label: 'Profil, Visi & Misi', 
      icon: (
        <FiUser className="w-5 h-5" />
      )
    },
    { 
      id: 'data', 
      label: 'Kontak & Statistik', 
      icon: (
        <FiDatabase className="w-5 h-5" />
      )
    },
    { 
      id: 'keamanan', 
      label: 'Keamanan Akun', 
      icon: (
        <FiLock className="w-5 h-5" />
      )
    },
  ];

  return (
    <div className="space-y-8 w-full pb-24 relative">
      <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-montserrat-700 text-[#1C3F2D]">Pengaturan Global</h2>
          <p className="text-[#414844] mt-2 font-inter-400 text-sm md:text-base">Kelola teks identitas, profil, statistik, dan kontak untuk seluruh halaman publik Website Desa Sukorame.</p>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex space-x-2 bg-gray-50/70 p-1.5 rounded-2xl border border-gray-100 overflow-x-auto hide-scrollbar">
        {tabs.map((t) => (
          <Link 
            key={t.id} 
            href={`/admin/pengaturan?tab=${t.id}`} 
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-inter-600 transition-all whitespace-nowrap ${currentTab === t.id ? 'bg-white text-[#1C3F2D] shadow-sm border border-gray-200/60 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50 border border-transparent'}`}
          >
            {t.icon}
            {t.label}
          </Link>
        ))}
      </div>

      <ToastForm action={saveSettings} className="space-y-8">
        
        {/* ======================= TAB: UMUM ======================= */}
        {currentTab === 'umum' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 1. Identitas Utama */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Identitas Utama</h3>
                <p className="text-sm text-gray-500 mt-1">Informasi dasar desa dan kalimat penyambut utama (slogan) di halaman beranda.</p>
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <label htmlFor="desa_nama" className="block text-sm font-inter-600 text-gray-700 mb-2">Nama Desa</label>
                  <input type="text" id="desa_nama" name="desa_nama" defaultValue={settings.desa_nama || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                </div>
                <div>
                  <label htmlFor="hero_title" className="block text-sm font-inter-600 text-gray-700 mb-2">Slogan Utama / Judul Besar Beranda</label>
                  <input type="text" id="hero_title" name="hero_title" defaultValue={settings.hero_title || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                </div>
                <div>
                  <label htmlFor="hero_subtitle" className="block text-sm font-inter-600 text-gray-700 mb-2">Sub-Slogan Beranda (Deskripsi Singkat)</label>
                  <textarea id="hero_subtitle" name="hero_subtitle" defaultValue={settings.hero_subtitle || ''} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
                </div>
                <HeroBannerUploadClient initialUrl={settings.hero_banner_image || ''} />
              </div>
            </div>

            {/* 2. Teks Beranda Tambahan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Teks Pengantar</h3>
                <p className="text-sm text-gray-500 mt-1">Paragraf perkenalan singkat yang akan dimunculkan di halaman depan setelah banner utama.</p>
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <label htmlFor="tentang_desa_deskripsi" className="block text-sm font-inter-600 text-gray-700 mb-2">Teks &quot;Tentang Desa&quot; (Beranda)</label>
                  <textarea id="tentang_desa_deskripsi" name="tentang_desa_deskripsi" defaultValue={settings.tentang_desa_deskripsi || ''} rows={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
                </div>
              </div>
            </div>

            {/* 3. Footer */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Pengaturan Footer</h3>
                <p className="text-sm text-gray-500 mt-1">Teks yang terletak di bagian paling bawah website.</p>
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <label htmlFor="footer_deskripsi" className="block text-sm font-inter-600 text-gray-700 mb-2">Deskripsi Singkat Footer</label>
                  <textarea id="footer_deskripsi" name="footer_deskripsi" defaultValue={settings.footer_deskripsi || ''} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: PROFIL & VISI MISI ======================= */}
        {currentTab === 'profil' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Profil Singkat */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Profil Singkat Desa</h3>
                <p className="text-sm text-gray-500 mt-1">Narasi tentang sejarah, kebudayaan, atau gambaran umum desa yang ditampilkan khusus di halaman profil.</p>
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <label htmlFor="profil_hero_subtitle" className="block text-sm font-inter-600 text-gray-700 mb-2">Teks Pengantar Halaman Profil</label>
                  <textarea id="profil_hero_subtitle" name="profil_hero_subtitle" defaultValue={settings.profil_hero_subtitle || ''} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
                </div>
                <div>
                  <label htmlFor="gambaran_umum_deskripsi" className="block text-sm font-inter-600 text-gray-700 mb-2">Teks &quot;Gambaran Umum&quot; Lengkap</label>
                  <textarea id="gambaran_umum_deskripsi" name="gambaran_umum_deskripsi" defaultValue={settings.gambaran_umum_deskripsi || ''} rows={5} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
                </div>
              </div>
            </div>

            {/* Visi */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Visi Pembangunan</h3>
                <p className="text-sm text-gray-500 mt-1">Teks utama yang menjelaskan cita-cita besar atau tujuan akhir pembangunan desa.</p>
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <label htmlFor="desa_visi" className="block text-sm font-inter-600 text-gray-700 mb-2">Teks Visi Desa</label>
                  <textarea id="desa_visi" name="desa_visi" defaultValue={settings.desa_visi || ''} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
                </div>
                <div>
                  <label htmlFor="desa_visi_subtitle" className="block text-sm font-inter-600 text-gray-700 mb-2">Sub-Teks Visi Desa (Penjelasan / Makna)</label>
                  <textarea id="desa_visi_subtitle" name="desa_visi_subtitle" defaultValue={settings.desa_visi_subtitle || ''} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: DATA & KONTAK ======================= */}
        {currentTab === 'data' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Statistik */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Statistik &amp; Demografi</h3>
                <p className="text-sm text-gray-500 mt-1">Angka-angka representatif desa (penduduk, wilayah, dsb) untuk meningkatkan transparansi informasi.</p>
              </div>
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="statistik_penduduk" className="block text-sm font-inter-600 text-gray-700 mb-2">Jumlah Penduduk</label>
                    <input type="text" id="statistik_penduduk" name="statistik_penduduk" defaultValue={settings.statistik_penduduk || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                  </div>
                  <div>
                    <label htmlFor="statistik_dusun" className="block text-sm font-inter-600 text-gray-700 mb-2">Jumlah Dusun</label>
                    <input type="text" id="statistik_dusun" name="statistik_dusun" defaultValue={settings.statistik_dusun || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                  </div>
                  <div>
                    <label htmlFor="statistik_rtrw" className="block text-sm font-inter-600 text-gray-700 mb-2">Jumlah RT/RW</label>
                    <input type="text" id="statistik_rtrw" name="statistik_rtrw" defaultValue={settings.statistik_rtrw || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                  </div>
                  <div>
                    <label htmlFor="statistik_potensi" className="block text-sm font-inter-600 text-gray-700 mb-2">Potensi Unggulan</label>
                    <input type="text" id="statistik_potensi" name="statistik_potensi" defaultValue={settings.statistik_potensi || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                  </div>
                  <div>
                    <label htmlFor="statistik_luas" className="block text-sm font-inter-600 text-gray-700 mb-2">Luas Wilayah</label>
                    <input type="text" id="statistik_luas" name="statistik_luas" defaultValue={settings.statistik_luas || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                  </div>
                  <div>
                    <label htmlFor="statistik_ketinggian" className="block text-sm font-inter-600 text-gray-700 mb-2">Ketinggian (mdpl)</label>
                    <input type="text" id="statistik_ketinggian" name="statistik_ketinggian" defaultValue={settings.statistik_ketinggian || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Kontak & Sosmed */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Kontak &amp; Sosial Media</h3>
                <p className="text-sm text-gray-500 mt-1">Informasi untuk menghubungi aparatur desa dan tautan jejaring sosial resmi.</p>
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="kontak_telepon" className="block text-sm font-inter-600 text-gray-700 mb-2">Nomor Telepon / WhatsApp</label>
                    <input type="text" id="kontak_telepon" name="kontak_telepon" defaultValue={settings.kontak_telepon || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                  </div>
                  <div>
                    <label htmlFor="kontak_email" className="block text-sm font-inter-600 text-gray-700 mb-2">Email Resmi Desa</label>
                    <input type="email" id="kontak_email" name="kontak_email" defaultValue={settings.kontak_email || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
                  </div>
                </div>
                <div>
                  <label htmlFor="kontak_alamat" className="block text-sm font-inter-600 text-gray-700 mb-2">Alamat Lengkap Balai Desa</label>
                  <textarea id="kontak_alamat" name="kontak_alamat" defaultValue={settings.kontak_alamat || ''} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
                </div>
                <div>
                  <label htmlFor="kontak_lokasi" className="block text-sm font-inter-600 text-gray-700 mb-2">Kecamatan &amp; Kabupaten (Tampil di Navbar)</label>
                  <input type="text" id="kontak_lokasi" name="kontak_lokasi" defaultValue={settings.kontak_lokasi || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="Kec. Binangun, Blitar" />
                </div>
                
                <div className="border-t border-gray-100 pt-5 mt-2 grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="sosmed_facebook" className="block text-sm font-inter-600 text-gray-700 mb-2">Facebook (URL)</label>
                    <input type="url" id="sosmed_facebook" name="sosmed_facebook" defaultValue={settings.sosmed_facebook || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="https://..." />
                  </div>
                  <div>
                    <label htmlFor="sosmed_instagram" className="block text-sm font-inter-600 text-gray-700 mb-2">Instagram (URL)</label>
                    <input type="url" id="sosmed_instagram" name="sosmed_instagram" defaultValue={settings.sosmed_instagram || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="https://..." />
                  </div>
                  <div>
                    <label htmlFor="sosmed_youtube" className="block text-sm font-inter-600 text-gray-700 mb-2">YouTube (URL)</label>
                    <input type="url" id="sosmed_youtube" name="sosmed_youtube" defaultValue={settings.sosmed_youtube || ''} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="https://..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button for saving form (selalu ada di setiap tab statis KECUALI keamanan) */}
        {currentTab !== 'keamanan' && (
          <div className="fixed bottom-6 right-6 lg:right-10 z-40">
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-200/60 backdrop-blur-md bg-white/80">
              <SubmitButton text="Simpan Perubahan" loadingText="Menyimpan..." />
            </div>
          </div>
        )}

      </ToastForm>

      {/* ======================= TAB: KEAMANAN ======================= */}
      {currentTab === 'keamanan' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
          <ChangePasswordClient />
        </div>
      )}

      {/* ======================= DYNAMIC CRUD FOR PROFIL TAB ======================= */}
      {currentTab === 'profil' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
          
          <div className="bg-blue-50/80 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <p className="text-sm font-inter-500 text-blue-700">
              Bagian di bawah ini adalah pengaturan data yang akan langsung tersimpan secara otomatis (real-time) setiap kali Anda menambah, mengedit, atau menghapus item, tanpa perlu menekan tombol "Simpan Pengaturan Tab Ini".
            </p>
          </div>

          {/* Misi CRUD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
              <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Daftar Misi Desa</h3>
              <p className="text-sm text-gray-500 mt-1">Kelola poin-poin misi yang ditampilkan dalam bentuk kartu-kartu terpisah di halaman web.</p>
            </div>
            <div className="p-6 md:p-8">
              <DynamicMisiForm
                initialData={misiData}
                createAction={createMisi}
                updateAction={updateMisi}
                deleteAction={deleteMisi}
              />
            </div>
          </div>

          {/* Nilai Utama CRUD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100">
              <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Daftar Nilai Utama</h3>
              <p className="text-sm text-gray-500 mt-1">Nilai-nilai utama atau filosofi yang dijunjung oleh pemerintahan desa.</p>
            </div>
            <div className="p-6 md:p-8">
              <DynamicNilaiUtamaForm
                initialData={nilaiUtamaData}
                createAction={createNilaiUtama}
                updateAction={updateNilaiUtama}
                deleteAction={deleteNilaiUtama}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
