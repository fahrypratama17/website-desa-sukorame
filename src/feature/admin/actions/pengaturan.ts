'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

const SETTING_KEYS = [
  // 1. Identitas Utama
  'desa_nama',
  'hero_title',
  'hero_subtitle',
  // 2. Visi & Misi
  'desa_visi',
  'desa_visi_subtitle',
  'desa_misi',
  // 3. Nilai-Nilai Utama
  'desa_nilai_utama',
  // 4. Profil & Gambaran Umum
  'profil_hero_subtitle',
  'tentang_desa_deskripsi',
  'gambaran_umum_deskripsi',
  // 5. Statistik Desa
  'statistik_penduduk',
  'statistik_dusun',
  'statistik_rtrw',
  'statistik_potensi',
  'statistik_luas',
  'statistik_ketinggian',
  // 6. Kontak & Sosial Media
  'kontak_telepon',
  'kontak_email',
  'kontak_alamat',
  'sosmed_facebook',
  'sosmed_instagram',
  'sosmed_youtube',
  // 7. Pengaturan Footer
  'footer_deskripsi'
];

export async function saveSettings(formData: FormData) {
  try {
    const promises = SETTING_KEYS.map((key) => {
      const value = formData.get(key) as string;
      if (value !== null) {
        return prisma.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    });

    await Promise.all(promises);

    // Revalidate semua rute karena pengaturan global bisa berdampak ke seluruh halaman
    revalidatePath('/', 'layout');
    
  } catch (error) {
    console.error("Failed to save settings:", error);
    throw new Error("Gagal menyimpan pengaturan global");
  }
}
