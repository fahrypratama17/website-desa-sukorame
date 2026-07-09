import { auth } from '@/auth';

/**
 * Auth guard untuk Server Actions.
 * Melempar error jika user belum login.
 * Panggil di awal setiap server action yang membutuhkan autentikasi.
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized: Anda harus login untuk melakukan aksi ini.');
  }
  return session;
}
