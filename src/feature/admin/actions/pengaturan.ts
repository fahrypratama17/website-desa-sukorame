'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-guard';

const SETTING_KEYS = [
  'desa_nama', 'hero_title', 'hero_subtitle',
  'desa_visi', 'desa_visi_subtitle',
  'profil_hero_subtitle', 'tentang_desa_deskripsi', 'gambaran_umum_deskripsi',
  'statistik_penduduk', 'statistik_dusun', 'statistik_rtrw',
  'statistik_potensi', 'statistik_luas', 'statistik_ketinggian',
  'kontak_telepon', 'kontak_email', 'kontak_alamat', 'kontak_lokasi',
  'sosmed_facebook', 'sosmed_instagram', 'sosmed_youtube',
  'footer_deskripsi',
];

export async function saveSettings(formData: FormData) {
  await requireAuth();

  try {
    const promises = SETTING_KEYS.map((key) => {
      const value = formData.get(key);
      if (value !== null && typeof value === 'string') {
        return prisma.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
      return undefined;
    }).filter(Boolean);

    await Promise.all(promises);

    // Revalidate semua rute karena pengaturan global berdampak ke seluruh halaman
    revalidatePath('/', 'layout');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to save settings:', message);
    throw new Error(`Gagal menyimpan pengaturan: ${message}`);
  }
}
