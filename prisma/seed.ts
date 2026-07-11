import { PrismaClient, KategoriBerita } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database dengan data RPJM Desa Sukorame...\n');

  // ---------------------------------------------------------
  // 1. SEED SETTINGS (Pengaturan Global)
  // ---------------------------------------------------------
  const settings = [
    // Identitas Utama
    { key: 'desa_nama', value: 'Desa Sukorame' },
    { key: 'hero_title', value: 'Selamat Datang di Desa Sukorame' },
    { key: 'hero_subtitle', value: 'Mewujudkan Masyarakat Desa Sukorame Yang Adil, Makmur, Guyub Rukun, Aman Dan Sejahtera.' },

    // Visi & Misi
    { key: 'desa_visi', value: '"Terselenggaranya Pemerintah Desa Yang Bersih Dipercaya Dan Bertanggung Jawab, Mengutamakan Pelayanan Kepentingan Masyarakat Sehingga Terwujud Masyarakat Desa Sukorame Yang Adil, Makmur, Guyub Rukun, Aman Dan Sejahtera."' },
    { key: 'desa_visi_subtitle', value: 'Visi ini menjadi bintang penunjuk arah dalam setiap kebijakan dan program yang kami jalankan, memastikan bahwa pembangunan desa selalu berpusat pada kesejahteraan warga.' },

    // Profil & Gambaran Umum
    { key: 'profil_hero_subtitle', value: 'Mengenal lebih dekat sejarah, identitas, dan karakter unggul yang membentuk Desa Sukorame di Kecamatan Binangun.' },
    { key: 'tentang_desa_deskripsi', value: 'Desa Sukorame adalah desa agraris dan sentra industri permebelan yang terletak di Kecamatan Binangun, Kabupaten Blitar. Nama desa ini berasal dari sebuah sumber air dan pohon suko peninggalan masa lalu. Kami berkomitmen memadukan kearifan lokal dengan inovasi modern dalam pelayanan publik dan pengembangan ekonomi kerakyatan.' },
    { key: 'gambaran_umum_deskripsi', value: 'Desa Sukorame adalah perwujudan harmoni antara tradisi dan kemajuan. Desa kami dikenal dengan masyarakatnya yang ramah, semangat gotong royong yang kuat, dan komitmen terhadap pelestarian budaya melalui tradisi tahunan Bersih Desa di Petilasan Mbah Irojoyo.' },

    // Statistik Desa
    { key: 'statistik_penduduk', value: '1.837' },
    { key: 'statistik_dusun', value: '2' },
    { key: 'statistik_rtrw', value: '14/4' },
    { key: 'statistik_potensi', value: '8' },
    { key: 'statistik_luas', value: '450 Ha' },
    { key: 'statistik_ketinggian', value: '250 mdpl' },

    // Kontak & Sosial Media
    { key: 'kontak_telepon', value: '(0355) 123456' },
    { key: 'kontak_email', value: 'info@sukorame.desa.id' },
    { key: 'kontak_alamat', value: 'Kantor Kepala Desa Sukorame' },
    { key: 'kontak_lokasi', value: 'Kec. Binangun, Kab. Blitar' },
    { key: 'sosmed_facebook', value: '' },
    { key: 'sosmed_instagram', value: '' },
    { key: 'sosmed_youtube', value: '' },

    // Footer
    { key: 'footer_deskripsi', value: 'Pusat informasi dan pelayanan publik Pemerintah Desa Sukorame untuk mewujudkan desa yang mandiri dan sejahtera.' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
  }
  console.log('✅ Settings seeded');

  // ---------------------------------------------------------
  // 2. SEED MISI DESA (tabel terpisah)
  // ---------------------------------------------------------
  const misiData = [
    {
      icon: '/assets/icons/leaf.svg',
      title: 'Kerukunan Beragama',
      description: 'Membina kerukunan umat beragama & mengembangkan kegiatan keagamaan untuk menambah keimanan kepada Tuhan YME.',
      order: 1,
    },
    {
      icon: '/assets/icons/eye.svg',
      title: 'Pemerintahan Bertanggung Jawab',
      description: 'Menata tata kelola pemerintahan yang bertanggung jawab dan melayani seluruh masyarakat tanpa membedakan.',
      order: 2,
    },
    {
      icon: '/assets/icons/three-people.svg',
      title: 'Musyawarah Mufakat',
      description: 'Mengutamakan prinsip musyawarah untuk mencapai mufakat dalam setiap pengambilan kebijakan desa.',
      order: 3,
    },
    {
      icon: '/assets/icons/agriculture.svg',
      title: 'Pengembangan Pertanian & Peternakan',
      description: 'Mengembangkan potensi mayoritas warga di sektor pertanian dan peternakan dengan memberikan pelatihan yang berkesinambungan.',
      order: 4,
    },
    {
      icon: '/assets/icons/hand-care.svg',
      title: 'Kesehatan & Kesejahteraan Sosial',
      description: 'Meningkatkan layanan kesehatan masyarakat, fasilitas olahraga, dan bantuan sosial seperti Bedah Rumah (RTLH) bagi warga miskin.',
      order: 5,
    },
  ];

  await prisma.misi.deleteMany({});
  for (const m of misiData) {
    await prisma.misi.create({ data: m });
  }
  console.log('✅ Misi seeded');

  // ---------------------------------------------------------
  // 3. SEED NILAI UTAMA (tabel terpisah)
  // ---------------------------------------------------------
  const nilaiUtamaData = [
    {
      icon: '/assets/icons/three-people.svg',
      title: 'Guyub Rukun & Gotong Royong',
      description: 'Menjunjung tinggi kerukunan dan kerja bakti bersama (kearifan lokal) dalam setiap aspek pembangunan desa.',
      order: 1,
    },
    {
      icon: '/assets/icons/eye.svg',
      title: 'Adil & Setara',
      description: 'Memberikan perlindungan hukum dan pelayanan yang sama bagi seluruh lapisan masyarakat.',
      order: 2,
    },
    {
      icon: '/assets/icons/agriculture.svg',
      title: 'Kemandirian Ekonomi',
      description: 'Mendorong kemandirian warga melalui pemberdayaan BUMDes, UMKM, dan industri permebelan lokal.',
      order: 3,
    },
    {
      icon: '/assets/icons/hand-care.svg',
      title: 'Aman & Sejahtera',
      description: 'Menjaga ketertiban desa dan mewujudkan kesejahteraan bagi keluarga kurang mampu.',
      order: 4,
    },
  ];

  await prisma.nilaiUtama.deleteMany({});
  for (const n of nilaiUtamaData) {
    await prisma.nilaiUtama.create({ data: n });
  }
  console.log('✅ Nilai Utama seeded');

  // ---------------------------------------------------------
  // 4. SEED PROGRAM DESA
  // ---------------------------------------------------------
  const programs = [
    {
      kategori: 'Pemberdayaan Ekonomi',
      title: 'Pengembangan BUMDes "Cash and Carry"',
      description: 'Optimalisasi Badan Usaha Milik Desa untuk menampung tenaga kerja dan pemasaran produk kerajinan/pertanian secara langsung demi pertumbuhan ekonomi.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    },
    {
      kategori: 'Kesejahteraan Sosial',
      title: 'Program Bedah Rumah (RTLH)',
      description: 'Bantuan Rumah Tidak Layak Huni yang didanai melalui APBDes, dengan target minimal 2 keluarga per tahun untuk mengentaskan kemiskinan ekstrim.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    },
    {
      kategori: 'Kesehatan Masyarakat',
      title: 'Pengadaan & Operasional Mobil Siaga',
      description: 'Meningkatkan layanan kesehatan darurat bagi masyarakat melalui penyediaan mobil siaga yang dapat diakses 24 jam.',
      image: 'https://images.unsplash.com/photo-1587556200676-e17f651ef8a0?auto=format&fit=crop&q=80&w=800',
    },
  ];

  await prisma.program.deleteMany({});
  for (const p of programs) {
    await prisma.program.create({ data: p });
  }
  console.log('✅ Programs seeded');

  // ---------------------------------------------------------
  // 5. SEED PERANGKAT DESA
  // ---------------------------------------------------------
  const perangkat = [
    {
      name: 'Yadi',
      role: 'Kepala Desa',
      email: 'kades@sukorame.desa.id',
      image: 'https://picsum.photos/seed/yadi/400/500',
      quote: 'Saya berkomitmen memimpin Desa Sukorame menuju masa depan yang adil, makmur, dan guyub rukun.',
      order: 1,
    },
    {
      name: 'Mu\'alim',
      role: 'Sekretaris Desa',
      email: 'sekdes@sukorame.desa.id',
      image: 'https://picsum.photos/seed/mualim/400/500',
      order: 2,
    },
    {
      name: 'Mujito',
      role: 'Kasi Pemerintahan',
      email: 'pemerintahan@sukorame.desa.id',
      image: 'https://picsum.photos/seed/mujito/400/500',
      order: 3,
    },
    {
      name: 'Suko Widodo',
      role: 'Kasi Kesra',
      email: 'kesra@sukorame.desa.id',
      image: 'https://picsum.photos/seed/sukowidodo/400/500',
      order: 4,
    },
    {
      name: 'Aris Yuli Nurcahyono',
      role: 'Kasi Pelayanan',
      email: 'pelayanan@sukorame.desa.id',
      image: 'https://picsum.photos/seed/aris/400/500',
      order: 5,
    },
    {
      name: 'Sahono Edi Siswanto',
      role: 'Kaur Perencanaan',
      email: 'perencanaan@sukorame.desa.id',
      image: 'https://picsum.photos/seed/sahono/400/500',
      order: 6,
    },
    {
      name: 'Ema Kristiawati',
      role: 'Kaur Umum dan TU',
      email: 'umum@sukorame.desa.id',
      image: 'https://picsum.photos/seed/ema/400/500',
      order: 7,
    },
    {
      name: 'Rosidatul Amm',
      role: 'Kaur Keuangan',
      email: 'keuangan@sukorame.desa.id',
      image: 'https://picsum.photos/seed/rosidatul/400/500',
      order: 8,
    },
    {
      name: 'Marlin',
      role: 'Kasun Sukomulyo',
      email: 'sukomulyo@sukorame.desa.id',
      image: 'https://picsum.photos/seed/marlin/400/500',
      order: 9,
    },
    {
      name: 'Santoso',
      role: 'Kasun Sukodadi',
      email: 'sukodadi@sukorame.desa.id',
      image: 'https://picsum.photos/seed/santoso/400/500',
      order: 10,
    },
    {
      name: 'Fendi Setiawan',
      role: 'Staf Desa',
      email: 'fendi@sukorame.desa.id',
      image: 'https://picsum.photos/seed/fendi/400/500',
      order: 11,
    }
  ];

  await prisma.perangkat.deleteMany({});
  for (const p of perangkat) {
    await prisma.perangkat.create({ data: p });
  }
  console.log('✅ Perangkat seeded');

  // ---------------------------------------------------------
  // 6. SEED LEMBAGA DESA
  // ---------------------------------------------------------
  const lembaga = [
    { name: 'BPD (Badan Permusyawaratan Desa)', description: 'BPD diketuai oleh Budi Ariesta dan menjadi mitra pemerintah desa dalam merancang peraturan dan pengawasan.', logo: '/assets/icons/handshake.svg' },
    { name: 'LPMD', description: 'Lembaga Pemberdayaan Masyarakat Desa diketuai oleh Yatemin YP untuk menggerakkan partisipasi pembangunan.', logo: '/assets/icons/people-tree.svg' },
    { name: 'PKK', description: 'Pemberdayaan Kesejahteraan Keluarga diketuai oleh Sustiani, bertujuan mewujudkan keluarga yang tangguh dan mandiri.', logo: '/assets/icons/home.svg' },
    { name: 'Karang Taruna', description: 'Diketuai oleh Ribut Wahyudi, menjadi wadah pemuda dalam olahraga, seni budaya, dan kegiatan sosial.', logo: '/assets/icons/grad.svg' },
    { name: 'Kelompok Tani', description: 'Desa Sukorame memiliki 5 kelompok tani aktif dengan total sekitar 200 anggota, fokus pada peningkatan hasil padi, jagung, dan tebu.', logo: '/assets/icons/agriculture.svg' },
    { name: 'Kelompok Kesenian', description: 'Menampung warga pegiat seni dalam melestarikan budaya lokal, termasuk ritual Bersih Desa tahunan.', logo: '/assets/icons/leaf.svg' },
  ];

  await prisma.lembaga.deleteMany({});
  for (const l of lembaga) {
    await prisma.lembaga.create({ data: l });
  }
  console.log('✅ Lembaga seeded');

  // ---------------------------------------------------------
  // 7. SEED ADMIN USER & BERITA
  // ---------------------------------------------------------
  const adminEmail = 'admin@sukorame.desa.id';
  const adminPassword = 'Admin@Sukorame2026!';

  let adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    adminUser = await prisma.user.create({
      data: {
        name: 'Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin User seeded');
  }

  // Seed sample berita MMD FILKOM UB
  const sampleBerita = [
    {
      title: 'Mahasiswa Membangun Desa (MMD) FILKOM UB Bantu Wujudkan Desa Sukorame Go Digital',
      slug: 'mmd-filkom-ub-wujudkan-desa-sukorame-go-digital',
      content: `## Mahasiswa FILKOM UB Mengabdi di Desa Sukorame\n\nPemerintah Desa Sukorame dengan hangat menyambut kedatangan kelompok mahasiswa dari **Fakultas Ilmu Komputer Universitas Brawijaya (FILKOM UB)** yang tergabung dalam program *Mahasiswa Membangun Desa (MMD)*. Kedatangan kelompok mahasiswa ini membawa angin segar bagi percepatan kemajuan desa melalui berbagai program kerja yang inovatif.\n\n### Fokus Program Kerja MMD\n\nSelama masa pengabdiannya, mahasiswa MMD FILKOM UB akan melaksanakan serangkaian program kerja utama yang dirancang khusus untuk memajukan Desa Sukorame:\n\n1. **Digitalisasi Desa (Website & Sosial Media)**: Merancang dan membangun *Website* Resmi Desa Sukorame sebagai pusat informasi terpadu, serta pembuatan dan pengelolaan akun Sosial Media resmi desa agar potensi Sukorame semakin dikenal luas.\n2. **Video Profil Desa**: Memproduksi video profil desa yang sinematik dan informatif untuk mendokumentasikan kekayaan alam, budaya, dan kearifan lokal Desa Sukorame.\n3. **Sosialisasi dan Edukasi Teknologi**: Menyelenggarakan program edukasi dan sosialisasi pengenalan teknologi informasi di Sekolah Dasar (SD) setempat untuk menanamkan literasi digital sejak dini.\n\n### Kegiatan Sosial dan Kemasyarakatan\n\nSelain berfokus pada ranah teknologi, para mahasiswa juga sangat aktif melebur dengan masyarakat melalui berbagai kegiatan tambahan, di antaranya:\n* Membantu kelancaran Masa Pengenalan Lingkungan Sekolah (MPLS) di tingkat SD, TK, dan PAUD.\n* Turut serta dan bergotong royong dalam berbagai kegiatan rutin kemasyarakatan di Desa Sukorame.\n\nKepala Desa Sukorame menyambut baik seluruh agenda positif ini. *"Sinergi antara semangat muda para mahasiswa dengan kearifan lokal warga akan membawa Desa Sukorame melangkah lebih maju,"* ujar beliau.\n\nKami berharap seluruh program kerja yang dijalankan memberikan manfaat jangka panjang yang nyata bagi Desa Sukorame. Selamat mengabdi dan berkarya, mahasiswa MMD FILKOM UB!`,
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      kategori: KategoriBerita.Kegiatan,
      authorName: 'Admin Desa',
      authorId: adminUser.id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    }
  ];

  await prisma.berita.deleteMany({});
  for (const b of sampleBerita) {
    await prisma.berita.create({ data: b });
  }
  console.log('✅ Berita seeded');

  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
