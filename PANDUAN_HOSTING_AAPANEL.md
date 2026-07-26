# 🚀 Panduan Hosting Website Desa Sukorame di aaPanel (Port 3027)

> **Proyek:** Website Desa Sukorame (Next.js 16 + Prisma + MySQL)  
> **Target:** VPS dengan aaPanel  
> **Port Aplikasi:** 3027  

---

## 📊 Analisis Kesiapan Proyek

Proyek ini **sangat siap** untuk dihosting di VPS menggunakan aaPanel karena:
1. **Standalone Build:** Proyek ini sudah dikonfigurasi dengan `output: 'standalone'` di `next.config.ts`. Ini berarti hasil build Next.js akan sangat ringan dan tidak memerlukan seluruh file `node_modules` untuk berjalan.
2. **Fleksibilitas Port:** Next.js standalone menggunakan environment variable `PORT` untuk menentukan port server. Oleh karena itu, mengubah port ke `3027` sangat mudah hanya dengan konfigurasi `.env`.
3. **Database MySQL:** aaPanel memiliki dukungan manajemen MySQL bawaan yang sangat baik, yang mana 100% kompatibel dengan Prisma ORM yang digunakan di proyek ini. Tidak ada hardcoding port 3000 pada inti sistem aplikasi ini.

---

## DAFTAR ISI

