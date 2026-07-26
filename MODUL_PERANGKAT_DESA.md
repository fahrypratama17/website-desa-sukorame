# 📘 MODUL PANDUAN PENGGUNAAN WEBSITE DESA SUKORAME
### Untuk Perangkat Desa — Panduan Lengkap & Detail

> **Versi Dokumen:** 1.0 — Juli 2026  
> **Disusun untuk:** Perangkat Desa Sukorame, Kec. Binangun, Kab. Blitar  
> **Sistem:** Website Desa Sukorame (CMS Panel Admin)  
> **URL Akses:** `https://sukorame.web.id` (publik) | `https://sukorame.web.id/admin` (panel admin)

---

## DAFTAR ISI

1. [Pendahuluan & Gambaran Umum Sistem](#1-pendahuluan--gambaran-umum-sistem)
2. [Arsitektur & Teknologi Website](#2-arsitektur--teknologi-website)
3. [Peta Halaman Website (Publik)](#3-peta-halaman-website-publik)
4. [Panduan Login ke Panel Admin](#4-panduan-login-ke-panel-admin)
5. [Dashboard — Pusat Kendali](#5-dashboard--pusat-kendali)
6. [Modul 1: Kelola Berita & Artikel](#6-modul-1-kelola-berita--artikel)
7. [Modul 2: Kelola Program Desa](#7-modul-2-kelola-program-desa)
8. [Modul 3: Kelola Perangkat Desa](#8-modul-3-kelola-perangkat-desa)
9. [Modul 4: Kelola Lembaga Desa](#9-modul-4-kelola-lembaga-desa)
10. [Modul 5: Pengaturan Global](#10-modul-5-pengaturan-global)
11. [Modul 6: Log Audit Aktivitas](#11-modul-6-log-audit-aktivitas)
12. [Modul 7: Keamanan Akun](#12-modul-7-keamanan-akun)
13. [Panduan Upload Gambar](#13-panduan-upload-gambar)
14. [Fitur Tempat Sampah (Trash)](#14-fitur-tempat-sampah-trash)
15. [Fitur Pencarian Website](#15-fitur-pencarian-website)
16. [Struktur Database](#16-struktur-database)
17. [Panduan Pemecahan Masalah (Troubleshooting)](#17-panduan-pemecahan-masalah-troubleshooting)
18. [Informasi Teknis untuk Developer](#18-informasi-teknis-untuk-developer)
19. [Lampiran: Kredensial Default](#19-lampiran-kredensial-default)

---

## 1. Pendahuluan & Gambaran Umum Sistem

### 1.1 Tujuan Website

Website Desa Sukorame adalah **pusat informasi dan pelayanan digital terpadu** yang dirancang untuk:

- 📢 **Transparansi informasi** — Masyarakat dapat mengakses berita, program, dan data desa secara terbuka.
- 🏛️ **Profil kelembagaan** — Menampilkan struktur pemerintahan, perangkat desa, dan lembaga desa.
- 📰 **Publikasi berita** — Menerbitkan berita, pengumuman, dan artikel kegiatan desa.
- 📊 **Data statistik** — Menampilkan demografi, geografis, dan potensi desa.
- 🗺️ **Peta interaktif** — Menunjukkan lokasi kantor desa di halaman kontak.
- 🔍 **Pencarian terpadu** — Fitur pencarian berita dan program secara cepat.

### 1.2 Siapa yang Menggunakan?

| Peran | Akses |
|---|---|
| **Masyarakat Umum** | Halaman publik website (membaca berita, melihat profil, dll) |
| **Administrator / Perangkat Desa** | Panel Admin CMS (membuat, mengedit, menghapus konten) |

### 1.3 Dua Sisi Website

Website ini memiliki **2 sisi utama**:

```mermaid
graph LR
    A["🌐 Website Publik<br/>(sukorame.web.id)"] --> B["Halaman Beranda"]
    A --> C["Profil Desa & Visi Misi"]
    A --> D["Potensi Desa"]
    A --> E["Perangkat & Lembaga"]
    A --> F["Berita & Program"]
    A --> G["Kontak & Peta"]
    
    H["🔒 Panel Admin CMS<br/>(sukorame.web.id/admin)"] --> I["Dashboard"]
    H --> J["Kelola Berita"]
    H --> K["Kelola Program"]
    H --> L["Kelola Perangkat"]
    H --> M["Kelola Lembaga"]
    H --> N["Pengaturan Global"]
    H --> O["Log Audit"]
```

---

## 2. Arsitektur & Teknologi Website

### 2.1 Teknologi yang Digunakan

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Framework React modern, full-stack |
| **Bahasa** | TypeScript | JavaScript dengan tipe data yang aman |
| **Styling** | Tailwind CSS v4 | Framework CSS untuk tampilan responsif |
| **Database** | MySQL (via Prisma ORM) | Penyimpanan data terstruktur |
| **Autentikasi** | NextAuth v5 (Auth.js) | Sistem login berbasis Credentials (email/password) |
| **Penyimpanan Gambar** | Supabase Storage | Cloud storage untuk upload foto/gambar |
| **Validasi Data** | Zod v4 | Validasi form di sisi server |
| **Editor Konten** | EasyMDE (Markdown) | Editor teks kaya untuk menulis berita |
| **Peta Interaktif** | MapLibre GL / React Map GL | Peta digital di halaman kontak |
| **Ikon** | React Icons (Feather + FontAwesome) | Kumpulan ikon untuk UI |

### 2.2 Arsitektur Folder Proyek

```
website-desa-sukorame/
├── prisma/                  # Skema database & seeder
│   ├── schema.prisma        # Definisi tabel database
│   └── seed.ts              # Data awal (seeder)
├── public/                  # File statis (favicon, gambar)
├── src/
│   ├── app/                 # Halaman & routing (Next.js App Router)
│   │   ├── admin/           # 🔒 Seluruh halaman admin
│   │   │   ├── login/       # Halaman login
│   │   │   └── (dashboard)/ # Halaman dashboard terproteksi
│   │   │       ├── dashboard/
│   │   │       ├── berita/
│   │   │       ├── program/
│   │   │       ├── perangkat/
│   │   │       ├── lembaga/
│   │   │       ├── pengaturan/
│   │   │       └── audit/
│   │   ├── berita/          # Halaman berita publik
│   │   ├── profil/          # Halaman profil publik
│   │   ├── potensi/         # Halaman potensi desa
│   │   ├── perangkat/       # Halaman perangkat desa publik
│   │   ├── lembaga/         # Halaman lembaga desa publik
│   │   ├── program/         # Halaman program desa publik
│   │   ├── kontak/          # Halaman kontak & peta
│   │   └── pencarian/       # Halaman hasil pencarian
│   ├── feature/             # Komponen fitur (dikelompokkan per modul)
│   │   ├── admin/           # Komponen & aksi admin
│   │   │   ├── actions/     # Server Actions (CRUD logic)
│   │   │   ├── components/  # Komponen UI admin
│   │   │   └── section/     # Section pages admin
│   │   ├── home/            # Komponen halaman beranda
│   │   ├── profil/          # Komponen halaman profil
│   │   ├── berita/          # Komponen halaman berita
│   │   ├── potensi/         # Komponen halaman potensi
│   │   ├── program/         # Komponen halaman program
│   │   ├── perangkat/       # Komponen halaman perangkat
│   │   ├── lembaga/         # Komponen halaman lembaga
│   │   ├── kontak/          # Komponen halaman kontak
│   │   └── visi-misi/       # Komponen halaman visi misi
│   ├── shared/              # Komponen yang dipakai bersama
│   │   └── components/
│   │       ├── Navbar.tsx    # Navigasi utama
│   │       ├── Footer.tsx    # Bagian footer
│   │       └── Pagination.tsx
│   └── lib/                 # Utilitas & konfigurasi
│       ├── prisma.ts        # Koneksi database
│       ├── settings.ts      # Pengambil pengaturan global
│       ├── validations.ts   # Validasi form (Zod schemas)
│       ├── audit.ts         # Sistem log audit
│       ├── auth-guard.ts    # Pelindung autentikasi
│       ├── rate-limit.ts    # Pembatas percobaan login
│       └── supabase.ts      # Koneksi penyimpanan gambar
```

### 2.3 Alur Kerja Sistem

```mermaid
flowchart TD
    A["Admin Login<br/>/admin/login"] -->|Berhasil| B["Dashboard<br/>/admin/dashboard"]
    B --> C["Kelola Konten"]
    C --> D["Berita / Program / Perangkat / Lembaga"]
    D -->|Submit Form| E["Server Action<br/>(Validasi + Simpan)"]
    E -->|Sukses| F["Data Tersimpan di MySQL"]
    F -->|Revalidate| G["Halaman Publik Otomatis Diperbarui"]
    E -->|Gagal| H["Tampilkan Pesan Error"]
    
    C --> I["Pengaturan Global"]
    I -->|Simpan| E
    
    E -->|Audit Log| J["Aktivitas Dicatat di tabel audit_logs"]
```

---

## 3. Peta Halaman Website (Publik)

Berikut adalah seluruh halaman yang dapat diakses oleh masyarakat umum:

| No | Halaman | URL | Deskripsi |
|---|---|---|---|
| 1 | **Beranda** | `/` | Landing page utama dengan hero banner, tentang desa, statistik, berita terbaru |
| 2 | **Profil Desa** | `/profil/profil-desa` | Sejarah, gambaran umum, dan deskripsi desa |
| 3 | **Visi & Misi** | `/profil/visi-misi` | Visi pembangunan, misi, dan nilai-nilai utama desa |
| 4 | **Potensi Desa** | `/potensi` | Potensi pertanian, peternakan, industri, dan wisata budaya |
| 5 | **Perangkat Desa** | `/perangkat` | Daftar dan profil perangkat desa (Kepala Desa, Sekdes, dll) |
| 6 | **Lembaga Desa** | `/lembaga` | Daftar lembaga (BPD, LPMD, PKK, Karang Taruna, dll) |
| 7 | **Program Desa** | `/program` | Daftar program pembangunan dan pemberdayaan desa |
| 8 | **Berita & Artikel** | `/berita` | Daftar berita dengan filter kategori |
| 9 | **Detail Berita** | `/berita/[slug]` | Halaman baca berita lengkap |
| 10 | **Kontak** | `/kontak` | Informasi kontak, alamat, sosial media, dan peta interaktif |
| 11 | **Pencarian** | `/pencarian?q=...` | Hasil pencarian berita dan program berdasarkan kata kunci |

### Menu Navigasi Website

```
Beranda
Profil ▾
  ├── Profil Desa
  └── Visi & Misi
Potensi
Struktur Organisasi ▾
  ├── Perangkat Desa
  └── Lembaga Desa
Publikasi ▾
  ├── Program Desa
  └── Berita & Artikel
Kontak
🔍 Pencarian
📍 Lokasi (Kec. Binangun, Blitar)
```

---

## 4. Panduan Login ke Panel Admin

### 4.1 Langkah-Langkah Login

1. Buka browser (Chrome, Firefox, Edge, dll).
2. Ketik alamat: **`https://sukorame.web.id/admin`** atau **`https://sukorame.web.id/admin/login`**
3. Anda akan melihat halaman login dengan form email dan password.
4. Masukkan:
   - **Email:** email admin yang terdaftar
   - **Password:** kata sandi yang sesuai
5. Klik tombol **"Masuk"**
6. Jika berhasil, Anda akan langsung diarahkan ke **Dashboard**.

> [!IMPORTANT]
> **Kredensial Default (Pertama Kali):**
> - Email: `admin@sukorame.desa.id`
> - Password: `Admin@Sukorame2026!`
> 
> ⚠️ **Segera ubah password setelah login pertama kali!** (Lihat [Modul 7: Keamanan Akun](#12-modul-7-keamanan-akun))

### 4.2 Sistem Keamanan Login

| Fitur Keamanan | Detail |
|---|---|
| **Autentikasi** | NextAuth v5 dengan strategi JWT (JSON Web Token) |
| **Enkripsi Password** | bcrypt dengan 12 salt rounds |
| **Route Protection** | Semua URL `/admin/*` (kecuali `/admin/login`) dilindungi middleware |
| **Rate Limiting** | Maksimal 3 kali percobaan ganti password per 15 menit per IP |
| **Redirect otomatis** | Jika belum login → diarahkan ke `/admin/login` |
| **Redirect setelah login** | Jika sudah login → diarahkan dari login ke `/admin/dashboard` |

---

## 5. Dashboard — Pusat Kendali

Setelah berhasil login, Anda akan melihat **Dashboard** sebagai halaman utama panel admin.

### 5.1 Komponen Dashboard

#### 📊 Statistik Ringkasan (4 Kartu)

Dashboard menampilkan **4 kartu statistik** di bagian atas:

| Kartu | Ikon | Keterangan |
|---|---|---|
| **Total Berita** | 📄 | Jumlah seluruh berita/artikel yang ada di database |
| **Total Program** | 💼 | Jumlah program desa yang terdaftar |
| **Jumlah Perangkat** | 👥 | Jumlah perangkat desa yang terdaftar |
| **Jumlah Lembaga** | 📦 | Jumlah lembaga desa yang terdaftar |

#### 🕐 Aktivitas Terakhir

Menampilkan daftar aktivitas terbaru yang dilakukan di panel admin, meliputi:
- Judul aktivitas (misalnya judul berita yang baru dibuat)
- Tipe aktivitas (Berita, Program, dll)
- Nama pengguna yang melakukan aksi
- Waktu aktivitas
- Tombol panah untuk langsung menuju item terkait

#### ⚡ Aksi Cepat

Tombol pintasan untuk aksi yang sering dilakukan:
- **Tulis Berita Baru** → langsung ke `/admin/berita/tambah`
- **Tambah Program** → langsung ke `/admin/program/tambah`
- **Pengaturan Website** → langsung ke `/admin/pengaturan`

### 5.2 Sidebar Navigasi Admin

Sidebar navigasi di sisi kiri berisi menu-menu berikut:

```
🏠 Dashboard
📄 Kelola Berita
💼 Kelola Program
👥 Kelola Perangkat
📦 Kelola Lembaga
⚙️ Pengaturan Global
📋 Log Audit Aktivitas
──────────────────
🚪 Logout (warna merah)
```

> [!TIP]
> Di perangkat **mobile/tablet**, sidebar akan otomatis tersembunyi. Klik ikon ☰ (hamburger menu) di header untuk membukanya.

---

## 6. Modul 1: Kelola Berita & Artikel

Menu: **Kelola Berita** (`/admin/berita`)

### 6.1 Gambaran Umum

Modul ini digunakan untuk **membuat, mengedit, menerbitkan, dan menghapus** berita/artikel desa. Berita yang diterbitkan akan tampil di halaman publik `/berita` dan bisa muncul di beranda sebagai "Berita Terbaru" (3 berita terakhir).

### 6.2 Fitur-Fitur

| Fitur | Keterangan |
|---|---|
| 📝 Tambah Berita Baru | Menulis berita dengan editor Markdown (EasyMDE) |
| ✏️ Edit Berita | Mengubah judul, konten, kategori, gambar, atau status |
| 🗑️ Hapus Berita (Soft Delete) | Memindahkan ke tempat sampah (masih bisa dipulihkan) |
| ♻️ Pulihkan Berita | Mengembalikan berita dari tempat sampah |
| 💀 Hapus Permanen (Hard Delete) | Menghapus dari database secara permanen (tidak bisa dikembalikan!) |
| 📋 Daftar Berita | Melihat seluruh berita dengan pagination dan pencarian |
| 🔍 Pencarian | Mencari berita berdasarkan judul |

### 6.3 Membuat Berita Baru

**Langkah-langkah:**

1. Klik menu **"Kelola Berita"** di sidebar.
2. Klik tombol **"+ Tulis Berita Baru"** di pojok kanan atas.
3. Isi form dengan data berikut:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Judul** | ✅ Ya | Minimal 5 karakter, maksimal 200 karakter |
| **Kategori** | ✅ Ya | Pilih salah satu: Pengumuman, Kegiatan, Pembangunan, Pemberdayaan, Lainnya |
| **Konten** | ✅ Ya | Tulis isi berita menggunakan editor Markdown (minimal 20 karakter) |
| **Gambar Thumbnail** | ❌ Opsional | Upload gambar utama berita (akan ditampilkan di daftar berita) |
| **Status** | ✅ Ya | `PUBLISHED` (langsung terbit) atau `DRAFT` (disimpan sebagai draf) |

4. Klik tombol **"Simpan & Terbitkan"**.
5. Berita akan otomatis muncul di halaman publik jika statusnya `PUBLISHED`.

> [!NOTE]
> **Tentang Editor Markdown (EasyMDE)**
> 
> Editor yang digunakan untuk menulis konten berita mendukung format Markdown, yaitu cara penulisan teks kaya yang sederhana:
> - `## Judul Bagian` → membuat judul/heading
> - `**teks tebal**` → membuat teks **tebal**
> - `*teks miring*` → membuat teks *miring*
> - `- item` → membuat daftar (bullet points)
> - `1. item` → membuat daftar bernomor
> - `[teks link](https://url)` → membuat tautan/link
> - `![alt text](url gambar)` → menyisipkan gambar
> 
> Editor juga memiliki **toolbar visual** di bagian atas sehingga Anda tidak perlu menghafal format di atas.

### 6.4 Mengedit Berita

1. Di halaman **Kelola Berita**, temukan berita yang ingin diedit.
2. Klik tombol **"Edit"** (ikon pensil) pada baris berita tersebut.
3. Ubah field yang diperlukan.
4. Klik **"Simpan Perubahan"**.

> [!TIP]
> **Slug Otomatis:** Setiap berita akan secara otomatis memiliki URL yang bersahabat (misalnya: `/berita/mmd-filkom-ub-wujudkan-desa-sukorame-go-digital`). Jika judul berita diubah, slug akan diperbarui secara otomatis. Jika slug sudah terpakai, sistem akan menambahkan angka di belakangnya (misalnya `-1`, `-2`).

### 6.5 Menghapus Berita

**Soft Delete (Ke Tempat Sampah):**
1. Di halaman Kelola Berita, klik tombol **"Hapus"** (ikon tempat sampah) pada berita yang ingin dihapus.
2. Konfirmasi penghapusan.
3. Berita akan dipindahkan ke **Tempat Sampah** dan tidak lagi muncul di halaman publik.

**Memulihkan dari Tempat Sampah:**
1. Buka halaman **Tempat Sampah Berita** (`/admin/berita/trash`).
2. Klik tombol **"Pulihkan"** pada berita yang ingin dikembalikan.
3. Berita akan kembali tampil di daftar berita dan halaman publik.

**Hapus Permanen:**
1. Di halaman **Tempat Sampah Berita**, klik tombol **"Hapus Permanen"**.
2. Konfirmasi. Data akan **dihapus secara permanen dari database** dan **tidak bisa dikembalikan lagi**.

> [!CAUTION]
> **Hapus Permanen** bersifat **irreversible** (tidak bisa dibatalkan). Pastikan Anda benar-benar yakin sebelum melakukan aksi ini.

### 6.6 Kategori Berita

Website mendukung **5 kategori berita** yang telah ditentukan:

| Kategori | Penggunaan |
|---|---|
| **Pengumuman** | Informasi resmi, edaran, dan pemberitahuan penting dari pemerintah desa |
| **Kegiatan** | Dokumentasi kegiatan desa (gotong royong, musyawarah, dll) |
| **Pembangunan** | Progres dan informasi proyek pembangunan fisik desa |
| **Pemberdayaan** | Program pemberdayaan masyarakat (pelatihan, BUMDes, dll) |
| **Lainnya** | Berita yang tidak masuk kategori di atas |

---

## 7. Modul 2: Kelola Program Desa

Menu: **Kelola Program** (`/admin/program`)

### 7.1 Gambaran Umum

Modul ini digunakan untuk mengelola **program pembangunan dan pemberdayaan** desa. Program yang ditambahkan akan tampil di halaman publik `/program`.

### 7.2 Fitur-Fitur

| Fitur | Keterangan |
|---|---|
| ➕ Tambah Program | Menambahkan program baru |
| ✏️ Edit Program | Mengubah detail program |
| 🗑️ Hapus Program (Soft Delete) | Memindahkan ke tempat sampah |
| ♻️ Pulihkan Program | Mengembalikan dari tempat sampah |
| 💀 Hapus Permanen | Menghapus dari database secara permanen |

### 7.3 Menambah Program Baru

**Langkah-langkah:**

1. Klik menu **"Kelola Program"** di sidebar.
2. Klik tombol **"+ Tambah Program"**.
3. Isi form:

| Field | Wajib? | Keterangan |
|---|---|---|
| **Judul Program** | ✅ Ya | Nama/judul program (minimal 3 karakter) |
| **Kategori** | ✅ Ya | Ketik kategori bebas (misal: Pemberdayaan Ekonomi, Kesehatan, dll) minimal 2 karakter |
| **Deskripsi** | ✅ Ya | Penjelasan detail program (minimal 10 karakter) |
| **Gambar** | ❌ Opsional | Upload foto representatif program |

4. Klik **"Simpan"**.

### 7.4 Contoh Program yang Sudah Ada

Berdasarkan data RPJM Desa Sukorame, program-program berikut sudah tersedia sebagai data awal:

1. 📦 **Pengembangan BUMDes "Cash and Carry"** — Pemberdayaan Ekonomi
2. 🏠 **Program Bedah Rumah (RTLH)** — Kesejahteraan Sosial
3. 🚑 **Pengadaan & Operasional Mobil Siaga** — Kesehatan Masyarakat

---

## 8. Modul 3: Kelola Perangkat Desa

Menu: **Kelola Perangkat** (`/admin/perangkat`)

### 8.1 Gambaran Umum

Modul ini digunakan untuk mengelola **data perangkat/aparatur desa** yang akan ditampilkan di halaman publik `/perangkat`. Setiap perangkat desa memiliki profil dengan nama, jabatan, foto, dan kutipan (quote).

### 8.2 Fitur-Fitur

| Fitur | Keterangan |
|---|---|
| ➕ Tambah Perangkat | Menambahkan perangkat desa baru |
| ✏️ Edit Perangkat | Mengubah data perangkat (nama, jabatan, foto, dll) |
| 🗑️ Hapus (Soft Delete) | Memindahkan ke tempat sampah |
| ♻️ Pulihkan | Mengembalikan dari tempat sampah |
| 💀 Hapus Permanen | Menghapus dari database |

### 8.3 Form Data Perangkat

| Field | Wajib? | Keterangan |
|---|---|---|
| **Nama** | ✅ Ya | Nama lengkap perangkat desa (minimal 2 karakter) |
| **Jabatan** | ✅ Ya | Jabatan di pemerintahan desa (misal: Kepala Desa, Sekretaris Desa, Kasi Pemerintahan) |
| **Email** | ✅ Ya | Alamat email (harus format email yang valid dan unik) |
| **Foto** | ❌ Opsional | Upload foto profil perangkat desa |
| **Quote/Kutipan** | ❌ Opsional | Kutipan/motto singkat (akan tampil di kartu profil publik) |

### 8.4 Daftar Perangkat Desa Default

Berdasarkan data RPJM Desa Sukorame, berikut adalah perangkat yang sudah terdaftar:

| No | Nama | Jabatan | Email |
|---|---|---|---|
| 1 | Yadi | Kepala Desa | kades@sukorame.desa.id |
| 2 | Mu'alim | Sekretaris Desa | sekdes@sukorame.desa.id |
| 3 | Mujito | Kasi Pemerintahan | pemerintahan@sukorame.desa.id |
| 4 | Suko Widodo | Kasi Kesra | kesra@sukorame.desa.id |
| 5 | Aris Yuli Nurcahyono | Kasi Pelayanan | pelayanan@sukorame.desa.id |
| 6 | Sahono Edi Siswanto | Kaur Perencanaan | perencanaan@sukorame.desa.id |
| 7 | Ema Kristiawati | Kaur Umum dan TU | umum@sukorame.desa.id |
| 8 | Rosidatul Amm | Kaur Keuangan | keuangan@sukorame.desa.id |
| 9 | Marlin | Kasun Sukomulyo | sukomulyo@sukorame.desa.id |
| 10 | Santoso | Kasun Sukodadi | sukodadi@sukorame.desa.id |
| 11 | Fendi Setiawan | Staf Desa | fendi@sukorame.desa.id |

> [!TIP]
> **Urutan Tampil:** Perangkat desa ditampilkan berdasarkan field `order` (urutan). Kepala Desa memiliki order tertinggi (ditampilkan pertama), dilanjutkan oleh Sekdes, dan seterusnya.

---

## 9. Modul 4: Kelola Lembaga Desa

Menu: **Kelola Lembaga** (`/admin/lembaga`)

### 9.1 Gambaran Umum

Modul ini digunakan untuk mengelola **data lembaga kemasyarakatan desa** yang tampil di halaman publik `/lembaga`.

### 9.2 Form Data Lembaga

| Field | Wajib? | Keterangan |
|---|---|---|
| **Nama Lembaga** | ✅ Ya | Nama lengkap lembaga (minimal 2 karakter) |
| **Deskripsi** | ✅ Ya | Keterangan tentang lembaga, pengurus, dan fungsinya (minimal 5 karakter) |
| **Logo/Ikon** | ❌ Opsional | Nama ikon dari React Icons (misal: `FaPeopleRoof`, `FaSeedling`). Ikon ini akan ditampilkan sebagai representasi visual lembaga |

### 9.3 Daftar Lembaga Desa Default

| No | Nama Lembaga | Ikon | Deskripsi Singkat |
|---|---|---|---|
| 1 | BPD | FaPeopleRoof | Ketua: Budi Ariesta — mitra pemerintah desa |
| 2 | LPMD | FaPersonChalkboard | Ketua: Yatemin YP — pemberdayaan masyarakat |
| 3 | PKK | FaPersonBreastfeeding | Ketua: Sustiani — kesejahteraan keluarga |
| 4 | Karang Taruna | FaPeopleGroup | Ketua: Ribut Wahyudi — wadah pemuda |
| 5 | Kelompok Tani | FaSeedling | 5 kelompok, 200 anggota — pertanian |
| 6 | Kelompok Kesenian | FaMasksTheater | Pelestarian budaya lokal & Bersih Desa |

---

## 10. Modul 5: Pengaturan Global

Menu: **Pengaturan Global** (`/admin/pengaturan`)

### 10.1 Gambaran Umum

Ini adalah **pusat kendali utama** untuk mengatur seluruh teks, data, dan informasi yang muncul di halaman-halaman publik website. Pengaturan dibagi menjadi **4 tab**:

```mermaid
graph LR
    A["Pengaturan Global"] --> B["🏠 Tab Umum & Beranda"]
    A --> C["👤 Tab Profil, Visi & Misi"]
    A --> D["📊 Tab Kontak & Statistik"]
    A --> E["🔒 Tab Keamanan Akun"]
```

### 10.2 Tab 1: Umum & Beranda

Mengatur konten yang muncul di **halaman beranda (homepage)** dan elemen global.

| Field | Lokasi Tampil | Keterangan |
|---|---|---|
| **Nama Desa** | Seluruh website | Identitas utama desa |
| **Slogan Utama (Hero Title)** | Beranda — banner besar | Kalimat besar di hero section |
| **Sub-Slogan (Hero Subtitle)** | Beranda — di bawah slogan | Penjelasan singkat di bawah judul besar |
| **Gambar Banner Beranda** | Beranda — background hero | Upload gambar/ilustrasi latar (format SVG/JPG/PNG) |
| **Teks "Tentang Desa"** | Beranda — setelah banner | Paragraf perkenalan singkat desa |
| **Deskripsi Footer** | Footer (bawah) seluruh halaman | Teks singkat di bagian paling bawah website |

**Cara menyimpan:** Ubah teks yang diinginkan → klik tombol **"Simpan Perubahan"** (tombol melayang di pojok kanan bawah).

### 10.3 Tab 2: Profil, Visi & Misi

Mengatur konten yang muncul di **halaman Profil Desa** dan **halaman Visi & Misi**.

#### Bagian Teks Statis (disimpan dengan tombol "Simpan Perubahan"):

| Field | Lokasi Tampil | Keterangan |
|---|---|---|
| **Teks Pengantar Profil** | Profil Desa — di bawah judul | Kalimat pembuka halaman profil |
| **Teks Gambaran Umum** | Profil Desa — bagian "Gambaran Umum" | Narasi lengkap tentang karakter desa |
| **Teks Visi Desa** | Visi & Misi — bagian visi | Cita-cita besar pembangunan desa |
| **Sub-Teks Visi** | Visi & Misi — penjelasan visi | Makna dan konteks dari visi desa |

#### Bagian Dinamis (CRUD — otomatis tersimpan saat menambah/edit/hapus):

> [!IMPORTANT]
> Bagian **Misi Desa** dan **Nilai Utama** menggunakan sistem CRUD real-time. Perubahan langsung tersimpan tanpa perlu menekan "Simpan Perubahan".

**Daftar Misi Desa:**
- Setiap item misi memiliki: **Ikon**, **Judul**, **Deskripsi**, dan **Urutan**
- Anda bisa **Tambah**, **Edit**, atau **Hapus** misi secara langsung
- Ikon menggunakan nama dari pustaka React Icons (contoh: `FiFeather`, `FiUsers`, `FiSun`, dll)

**Daftar Nilai Utama:**
- Format sama dengan misi: **Ikon**, **Judul**, **Deskripsi**, dan **Urutan**
- Anda bisa **Tambah**, **Edit**, atau **Hapus** nilai secara langsung

### 10.4 Tab 3: Kontak & Statistik

Mengatur **data numerik desa** dan **informasi kontak**.

#### Statistik & Demografi:

| Field | Contoh Nilai | Keterangan |
|---|---|---|
| **Jumlah Penduduk** | 1.837 | Total jumlah jiwa |
| **Jumlah Dusun** | 2 | Jumlah dusun (Sukomulyo & Sukodadi) |
| **Jumlah RT/RW** | 14/4 | Format: RT/RW |
| **Potensi Unggulan** | 8 | Jumlah potensi desa |
| **Luas Wilayah** | 450 Ha | Luas dalam hektar |
| **Ketinggian** | 250 mdpl | Ketinggian dari permukaan laut |

#### Kontak & Sosial Media:

| Field | Contoh Nilai |
|---|---|
| **Telepon/WhatsApp** | (0355) 123456 |
| **Email Resmi** | info@sukorame.desa.id |
| **Alamat Balai Desa** | Kantor Kepala Desa Sukorame |
| **Kecamatan & Kabupaten** | Kec. Binangun, Kab. Blitar (tampil di navbar) |
| **Facebook** | URL halaman Facebook |
| **Instagram** | URL profil Instagram |
| **YouTube** | URL kanal YouTube |

### 10.5 Tab 4: Keamanan Akun

Digunakan untuk **mengganti password** akun admin. Lihat detail di [Modul 7: Keamanan Akun](#12-modul-7-keamanan-akun).

---

## 11. Modul 6: Log Audit Aktivitas

Menu: **Log Audit Aktivitas** (`/admin/audit`)

### 11.1 Gambaran Umum

Modul ini mencatat **seluruh aktivitas** yang dilakukan di panel admin secara otomatis. Setiap kali admin membuat, mengubah, menghapus, atau memulihkan konten, sistem akan merekam jejak aktivitas tersebut.

### 11.2 Informasi yang Dicatat

Setiap baris log audit berisi:

| Field | Keterangan |
|---|---|
| **Nama Admin** | Siapa yang melakukan aksi |
| **Aksi** | Jenis aksi: CREATE, UPDATE, SOFT_DELETE, RESTORE, HARD_DELETE |
| **Entitas** | Modul yang terpengaruh: Berita, Program, Perangkat, Lembaga, Setting |
| **Nama Entitas** | Judul/nama item yang diaksi (misal: nama berita yang diedit) |
| **Waktu** | Tanggal dan jam aksi dilakukan |

### 11.3 Jenis Aksi yang Dilacak

| Kode Aksi | Arti | Contoh |
|---|---|---|
| `CREATE` | Membuat data baru | Admin membuat berita baru "Gotong Royong di RT 05" |
| `UPDATE` | Mengubah data yang ada | Admin mengedit judul program "BUMDes" |
| `SOFT_DELETE` | Memindahkan ke tempat sampah | Admin menghapus (sementara) perangkat desa |
| `RESTORE` | Memulihkan dari tempat sampah | Admin mengembalikan berita dari tempat sampah |
| `HARD_DELETE` | Menghapus secara permanen | Admin menghapus permanen berita dari tempat sampah |

> [!NOTE]
> Log audit bersifat **read-only** (hanya baca). Admin tidak bisa menghapus atau mengubah catatan audit. Ini untuk menjaga **akuntabilitas dan transparansi** pengelolaan website.

---

## 12. Modul 7: Keamanan Akun

### 12.1 Mengganti Password

**Lokasi:** `Pengaturan Global` → Tab **"Keamanan Akun"** (`/admin/pengaturan?tab=keamanan`)

**Langkah-langkah:**

1. Buka menu **Pengaturan Global**.
2. Klik tab **"🔒 Keamanan Akun"**.
3. Isi form:
   - **Password Saat Ini:** Masukkan password lama yang sedang digunakan
   - **Password Baru:** Masukkan password baru (minimal 6 karakter)
   - **Konfirmasi Password Baru:** Ketik ulang password baru
4. Klik **"Ubah Password"**.

### 12.2 Aturan Password

| Aturan | Detail |
|---|---|
| **Panjang minimal** | 6 karakter |
| **Konfirmasi** | Harus cocok dengan password baru |
| **Verifikasi** | Password lama harus benar |
| **Rate limiting** | Maksimal 3 percobaan per 15 menit per IP |

> [!WARNING]
> **Peringatan Keamanan:**
> - Jangan bagikan password Anda kepada siapa pun.
> - Gunakan password yang kuat (kombinasi huruf besar, huruf kecil, angka, dan simbol).
> - Segera ubah password default setelah pertama kali login.
> - Jika Anda lupa password, hubungi tim developer untuk reset manual melalui database.

---

## 13. Panduan Upload Gambar

### 13.1 Sistem Upload

Website menggunakan **Supabase Storage** sebagai penyimpanan gambar di cloud. Setiap gambar yang diupload akan disimpan di bucket `desa-storage` dan mendapatkan URL publik.

### 13.2 Aturan Upload

| Aturan | Detail |
|---|---|
| **Format yang didukung** | JPG, JPEG, PNG, SVG, WebP, GIF |
| **Ukuran maksimal** | 5 MB per file |
| **Tipe file** | Harus berupa gambar (`image/*`) |
| **Penamaan otomatis** | File akan diberi nama unik (UUID) untuk menghindari konflik |

### 13.3 Tempat Upload Gambar Tersedia

Upload gambar tersedia di beberapa tempat:

| Lokasi | Field Upload | Keterangan |
|---|---|---|
| Berita | Thumbnail | Gambar utama/sampul berita |
| Program | Gambar | Foto representatif program |
| Perangkat | Foto | Foto profil perangkat desa |
| Lembaga | Logo | Logo/ikon lembaga (juga bisa pakai nama ikon React Icons) |
| Pengaturan | Banner Beranda | Gambar hero/banner halaman depan |

### 13.4 Cara Upload

1. Pada form yang menyediakan field upload, klik tombol **"Pilih Gambar"** atau area upload.
2. Pilih file gambar dari komputer/perangkat Anda.
3. Tunggu proses upload selesai (akan muncul indikator loading).
4. Setelah berhasil, preview gambar akan muncul.
5. Lanjutkan dengan menyimpan form.

> [!TIP]
> **Rekomendasi resolusi gambar:**
> - **Banner Beranda:** minimal 1200×600 piksel (format landscape)
> - **Thumbnail Berita:** minimal 800×450 piksel (rasio 16:9)
> - **Foto Perangkat:** minimal 400×500 piksel (rasio potret/portrait)
> - **Gambar Program:** minimal 800×600 piksel

---

## 14. Fitur Tempat Sampah (Trash)

### 14.1 Konsep Soft Delete

Website ini menerapkan sistem **Soft Delete** untuk melindungi data dari penghapusan yang tidak disengaja. Ketika Anda menghapus sebuah item, data **tidak langsung dihapus dari database**, melainkan ditandai dengan waktu penghapusan (`deletedAt`).

### 14.2 Modul yang Memiliki Tempat Sampah

| Modul | URL Tempat Sampah |
|---|---|
| Berita | `/admin/berita/trash` |
| Program | `/admin/program/trash` |
| Perangkat | `/admin/perangkat/trash` |
| Lembaga | `/admin/lembaga/trash` |

### 14.3 Alur Penghapusan

```mermaid
flowchart LR
    A["Data Aktif"] -->|Hapus Soft Delete| B["Tempat Sampah"]
    B -->|Pulihkan Restore| A
    B -->|Hapus Permanen Hard Delete| C["Data Hilang Selamanya"]
```

### 14.4 Aksi yang Tersedia di Tempat Sampah

| Aksi | Tombol | Efek |
|---|---|---|
| **Pulihkan** | 🔄 Restore | Data kembali ke daftar aktif dan muncul di halaman publik |
| **Hapus Permanen** | 🗑️ Hard Delete | Data dihapus dari database secara permanen — **TIDAK BISA DIKEMBALIKAN** |

---

## 15. Fitur Pencarian Website

### 15.1 Cara Menggunakan (Pengunjung)

1. Klik ikon **🔍 (kaca pembesar)** di navbar (desktop) atau tombol "Cari Berita & Program" (mobile).
2. Akan muncul **modal pencarian** di tengah layar.
3. Ketik kata kunci yang ingin dicari.
4. Tekan **Enter** atau klik tombol **→ (panah)**.
5. Anda akan diarahkan ke halaman `/pencarian?q=kata-kunci` dengan hasil pencarian.

### 15.2 Cakupan Pencarian

Pencarian mencakup:
- **Judul Berita**
- **Judul Program**

---

## 16. Struktur Database

### 16.1 Diagram Entitas (Entity Relationship)

```mermaid
erDiagram
    User ||--o{ Account : "memiliki"
    User ||--o{ Session : "memiliki"
    User ||--o{ Berita : "menulis"
    
    User {
        String id PK
        String name
        String email UK
        String password
        String role
    }
    
    Berita {
        Int id PK
        String slug UK
        String title
        LongText content
        String thumbnail
        Enum kategori
        String status
        DateTime publishedAt
        Int viewCount
        DateTime deletedAt
    }
    
    Program {
        Int id PK
        String kategori
        String title
        Text description
        String image
        DateTime deletedAt
    }
    
    Perangkat {
        Int id PK
        String name
        String role
        String email UK
        String image
        Text quote
        Int order
        DateTime deletedAt
    }
    
    Lembaga {
        Int id PK
        String name
        Text description
        String logo
        DateTime deletedAt
    }
    
    Misi {
        Int id PK
        String icon
        String title
        Text description
        Int order
    }
    
    NilaiUtama {
        Int id PK
        String icon
        String title
        Text description
        Int order
    }
    
    Setting {
        Int id PK
        String key UK
        Text value
    }
    
    AuditLog {
        Int id PK
        String userId
        String userName
        String action
        String entity
        String entityName
        DateTime createdAt
    }
```

### 16.2 Daftar Tabel Database

| No | Tabel | Nama Tabel (MySQL) | Jumlah Kolom | Keterangan |
|---|---|---|---|---|
| 1 | User | `users` | 8 | Akun admin (NextAuth) |
| 2 | Account | `accounts` | 12 | Akun OAuth (untuk NextAuth) |
| 3 | Session | `sessions` | 5 | Sesi login aktif |
| 4 | VerificationToken | `verification_tokens` | 3 | Token verifikasi (NextAuth) |
| 5 | Berita | `berita` | 13 | Berita/artikel desa |
| 6 | Program | `program` | 7 | Program pembangunan desa |
| 7 | Perangkat | `perangkat` | 9 | Aparatur/perangkat desa |
| 8 | Lembaga | `lembaga` | 7 | Lembaga kemasyarakatan |
| 9 | Misi | `misi` | 6 | Misi pembangunan desa |
| 10 | NilaiUtama | `nilai_utama` | 6 | Nilai-nilai utama desa |
| 11 | Setting | `settings` | 4 | Pengaturan global (key-value) |
| 12 | AuditLog | `audit_logs` | 7 | Log aktivitas admin |

---

## 17. Panduan Pemecahan Masalah (Troubleshooting)

### 17.1 Masalah Umum

| Masalah | Penyebab | Solusi |
|---|---|---|
| **Tidak bisa login** | Password salah atau email tidak terdaftar | Cek kembali email dan password. Jika lupa, hubungi developer untuk reset |
| **Halaman admin kosong/error** | Session expired atau masalah koneksi | Refresh halaman (`F5`) atau login ulang |
| **Gambar gagal diupload** | Ukuran file > 5 MB atau format tidak didukung | Kompres gambar atau gunakan format JPG/PNG. Pastikan ukuran < 5 MB |
| **Upload error "Konfigurasi Supabase..."** | Environment variable Supabase belum diatur | Hubungi developer untuk mengecek file `.env` |
| **Berita tidak muncul di halaman publik** | Status masih `DRAFT` atau sudah di-soft-delete | Ubah status ke `PUBLISHED` atau pulihkan dari tempat sampah |
| **Perubahan pengaturan tidak terlihat** | Cache halaman belum diperbarui | Tunggu beberapa detik lalu refresh. Sistem menggunakan ISR (revalidate) |
| **"Too many attempts"** | Rate limiting aktif (terlalu banyak percobaan ganti password) | Tunggu 15 menit lalu coba lagi |
| **Error "Unauthorized"** | Session login sudah habis masa berlakunya | Login ulang ke panel admin |
| **Ikon lembaga tidak tampil** | Nama ikon tidak sesuai dengan pustaka React Icons | Gunakan nama ikon yang valid (misal: `FaPeopleRoof`, `FiUsers`) |

### 17.2 Tips Penggunaan

> [!TIP]
> **Tips untuk Perangkat Desa:**
> 1. 📱 Website bersifat **responsif** — bisa diakses dari HP, tablet, maupun laptop/PC.
> 2. 📸 Gunakan foto dengan kualitas baik untuk memberikan kesan profesional.
> 3. 📝 Rutin update berita minimal **1-2 kali per minggu** untuk menjaga website tetap hidup.
> 4. 🔄 Cek **Log Audit** secara berkala untuk memantau siapa yang melakukan perubahan.
> 5. 💾 Gunakan status **DRAFT** untuk berita yang belum siap diterbitkan.
> 6. 🗑️ Manfaatkan **Tempat Sampah** — jangan langsung hapus permanen jika belum yakin.
> 7. 🔒 Ganti password secara berkala (disarankan setiap 3 bulan).

---

## 18. Informasi Teknis untuk Developer

### 18.1 Konfigurasi Environment (.env)

File `.env` di root proyek harus berisi variabel berikut:

```
# Database
DATABASE_URL="mysql://user:password@localhost:3306/desa_sukorame"

# NextAuth
AUTH_SECRET="kunci-rahasia-random"
NEXT_PUBLIC_SITE_URL="https://sukorame.web.id"

# Supabase Storage
SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_ANON_KEY="eyJhbG..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbG..."  (opsional, lebih aman)
```

### 18.2 Perintah Penting

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server development (localhost:3000) |
| `npm run build` | Membuat build production |
| `npm run start` | Menjalankan server production |
| `npx prisma db push` | Sinkronisasi skema database |
| `npx prisma migrate dev` | Membuat dan menjalankan migrasi database |
| `npx prisma db seed` | Mengisi database dengan data awal |
| `npx prisma studio` | Membuka GUI untuk melihat/mengedit database langsung |

### 18.3 Validasi Data (Zod Schema)

Setiap form di panel admin divalidasi menggunakan Zod di sisi server:

| Modul | Aturan Validasi |
|---|---|
| **Berita** | Judul 5-200 karakter, konten min 20 karakter, kategori harus valid |
| **Program** | Judul min 3 karakter, kategori min 2 karakter, deskripsi min 10 karakter |
| **Perangkat** | Nama min 2 karakter, jabatan min 2 karakter, email harus format valid |
| **Lembaga** | Nama min 2 karakter, deskripsi min 5 karakter |
| **Misi** | Judul min 2 karakter, deskripsi min 5 karakter |
| **Nilai Utama** | Judul min 2 karakter, deskripsi min 5 karakter |

### 18.4 SEO & Performa

Website sudah dioptimalkan dengan:
- ✅ **Robots.txt** (`/robots.ts`) — mengatur crawler search engine
- ✅ **Sitemap** (`/sitemap.ts`) — peta situs otomatis untuk Google
- ✅ **Open Graph** — metadata untuk share di media sosial
- ✅ **ISR (Incremental Static Regeneration)** — halaman home di-revalidate setiap 1 jam
- ✅ **Server-side rendering** — halaman admin dan konten dinamis di-render di server
- ✅ **Image optimization** — gambar dioptimasi secara otomatis oleh Next.js

---

## 19. Lampiran: Kredensial Default

> [!CAUTION]
> **RAHASIA — Hanya untuk Perangkat Desa yang Berwenang!**

| Informasi | Nilai |
|---|---|
| **URL Login** | `https://sukorame.web.id/admin/login` |
| **Email Admin** | `admin@sukorame.desa.id` |
| **Password Default** | `Admin@Sukorame2026!` |

> ⚠️ **WAJIB segera ganti password setelah login pertama kali!**

---

## 📋 Ringkasan Seluruh Modul

| No | Modul | URL Admin | Aksi yang Tersedia |
|---|---|---|---|
| 1 | Dashboard | `/admin/dashboard` | Lihat statistik, aktivitas terakhir, aksi cepat |
| 2 | Kelola Berita | `/admin/berita` | Tambah, Edit, Hapus, Pulihkan, Hapus Permanen |
| 3 | Kelola Program | `/admin/program` | Tambah, Edit, Hapus, Pulihkan, Hapus Permanen |
| 4 | Kelola Perangkat | `/admin/perangkat` | Tambah, Edit, Hapus, Pulihkan, Hapus Permanen |
| 5 | Kelola Lembaga | `/admin/lembaga` | Tambah, Edit, Hapus, Pulihkan, Hapus Permanen |
| 6 | Pengaturan Global | `/admin/pengaturan` | Edit teks beranda, profil, visi-misi, statistik, kontak, sosmed |
| 7 | Log Audit | `/admin/audit` | Lihat riwayat aktivitas admin (read-only) |
| 8 | Keamanan Akun | `/admin/pengaturan?tab=keamanan` | Ganti password |

---

*Dokumen ini disusun berdasarkan analisis lengkap source code Website Desa Sukorame — Juli 2026.*  
*Untuk pertanyaan teknis, hubungi tim developer.*
