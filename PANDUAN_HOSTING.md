# 🚀 Panduan Hosting Website Desa Sukorame di cPanel
### Step-by-Step Lengkap & Detail

> **Proyek:** Website Desa Sukorame (Next.js 16 + Prisma + MySQL)  
> **Target:** Hosting di cPanel dengan fitur **Setup Node.js App**

---

## DAFTAR ISI

1. [Persyaratan Hosting cPanel](#1-persyaratan-hosting-cpanel)
2. [Persiapan Project (Lokal)](#2-persiapan-project-lokal)
3. [Build Production di Lokal](#3-build-production-di-lokal)
4. [Setup Database MySQL di cPanel](#4-setup-database-mysql-di-cpanel)
5. [Upload File ke Server](#5-upload-file-ke-server)
6. [Setup Node.js App di cPanel](#6-setup-nodejs-app-di-cpanel)
7. [Konfigurasi Environment Variables](#7-konfigurasi-environment-variables)
8. [Menjalankan Prisma Migration & Seeder](#8-menjalankan-prisma-migration--seeder)
9. [Setup Domain & SSL](#9-setup-domain--ssl)
10. [Verifikasi & Testing](#10-verifikasi--testing)
11. [Maintenance & Update](#11-maintenance--update)
12. [Troubleshooting](#12-troubleshooting)
13. [Alternatif Hosting (Jika cPanel Tidak Support)](#13-alternatif-hosting-jika-cpanel-tidak-support)

---

## 1. Persyaratan Hosting cPanel

> [!IMPORTANT]
> **Website ini adalah aplikasi Next.js (Node.js)**, bukan website PHP biasa. cPanel Anda **WAJIB** memiliki fitur **"Setup Node.js App"** atau akses **Terminal/SSH**. Tidak semua paket hosting cPanel mendukung ini!

### 1.1 Cek Sebelum Membeli Hosting

| Persyaratan | Minimal | Rekomendasi |
|---|---|---|
| **Node.js Support** | ✅ Wajib ada (fitur "Setup Node.js App") | Node.js 18+ |
| **Node.js Version** | v18.x | v20.x atau v22.x |
| **RAM** | 512 MB | 1 GB+ |
| **Storage** | 1 GB | 2 GB+ |
| **MySQL** | ✅ Wajib ada | MySQL 8.0+ |
| **SSH Access** | ✅ Sangat disarankan | Untuk install dependencies & migrasi |
| **SSL/HTTPS** | ✅ Wajib | Let's Encrypt (gratis) |

### 1.2 Provider Hosting Indonesia yang Support Node.js di cPanel

| Provider | Paket yang Cocok | Harga Mulai |
|---|---|---|
| **Niagahoster** | Paket "Cloud Hosting" atau "VPS" | ~Rp 50.000/bulan |
| **IDCloudHost** | Paket "Cloud VPS" | ~Rp 40.000/bulan |
| **Dewaweb** | Paket "Cloud Hosting" | ~Rp 50.000/bulan |
| **Domainesia** | Paket "Cloud Hosting" | ~Rp 36.000/bulan |
| **Rumahweb** | Paket yang support Node.js | ~Rp 45.000/bulan |

> [!WARNING]
> **Shared Hosting biasa (murah, ~Rp 10-20rb/bulan) biasanya TIDAK support Node.js!**  
> Pastikan bertanya ke support hosting: *"Apakah paket ini mendukung Setup Node.js App di cPanel?"*

### 1.3 Cara Cek Fitur Node.js di cPanel

1. Login ke cPanel Anda.
2. Cari di kolom pencarian: ketik **"Node"** atau **"Node.js"**.
3. Jika muncul ikon **"Setup Node.js App"** → ✅ Hosting Anda mendukung!
4. Jika tidak ada → ❌ Anda perlu upgrade paket atau pindah provider.

---

## 2. Persiapan Project (Lokal)

### 2.1 Tambahkan Output Standalone di `next.config.ts`

Mode **standalone** membuat Next.js menghasilkan build yang **self-contained** (sudah termasuk semua dependensi yang dibutuhkan), sehingga ukuran folder yang diupload jauh lebih kecil.

Buka file `next.config.ts` dan tambahkan `output: 'standalone'`:

```diff
 const nextConfig: NextConfig = {
+  output: 'standalone',
   images: {
     unoptimized: true,
     remotePatterns: [
```

**File lengkap setelah perubahan:**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "uoibjwlbyieaqextbrky.supabase.co" },
      { protocol: "https", hostname: "static.promediateknologi.id" },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
```

### 2.2 Buat File `.env.production`

Buat file `.env.production` di root project dengan konfigurasi **production**:

```env
# Database MySQL di cPanel
# Format: mysql://USER:PASSWORD@HOST:PORT/NAMA_DATABASE
DATABASE_URL="mysql://cpaneluser_dbuser:PasswordKuat123!@localhost:3306/cpaneluser_desasukorame"

# Auth Secret (WAJIB diganti dengan nilai random yang kuat!)
# Generate: openssl rand -base64 32
AUTH_SECRET="GANTI_DENGAN_RANDOM_STRING_YANG_PANJANG_DAN_KUAT"

# Supabase Storage
SUPABASE_URL="https://uoibjwlbyieaqextbrky.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs..."

# URL Publik Website
NEXT_PUBLIC_SITE_URL="https://sukorame.web.id"
```

> [!CAUTION]
> **JANGAN** upload file `.env` atau `.env.production` ke GitHub! File ini berisi kredensial sensitif. Pastikan sudah ada di `.gitignore`.

---

## 3. Build Production di Lokal

### 3.1 Langkah Build

Buka terminal di folder project dan jalankan:

```bash
# 1. Pastikan semua dependency terinstall
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Build production
npm run build
```

### 3.2 Hasil Build (Standalone)

Setelah build selesai, folder `.next/standalone` akan berisi:

```
.next/
├── standalone/          ← 📦 INI yang akan diupload
│   ├── node_modules/    ← Dependensi minimal (sudah di-tree-shake)
│   ├── .next/           ← Build output
│   ├── server.js        ← Entry point server
│   ├── package.json
│   └── ...
└── static/              ← 📦 Asset statis (CSS, JS, gambar)
```

### 3.3 Siapkan Folder untuk Upload

Setelah build berhasil, siapkan struktur folder yang akan diupload:

```bash
# 1. Salin folder static ke dalam standalone
# (Wajib! Karena standalone tidak menyertakan static files)

# Windows (PowerShell):
Copy-Item -Recurse ".next\static" ".next\standalone\.next\static"

# Linux/Mac:
cp -r .next/static .next/standalone/.next/static
```

```bash
# 2. Salin folder public ke dalam standalone
# (Untuk favicon, gambar, dll)

# Windows (PowerShell):
Copy-Item -Recurse "public" ".next\standalone\public"

# Linux/Mac:
cp -r public .next/standalone/public
```

```bash
# 3. Salin file Prisma schema (dibutuhkan oleh Prisma Client)

# Windows (PowerShell):
Copy-Item -Recurse "prisma" ".next\standalone\prisma"

# Linux/Mac:
cp -r prisma .next/standalone/prisma
```

### 3.4 Struktur Final yang Siap Upload

```
.next/standalone/           ← Upload SELURUH isi folder ini
├── .next/
│   ├── server/
│   └── static/             ← (hasil copy dari langkah 3.3)
├── node_modules/
├── prisma/
│   └── schema.prisma
├── public/                 ← (hasil copy dari langkah 3.3)
│   ├── assets/
│   ├── favicon.svg
│   └── icons.svg
├── server.js               ← Entry point utama
├── package.json
└── .env                    ← (akan dibuat di server, JANGAN upload dari lokal)
```

---

## 4. Setup Database MySQL di cPanel

### 4.1 Buat Database Baru

1. Login ke **cPanel**.
2. Cari dan klik **"MySQL® Databases"** (atau "MySQL Databases").
3. Di bagian **"Create New Database"**:
   - Ketik nama database: `desasukorame`
   - Klik **"Create Database"**
   - Nama lengkap akan menjadi: `cpaneluser_desasukorame` (prefix otomatis dari cPanel)

### 4.2 Buat User Database

1. Masih di halaman yang sama, scroll ke **"MySQL Users" → "Add New User"**:
   - Username: `dbuser`  
   - Password: Buat password yang **kuat** (gunakan password generator cPanel)
   - Klik **"Create User"**
   - Nama lengkap akan menjadi: `cpaneluser_dbuser`

### 4.3 Hubungkan User ke Database

1. Scroll ke **"Add User To Database"**:
   - Pilih User: `cpaneluser_dbuser`
   - Pilih Database: `cpaneluser_desasukorame`
   - Klik **"Add"**
2. Di halaman privileges, centang **"ALL PRIVILEGES"** → klik **"Make Changes"**

### 4.4 Catat Informasi Database

Catat informasi berikut (akan dibutuhkan untuk `.env`):

```
Host:     localhost
Port:     3306
Database: cpaneluser_desasukorame
Username: cpaneluser_dbuser
Password: [password yang Anda buat]

DATABASE_URL: mysql://cpaneluser_dbuser:PASSWORD@localhost:3306/cpaneluser_desasukorame
```

---

## 5. Upload File ke Server

Ada **3 cara** untuk mengupload file ke cPanel:

### Cara 1: File Manager cPanel (Paling Mudah, Tapi Lambat)

1. Login cPanel → buka **"File Manager"**.
2. Navigasi ke folder tujuan (misal: `/home/cpaneluser/sukorame/` atau sesuai App Root di langkah 6).
3. Klik **"Upload"** di toolbar.
4. **Compress** folder `.next/standalone/` menjadi `.zip` terlebih dahulu di komputer lokal.
5. Upload file `.zip` tersebut.
6. Setelah upload selesai, klik kanan file `.zip` → **"Extract"**.

> [!WARNING]
> **Batas upload File Manager biasanya 200 MB.** Jika file standalone lebih besar, gunakan Cara 2 atau 3.

### Cara 2: FTP/SFTP (Rekomendasi untuk File Besar)

1. Di cPanel, buka **"FTP Accounts"** → buat akun FTP baru (atau gunakan akun utama).
2. Download & install **FileZilla** (gratis) di komputer Anda.
3. Hubungkan FileZilla ke server:
   - Host: `ftp.domainanda.com` atau IP server
   - Username: username FTP
   - Password: password FTP
   - Port: `21` (FTP) atau `22` (SFTP)
4. Di panel kiri (lokal): navigasi ke folder `.next/standalone/`
5. Di panel kanan (server): navigasi ke folder tujuan (misal `/home/cpaneluser/sukorame/`)
6. Drag & drop semua file dari kiri ke kanan.

### Cara 3: SSH + Git (Paling Cepat & Profesional)

Jika hosting mendukung SSH:

```bash
# 1. Login SSH ke server
ssh cpaneluser@domainanda.com

# 2. Masuk ke direktori home
cd ~

# 3. Clone repository
git clone https://github.com/fahrypratama17/website-desa-sukorame.git sukorame

# 4. Masuk ke folder project
cd sukorame

# 5. Install dependencies
npm install

# 6. Generate Prisma Client
npx prisma generate

# 7. Build production
npm run build

# 8. Copy static files
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r prisma .next/standalone/prisma
```

> [!TIP]
> **Cara 3 (SSH + Git)** adalah cara paling efisien karena Anda tidak perlu upload file besar. Semua proses build dilakukan langsung di server.

---

## 6. Setup Node.js App di cPanel

### 6.1 Buka Fitur Setup Node.js App

1. Login ke **cPanel**.
2. Di kolom pencarian, ketik **"Node"**.
3. Klik **"Setup Node.js App"**.

### 6.2 Buat Aplikasi Baru

Klik tombol **"+ Create Application"** dan isi form:

| Field | Nilai | Keterangan |
|---|---|---|
| **Node.js version** | `20.x` atau `22.x` | Pilih versi terbaru yang tersedia |
| **Application mode** | `Production` | Wajib Production! |
| **Application root** | `sukorame` | Path folder relatif dari `/home/cpaneluser/` |
| **Application URL** | `sukorame.web.id` | Domain yang akan digunakan |
| **Application startup file** | `server.js` | Entry point Next.js standalone |

> [!IMPORTANT]
> **Application root** harus mengarah ke folder yang berisi `server.js`.
> 
> - Jika Anda upload isi folder `standalone` langsung ke `/home/cpaneluser/sukorame/`, maka root-nya adalah `sukorame`.
> - Jika Anda menggunakan SSH + Git (Cara 3), root-nya adalah `sukorame/.next/standalone`.

### 6.3 Klik "Create" → Catat Virtual Environment Path

Setelah aplikasi dibuat, cPanel akan menampilkan **virtual environment path**. Catat ini, misalnya:

```
/home/cpaneluser/nodevenv/sukorame/20/bin/activate
```

Path ini penting untuk menjalankan perintah Node.js via SSH.

### 6.4 Install Dependencies (Jika Upload Manual)

Jika Anda menggunakan **standalone build** (Cara 1 atau 2), dependensi sudah termasuk di dalam folder `node_modules` dan Anda bisa **skip langkah ini**.

Jika Anda menggunakan **SSH + Git** (Cara 3), Anda perlu install dependencies. Di halaman Setup Node.js App:

1. Klik tombol **"Run NPM Install"**
   
   Atau via SSH:
   ```bash
   # Aktifkan virtual environment Node.js
   source /home/cpaneluser/nodevenv/sukorame/20/bin/activate
   
   # Install dependencies
   cd ~/sukorame
   npm install --production
   ```

---

## 7. Konfigurasi Environment Variables

### 7.1 Cara 1: Via cPanel UI (Setup Node.js App)

Di halaman **Setup Node.js App**, scroll ke bagian **"Environment variables"**:

Klik **"Add Variable"** untuk setiap variabel berikut:

| Name | Value |
|---|---|
| `DATABASE_URL` | `mysql://cpaneluser_dbuser:PASSWORD@localhost:3306/cpaneluser_desasukorame` |
| `AUTH_SECRET` | `(string random yang kuat, min 32 karakter)` |
| `SUPABASE_URL` | `https://uoibjwlbyieaqextbrky.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIs...` (key dari Supabase) |
| `NEXT_PUBLIC_SITE_URL` | `https://sukorame.web.id` |
| `PORT` | `3000` (atau port yang diberikan cPanel) |
| `NODE_ENV` | `production` |
| `HOSTNAME` | `0.0.0.0` |

Klik **"Save"** setelah menambahkan semua variabel.

### 7.2 Cara 2: Buat File `.env` Langsung di Server

Via **File Manager** atau **SSH**, buat file `.env` di folder **Application root**:

```bash
# Via SSH
cd ~/sukorame  # atau ~/sukorame/.next/standalone
nano .env
```

Isi file `.env`:

```env
DATABASE_URL="mysql://cpaneluser_dbuser:PASSWORD@localhost:3306/cpaneluser_desasukorame"
AUTH_SECRET="GANTI_DENGAN_RANDOM_STRING_32_KARAKTER"
SUPABASE_URL="https://uoibjwlbyieaqextbrky.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs..."
NEXT_PUBLIC_SITE_URL="https://sukorame.web.id"
PORT=3000
HOSTNAME="0.0.0.0"
```

Simpan dengan `Ctrl+O` → `Enter` → `Ctrl+X`.

> [!TIP]
> Untuk generate `AUTH_SECRET` yang aman, jalankan di terminal:
> ```bash
> openssl rand -base64 32
> ```
> Atau kunjungi: https://generate-secret.vercel.app/32

---

## 8. Menjalankan Prisma Migration & Seeder

### 8.1 Via SSH (Rekomendasi)

```bash
# 1. Aktifkan virtual environment Node.js
source /home/cpaneluser/nodevenv/sukorame/20/bin/activate

# 2. Masuk ke folder project
cd ~/sukorame

# 3. Jalankan migrasi database (membuat tabel-tabel)
npx prisma db push

# 4. (Opsional) Jalankan seeder untuk mengisi data awal
npx prisma db seed
```

### 8.2 Via cPanel Terminal

Jika SSH tidak tersedia, cPanel biasanya punya **Terminal** bawaan:

1. Login cPanel → cari **"Terminal"** → klik buka.
2. Jalankan perintah yang sama seperti di atas.

### 8.3 Verifikasi Database

Setelah migrasi selesai, verifikasi di **phpMyAdmin** (cPanel):

1. Login cPanel → klik **"phpMyAdmin"**.
2. Pilih database `cpaneluser_desasukorame` di panel kiri.
3. Pastikan tabel-tabel berikut sudah ada:

```
✅ users
✅ accounts
✅ sessions
✅ verification_tokens
✅ berita
✅ program
✅ perangkat
✅ lembaga
✅ misi
✅ nilai_utama
✅ settings
✅ audit_logs
```

4. Jika Anda menjalankan seeder, cek tabel `users` — harus ada 1 row admin:
   - Email: `admin@sukorame.desa.id`

---

## 9. Setup Domain & SSL

### 9.1 Pointing Domain ke Hosting

Jika domain `sukorame.web.id` belum diarahkan ke hosting:

1. Login ke **panel DNS** penyedia domain Anda (Niagahoster, IDCloudHost, Namecheap, dll).
2. Tambahkan/edit DNS record:

| Tipe | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `IP_SERVER_HOSTING` | 3600 |
| `A` | `www` | `IP_SERVER_HOSTING` | 3600 |
| `CNAME` | `www` | `sukorame.web.id` | 3600 |

3. Tunggu propagasi DNS (biasanya 5 menit - 24 jam).

### 9.2 Setup SSL (HTTPS)

1. Login cPanel → cari **"SSL/TLS"** atau **"Let's Encrypt"**.
2. Jika ada **"Let's Encrypt™ SSL"** atau **"AutoSSL"**:
   - Pilih domain `sukorame.web.id`
   - Klik **"Issue"** atau **"Install"**
   - SSL gratis akan otomatis terpasang dan di-renew
3. Jika menggunakan **"SSL/TLS Status"**:
   - Klik **"Run AutoSSL"**
   - Tunggu proses selesai

### 9.3 Force HTTPS Redirect

Tambahkan di file `.htaccess` (di folder `public_html` atau root domain):

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 10. Verifikasi & Testing

### 10.1 Start Aplikasi

Di halaman **Setup Node.js App** di cPanel:

1. Klik tombol **"Restart"** (atau **"Start"** jika baru pertama kali).
2. Tunggu beberapa detik hingga status berubah menjadi **"Running"**.

### 10.2 Cek Website

Buka browser dan akses:

| URL | Yang Harus Muncul |
|---|---|
| `https://sukorame.web.id` | Halaman beranda dengan hero banner |
| `https://sukorame.web.id/profil/profil-desa` | Halaman profil desa |
| `https://sukorame.web.id/admin/login` | Halaman login admin |
| `https://sukorame.web.id/berita` | Daftar berita |

### 10.3 Test Login Admin

1. Buka `https://sukorame.web.id/admin/login`
2. Masukkan:
   - Email: `admin@sukorame.desa.id`
   - Password: `Admin@Sukorame2026!`
3. Jika berhasil → Anda akan masuk ke Dashboard
4. **Segera ganti password!** (Pengaturan → Keamanan Akun)

### 10.4 Test Upload Gambar

1. Login admin → Kelola Berita → Tulis Berita Baru
2. Coba upload gambar thumbnail
3. Jika berhasil → koneksi Supabase Storage berjalan ✅
4. Jika gagal → cek environment variable `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY`

---

## 11. Maintenance & Update

### 11.1 Cara Update Website (Deploy Ulang)

Jika ada perubahan kode di komputer lokal:

**Metode A: SSH + Git Pull**

```bash
# 1. Login SSH
ssh cpaneluser@domainanda.com

# 2. Aktifkan Node.js env
source /home/cpaneluser/nodevenv/sukorame/20/bin/activate

# 3. Masuk folder project
cd ~/sukorame

# 4. Pull kode terbaru
git pull origin main

# 5. Install dependencies baru (jika ada)
npm install

# 6. Generate Prisma Client (jika schema berubah)
npx prisma generate

# 7. Migrasi database (jika ada perubahan tabel)
npx prisma db push

# 8. Build ulang
npm run build

# 9. Copy static files
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r prisma .next/standalone/prisma

# 10. Restart app
# (Lakukan via cPanel → Setup Node.js App → Restart)
```

**Metode B: Upload Manual**

1. Build di lokal (`npm run build`)
2. Copy static & public ke standalone (seperti langkah 3.3)
3. Compress folder standalone → `.zip`
4. Upload via File Manager → Extract → Replace file lama
5. Restart app di cPanel

### 11.2 Monitoring

- **Log Error:** Cek di cPanel → **"Errors"** atau file `stderr.log` di folder app
- **Database:** Buka **phpMyAdmin** untuk cek data langsung
- **Audit Log:** Login admin → Log Audit Aktivitas

---

## 12. Troubleshooting

### 12.1 Masalah Umum & Solusi

| Masalah | Penyebab | Solusi |
|---|---|---|
| **Error 503 / Application Error** | App crash atau belum start | Cek log error, restart app di cPanel |
| **Error 502 Bad Gateway** | Port konflik atau app belum siap | Pastikan `PORT` env var sesuai, restart app |
| **"Cannot find module..."** | Dependensi tidak lengkap | Jalankan `npm install` ulang |
| **Database connection refused** | DATABASE_URL salah | Cek format URL, username, password, nama database |
| **"Access denied for user..."** | User belum punya privilege | Buka MySQL Databases → Add User to DB → ALL PRIVILEGES |
| **Prisma error "Table not found"** | Migrasi belum dijalankan | Jalankan `npx prisma db push` |
| **Upload gambar gagal** | Supabase key salah/expired | Cek SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY |
| **Halaman blank / 404** | Static files tidak ter-copy | Copy ulang `.next/static` dan `public` ke folder standalone |
| **CSS/styling rusak** | Static files tidak ter-copy | Sama seperti di atas |
| **Login redirect loop** | AUTH_SECRET berubah | Pastikan AUTH_SECRET konsisten, clear cookies browser |
| **"ERR_SSL_PROTOCOL_ERROR"** | SSL belum terpasang | Setup SSL via Let's Encrypt di cPanel |
| **Website lambat** | RAM kurang atau build belum dioptimasi | Upgrade paket hosting, pastikan `NODE_ENV=production` |

### 12.2 Cara Melihat Error Log

**Via SSH:**
```bash
# Lihat log error
cat ~/sukorame/stderr.log

# Atau lihat log real-time
tail -f ~/sukorame/stderr.log
```

**Via cPanel:**
1. Buka **"Errors"** di cPanel
2. Atau buka **File Manager** → navigasi ke folder app → cari file `stderr.log`

### 12.3 Restart Aplikasi

Jika website bermasalah, selalu coba **restart** dulu:

1. Login cPanel → **"Setup Node.js App"**
2. Temukan aplikasi Anda
3. Klik **"Stop"** → tunggu 5 detik → klik **"Start"**

Atau via SSH:
```bash
# Cara manual restart via SSH
source /home/cpaneluser/nodevenv/sukorame/20/bin/activate
cd ~/sukorame
# Matikan proses lama
pkill -f "node server.js"
# Jalankan ulang
node server.js &
```

---

## 13. Alternatif Hosting (Jika cPanel Tidak Support)

Jika cPanel hosting Anda **tidak mendukung Node.js**, berikut alternatif yang lebih cocok:

### 13.1 Vercel (Paling Mudah — Gratis!)

| Kelebihan | Kekurangan |
|---|---|
| ✅ Gratis untuk project kecil | ❌ Database harus external |
| ✅ Deploy otomatis dari GitHub | ❌ Server di luar Indonesia (latency) |
| ✅ SSL otomatis | ❌ Bandwidth terbatas di tier gratis |
| ✅ Zero config untuk Next.js | |

**Langkah:**
1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com) → login dengan GitHub
3. Klik **"Import Project"** → pilih repo
4. Tambahkan Environment Variables
5. Klik **"Deploy"** → selesai!

### 13.2 VPS (Virtual Private Server) — Rekomendasi untuk Production

| Provider | Harga Mulai | Lokasi Server |
|---|---|---|
| **IDCloudHost** | Rp 40.000/bulan | 🇮🇩 Indonesia |
| **DigitalOcean** | $4/bulan (~Rp 65.000) | Singapura |
| **Biznet Gio** | Rp 50.000/bulan | 🇮🇩 Indonesia |
| **Niagahoster VPS** | Rp 52.000/bulan | 🇮🇩 Indonesia |

**Langkah deploy di VPS:**

```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Install MySQL
sudo apt install -y mysql-server
sudo mysql_secure_installation

# 3. Setup database
sudo mysql -u root -p
> CREATE DATABASE desa_sukorame;
> CREATE USER 'desaadmin'@'localhost' IDENTIFIED BY 'PasswordKuat!';
> GRANT ALL PRIVILEGES ON desa_sukorame.* TO 'desaadmin'@'localhost';
> FLUSH PRIVILEGES;
> EXIT;

# 4. Clone & build project
git clone https://github.com/fahrypratama17/website-desa-sukorame.git
cd website-desa-sukorame
npm install
npx prisma generate
npm run build

# 5. Setup standalone
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r prisma .next/standalone/prisma

# 6. Buat .env di .next/standalone/
nano .next/standalone/.env

# 7. Jalankan migrasi
cd .next/standalone
npx prisma db push
npx prisma db seed

# 8. Install PM2 (process manager)
sudo npm install -g pm2

# 9. Jalankan dengan PM2
cd .next/standalone
PORT=3000 HOSTNAME=0.0.0.0 pm2 start server.js --name "desa-sukorame"
pm2 save
pm2 startup

# 10. Install Nginx sebagai reverse proxy
sudo apt install -y nginx
```

**Konfigurasi Nginx** (`/etc/nginx/sites-available/sukorame`):

```nginx
server {
    listen 80;
    server_name sukorame.web.id www.sukorame.web.id;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Aktifkan config & SSL
sudo ln -s /etc/nginx/sites-available/sukorame /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d sukorame.web.id -d www.sukorame.web.id
```

### 13.3 Railway.app (Mudah, Cocok untuk Prototype)

| Kelebihan | Kekurangan |
|---|---|
| ✅ Deploy dari GitHub 1-klik | ❌ Berbayar setelah trial |
| ✅ MySQL built-in | ❌ Server di luar Indonesia |
| ✅ Environment variables via UI | |

---

## 📋 Ringkasan Checklist Deploy

Gunakan checklist ini untuk memastikan semua langkah sudah dilakukan:

```
□ 1. Tambahkan output: 'standalone' di next.config.ts
□ 2. Build production: npm run build
□ 3. Copy .next/static → .next/standalone/.next/static
□ 4. Copy public → .next/standalone/public
□ 5. Copy prisma → .next/standalone/prisma
□ 6. Buat database MySQL di cPanel
□ 7. Buat user database & assign ALL PRIVILEGES
□ 8. Upload file ke server (standalone folder)
□ 9. Setup Node.js App di cPanel (startup: server.js)
□ 10. Konfigurasi environment variables
□ 11. Jalankan: npx prisma db push
□ 12. Jalankan: npx prisma db seed (untuk data awal)
□ 13. Setup domain DNS → pointing ke server
□ 14. Pasang SSL (Let's Encrypt)
□ 15. Start/Restart aplikasi
□ 16. Test halaman publik
□ 17. Test login admin
□ 18. Test upload gambar
□ 19. GANTI PASSWORD DEFAULT!
```

---

*Panduan ini disusun khusus untuk proyek Website Desa Sukorame (Next.js 16 Standalone + Prisma + MySQL) — Juli 2026.*
