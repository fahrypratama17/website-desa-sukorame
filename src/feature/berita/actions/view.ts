'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function incrementBeritaView(slug: string) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);
    
    // Batasan: 20 kali view per menit per IP
    const rateLimit = checkRateLimit(`view_${ip}`, 20, 60 * 1000);
    
    if (!rateLimit.success) {
      return { error: 'Rate limit exceeded' }; // Silent error, just stop the increment
    }

    await prisma.berita.update({
      where: { slug },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
    
    // We don't necessarily want to revalidate the whole path on every view
    // to keep cache efficient, but if we do, the view count updates instantly for the next visitor.
    // For a highly trafficked site, it's better not to revalidate here, but for a village site, it's fine.
    // Let's not revalidate here to prevent excessive DB hits from static pages turning dynamic.
    
    return { success: true };
  } catch (error) {
    console.error('Failed to increment view count:', error);
    return { error: 'Failed to increment view count' };
  }
}
