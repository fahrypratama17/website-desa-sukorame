import { z } from 'zod';

// ─── Berita ─────────────────────────────────────────────
export const BeritaSchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter').max(200, 'Judul maksimal 200 karakter'),
  content: z.string().min(20, 'Konten terlalu pendek (minimal 20 karakter)'),
  kategori: z.enum(['Pengumuman', 'Kegiatan', 'Pembangunan', 'Pemberdayaan', 'Lainnya'] as const, {
    message: 'Kategori tidak valid',
  }),
  thumbnail: z.string().optional().nullable(),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('PUBLISHED'),
});

// ─── Program ────────────────────────────────────────────
export const ProgramSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  kategori: z.string().min(2, 'Kategori wajib diisi'),
  description: z.string().min(10, 'Deskripsi terlalu pendek'),
  image: z.string().optional().nullable(),
});

// ─── Perangkat ──────────────────────────────────────────
export const PerangkatSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  role: z.string().min(2, 'Jabatan wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  image: z.string().optional().nullable(),
  quote: z.string().optional().nullable(),
});

// ─── Lembaga ────────────────────────────────────────────
export const LembagaSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  description: z.string().min(5, 'Deskripsi wajib diisi'),
  logo: z.string().optional().nullable(),
});

// ─── Misi ───────────────────────────────────────────────
export const MisiSchema = z.object({
  icon: z.string().optional().default(''),
  title: z.string().min(2, 'Judul misi wajib diisi'),
  description: z.string().min(5, 'Deskripsi misi wajib diisi'),
  order: z.number().int().min(0).default(0),
});

// ─── Nilai Utama ────────────────────────────────────────
export const NilaiUtamaSchema = z.object({
  icon: z.string().optional().default(''),
  title: z.string().min(2, 'Judul nilai wajib diisi'),
  description: z.string().min(5, 'Deskripsi nilai wajib diisi'),
  order: z.number().int().min(0).default(0),
});

// ─── Helper: Extract FormData ke object ─────────────────
export function extractFormData(formData: FormData, keys: string[]): Record<string, string | null> {
  const result: Record<string, string | null> = {};
  for (const key of keys) {
    const value = formData.get(key);
    result[key] = typeof value === 'string' ? value : null;
  }
  return result;
}
