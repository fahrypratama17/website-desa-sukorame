'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);
    
    // Batasan: 5 kali percobaan setiap 5 menit (300,000 ms)
    const rateLimit = checkRateLimit(`login_${ip}`, 5, 5 * 60 * 1000);
    
    if (!rateLimit.success) {
      return 'Terlalu banyak percobaan login. Silakan coba lagi dalam 5 menit.';
    }

    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email atau password salah.';
        default:
          return 'Terjadi kesalahan sistem.';
      }
    }
    throw error;
  }
}
