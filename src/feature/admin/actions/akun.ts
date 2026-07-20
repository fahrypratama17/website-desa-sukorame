'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function changePassword(formData: FormData) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);
    
    // Batasan: 3 kali percobaan ganti password setiap 15 menit (900,000 ms)
    const rateLimit = checkRateLimit(`pwd_${ip}`, 3, 15 * 60 * 1000);
    
    if (!rateLimit.success) {
      return { error: 'Terlalu banyak percobaan ganti password. Silakan coba lagi dalam 15 menit.' };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Anda harus login untuk melakukan aksi ini.' };
    }

    const oldPassword = formData.get('oldPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return { error: 'Semua kolom wajib diisi.' };
    }

    if (newPassword !== confirmPassword) {
      return { error: 'Password baru dan konfirmasi tidak cocok.' };
    }

    if (newPassword.length < 6) {
      return { error: 'Password baru harus memiliki minimal 6 karakter.' };
    }

    // Get current user from DB
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { error: 'Pengguna tidak ditemukan.' };
    }

    // Verify old password
    if (user.password) {
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return { error: 'Password saat ini salah.' };
      }
    } else {
      // User doesn't have a password (e.g. they logged in with OAuth like Google).
      // If we support OAuth and they want to set a password, they won't have an old one.
      // But for this village CMS, we use credentials login.
      return { error: 'Akun ini tidak memiliki password untuk diubah.' };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in DB
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to change password:', error);
    return { error: 'Terjadi kesalahan sistem saat mencoba mengubah password.' };
  }
}
