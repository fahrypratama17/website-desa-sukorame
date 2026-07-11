/**
 * Sistem Rate Limiting In-Memory (RAM)
 * Cocok untuk server mandiri (VPS/Laragon) yang berjalan pada single Node.js process.
 */

type RateLimitRecord = {
  count: number;
  resetTime: number;
};

// Global Map untuk menyimpan jejak IP secara sementara di memori RAM
const store = new Map<string, RateLimitRecord>();

/**
 * Fungsi untuk memeriksa apakah sebuah IP masih diizinkan melakukan akses.
 * 
 * @param ip Alamat IP klien
 * @param limit Batas maksimal percobaan
 * @param windowMs Jendela waktu dalam milidetik (misal: 5 * 60 * 1000 untuk 5 menit)
 * @returns { success: boolean, remaining: number } 
 */
export function checkRateLimit(ip: string, limit: number, windowMs: number): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = store.get(ip);

  // Jika belum ada rekam jejak, buat baru
  if (!record) {
    store.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  // Jika waktu penalti sudah lewat, reset hitungan
  if (now > record.resetTime) {
    store.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  // Jika masih dalam jendela waktu dan sudah melewati batas, tolak!
  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  // Jika masih di bawah batas, tambahkan hitungan
  record.count += 1;
  store.set(ip, record);
  return { success: true, remaining: limit - record.count };
}

/**
 * Helper untuk mengambil IP Address dari headers Next.js
 */
export function getClientIp(headersList: Headers): string {
  // IP bisa didapat dari x-forwarded-for (jika di belakang proxy seperti Nginx/Cloudflare)
  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = headersList.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  return 'unknown-ip';
}