1. [Persiapan di aaPanel](#1-persiapan-di-aapanel)
2. [Setup Database MySQL](#2-setup-database-mysql)
3. [Build & Persiapan File (Lokal)](#3-build--persiapan-file-lokal)
4. [Upload File ke VPS](#4-upload-file-ke-vps)
5. [Konfigurasi Environment (.env)](#5-konfigurasi-environment-env)
6. [Deploy sebagai Node Project di aaPanel](#6-deploy-sebagai-node-project-di-aapanel)
7. [Menjalankan Prisma Migration (Wajib)](#7-menjalankan-prisma-migration-wajib)
8. [Setup SSL (HTTPS)](#8-setup-ssl-https)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Persiapan di aaPanel

Pastikan Anda sudah menginstal aplikasi berikut dari menu **App Store** di aaPanel:
- **Nginx** (Web server & Reverse Proxy)
- **MySQL** (Minimal versi 5.7 atau 8.0)
- **Node.js version manager** (Untuk mengelola versi Node.js)
  > *Catatan: Setelah menginstal Node.js version manager, buka pengaturannya dan pastikan Anda sudah menginstal Node.js versi 18, 20, atau 22.*

---

## 2. Setup Database MySQL

1. Buka menu **Databases** di sidebar kiri aaPanel.
2. Klik tombol **Add database**.
3. Isi form berikut:
   - **DB Name:** `desasukorame` (atau sesuai keinginan)
   - **Username:** `desasukorame`
   - **Password:** (akan ter-generate otomatis, simpan password ini dengan aman)
   - **Permission:** `Local server`
4. Klik **Submit**.
5. Catat **DB Name**, **Username**, dan **Password** ini untuk diisikan ke file `.env` nanti.

---

## 3. Build & Persiapan File (Lokal)

Lakukan proses build di komputer lokal Anda terlebih dahulu agar VPS tidak kelebihan beban.

1. Buka terminal di folder proyek lokal Anda (di PC Anda).
2. Jalankan perintah build:
   ```bash
   npm install
   npx prisma generate
   npm run build
   ```
3. Setelah selesai, Next.js akan membuat folder `.next/standalone`.
4. **Langkah Sangat Penting:** Anda WAJIB menyalin folder `static` dan `public` ke dalam folder standalone. Jalankan perintah ini (jika pakai Windows PowerShell di PC Anda):
   ```powershell
   Copy-Item -Recurse ".next\static" ".next\standalone\.next\static"
   Copy-Item -Recurse "public" ".next\standalone\public"
   Copy-Item -Recurse "prisma" ".next\standalone\prisma"
   Copy-Item "package.json" ".next\standalone\package.json"
   ```
   *(Jika Anda menggunakan Mac/Linux):*
   ```bash
   cp -r .next/static .next/standalone/.next/static
   cp -r public .next/standalone/public
   cp -r prisma .next/standalone/prisma
   cp package.json .next/standalone/package.json
   ```

---

## 4. Upload File ke VPS

1. Di komputer lokal Anda, buka folder `.next/standalone`.
2. **Compress / Zip** SELURUH ISI dari folder `standalone` tersebut (bukan foldernya, tapi isi di dalamnya) menjadi file `app.zip`.
3. Buka menu **Files** di aaPanel.
4. Masuk ke direktori web root, biasanya `/www/wwwroot/`.
5. Buat folder baru, misalnya `sukorame`. Masuk ke folder `/www/wwwroot/sukorame`.
6. Klik tombol **Upload**, pilih file `app.zip` dari komputer Anda, lalu upload.
7. Setelah selesai, klik kanan pada file `app.zip` dan pilih **Unzip**.

Struktur file di `/www/wwwroot/sukorame` sekarang seharusnya seperti ini:
```text
/www/wwwroot/sukorame/
 ├── .next/
 ├── node_modules/
 ├── prisma/
 ├── public/
 ├── package.json
 └── server.js
```

---

## 5. Konfigurasi Environment (.env)

1. Di menu **Files** aaPanel (di dalam folder `/www/wwwroot/sukorame`), buat file baru dengan nama `.env`.
2. Klik ganda file `.env` untuk mengeditnya, lalu masukkan konfigurasi berikut:

```env
# Database MySQL di aaPanel (Sesuaikan Username, Password, dan DB Name)
DATABASE_URL="mysql://desasukorame:PASSWORD_DATABASE_ANDA@localhost:3306/desasukorame"

# Auth Secret (Ganti dengan string acak yang kuat)
AUTH_SECRET="GANTI_DENGAN_RANDOM_STRING_32_KARAKTER_YANG_KUAT"

# Supabase Storage (Sesuai dengan akun Supabase Anda)
SUPABASE_URL="https://uoibjwlbyieaqextbrky.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="kunci_supabase_anda_disini"

# URL Publik Website
NEXT_PUBLIC_SITE_URL="https://domainanda.com"

# Konfigurasi Port
PORT=3027
HOSTNAME="127.0.0.1"
```

3. Klik **Save**.

---

## 6. Deploy sebagai Node Project di aaPanel

Di sinilah kita memastikan aplikasi berjalan di port **3027**.

1. Buka menu **Website** di sidebar kiri.
2. Pilih tab **Node project** (di sebelah atas).
3. Klik tombol **Add Node project**.
4. Isi konfigurasi sebagai berikut:
   - **Project directory:** `/www/wwwroot/sukorame` (Pilih menggunakan ikon folder)
   - **Run Command:** `Custom command`
     - Isi di kolom sebelahnya: `node server.js`
   - **Project name:** `desa-sukorame`
   - **Node version:** (Pilih versi v18 atau v20 yang sudah Anda instal)
   - **Project port:** `3027` (Pastikan mengisi **3027** di sini)
   - **Domain:** Masukkan domain web Anda, contoh: `sukorame.desa.id`
   - **Remark:** (Opsional)
5. Klik **Submit**.
   
> **Bagaimana sistem port bekerja?**  
> aaPanel akan menjalankan aplikasi `server.js` Anda menggunakan Node.js dan menginject variabel `PORT=3027`. Kemudian, aaPanel akan secara otomatis membuatkan konfigurasi proxy di Nginx sehingga ketika pengunjung membuka domain web Anda dari port biasa (HTTP 80 / HTTPS 443), Nginx akan mengarahkan request tersebut secara gaib ke port `3027` di dalam server (Reverse Proxy).

---

## 7. Menjalankan Prisma Migration (Wajib)

Karena ini deploy baru, tabel database MySQL belum dibuat.

1. Buka menu **Terminal** di aaPanel (di sidebar kiri).
2. Masuk ke folder proyek Anda:
   ```bash
   cd /www/wwwroot/sukorame
   ```
3. Install package Prisma secara lokal:
   ```bash
   npm install prisma
   ```
4. Jalankan perintah migrasi Prisma untuk membuat tabel ke database:
   ```bash
   npx prisma db push
   ```
5. (Opsional) Jalankan file seed jika Anda butuh data default (seperti akun Admin pertama):
   ```bash
   npx prisma db seed
   ```
6. Setelah selesai dan sukses, **Restart** Node project Anda dari menu **Website -> Node project**.

---

## 8. Setup SSL (HTTPS)

1. Buka menu **Website** -> tab **Node project**.
2. Di baris proyek `desa-sukorame`, klik tulisan **Not set** pada kolom SSL.
3. Di tab **Let's Encrypt**, centang domain Anda dan klik **Apply**.
4. Tunggu beberapa saat, aaPanel akan memvalidasi dan memasang sertifikat SSL secara gratis.
5. Setelah berhasil, aktifkan opsi **Force HTTPS** (di pojok kanan atas pengaturan SSL) agar pengunjung dipaksa menggunakan koneksi aman (Gembok hijau).

---

## 9. Troubleshooting

- **Web Error 502 Bad Gateway:** 
  Berarti Nginx gagal menyambung ke port `3027`. Periksa apakah node benar-benar berjalan. Anda bisa mengecek **Project Log** di menu Node Project di aaPanel.
- **Project tidak mau menyala (Status: Stopped):**
  Cek **Project Log** untuk melihat pesan error. Biasanya masalahnya adalah kesalahan format/penulisan di file `.env` atau Node.js belum dikonfigurasi dengan benar.
- **Upload / Gambar tidak muncul (Error 404):**
  Ini terjadi jika Anda lupa menyalin folder `.next/static` dan `public` ke dalam folder standalone di Langkah 3 sebelum meng-compress nya.
- **Port 3027 sudah dipakai?**
  Jika Anda mendapatkan error bahwa port 3027 sedang digunakan, pastikan tidak ada service Node atau PM2 lain yang sedang menguasai port tersebut di VPS Anda.
