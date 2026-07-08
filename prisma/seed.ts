import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with exact text from dummy data...')

  // ---------------------------------------------------------
  // 1. SEED SETTINGS (Pengaturan Global)
  // ---------------------------------------------------------
  const settings = [
    // Identitas Utama
    { key: 'desa_nama', value: 'Desa Sukorame' },
    { key: 'hero_title', value: 'Selamat Datang di Desa Sukorame' },
    { key: 'hero_subtitle', value: 'Mewujudkan masyarakat yang mandiri, sejahtera, dan berbudaya melalui pengelolaan potensi lokal yang berkelanjutan.' },
    
    // Visi & Misi
    { key: 'desa_visi', value: '"Terwujudnya Desa Sukorame yang Mandiri, Sejahtera, dan Berbudaya melalui Peningkatan Ekonomi Berbasis Agrikultur dan Tata Kelola Pemerintahan yang Transparan."' },
    { key: 'desa_visi_subtitle', value: 'Visi ini menjadi bintang penunjuk arah dalam setiap kebijakan dan program yang kami jalankan, memastikan bahwa pembangunan desa selalu berpusat pada kesejahteraan warga dan pelestarian lingkungan.' },
    { key: 'desa_misi', value: JSON.stringify([
      { icon: "/assets/icons/leaf.svg", title: "Pemberdayaan Ekonomi", description: "Meningkatkan perekonomian masyarakat melalui pemberdayaan UMKM, kelompok tani, dan pemanfaatan potensi agrikultur lokal secara berkelanjutan." },
      { icon: "/assets/icons/grad.svg", title: "Peningkatan SDM", description: "Meningkatkan kualitas Sumber Daya Manusia melalui fasilitasi pendidikan yang inklusif, pelatihan keterampilan, dan pembinaan karakter generasi muda." },
      { icon: "/assets/icons/shield.svg", title: "Kesehatan & Kesejahteraan", description: "Mewujudkan lingkungan desa yang sehat dan sejahtera melalui optimalisasi pelayanan posyandu, sanitasi lingkungan, dan program kesehatan masyarakat." },
      { icon: "/assets/icons/transparancy.svg", title: "Tata Kelola Transparan", description: "Menyelenggarakan tata kelola pemerintahan desa yang bersih, transparan, dan akuntabel berbasis digitalisasi pelayanan publik." },
      { icon: "/assets/icons/people-tree.svg", title: "Pelestarian Budaya", description: "Melestarikan nilai-nilai gotong royong, kearifan lokal, dan tradisi budaya masyarakat desa sebagai identitas dan pemersatu warga." }
    ])},
    
    // Nilai-Nilai Utama
    { key: 'desa_nilai_utama', value: JSON.stringify([
      { icon: "/assets/icons/three-people.svg", title: "Gotong Royong", description: "Bersama membangun desa dengan kebersamaan dan kepedulian." },
      { icon: "/assets/icons/eye.svg", title: "Transparansi", description: "Terbuka, jujur, dan akuntabel dalam setiap keputusan dan pengelolaan." },
      { icon: "/assets/icons/agriculture.svg", title: "Inovasi Agrikultur", description: "Mengembangkan pertanian modern untuk masa depan yang berkelanjutan." },
      { icon: "/assets/icons/hand-care.svg", title: "Pelayanan Prima", description: "Melayani masyarakat dengan cepat, ramah, dan sepenuh hati." }
    ])},
    
    // Profil & Gambaran Umum
    { key: 'profil_hero_subtitle', value: 'Mengenal lebih dekat sejarah, identitas, dan karakter unggul yang membentuk Desa Sukorame menjadi komunitas yang tangguh dan harmonis.' },
    { key: 'tentang_desa_deskripsi', value: 'Desa Sukorame adalah sebuah desa agraris yang terletak di jantung kabupaten. Dengan luas wilayah yang didominasi oleh lahan pertanian produktif, desa ini menjadi salah satu lumbung pangan daerah. Kami berkomitmen untuk memadukan kearifan lokal dengan inovasi modern dalam pelayanan publik dan pengembangan ekonomi kerakyatan.' },
    { key: 'gambaran_umum_deskripsi', value: 'Desa Sukorame adalah perwujudan harmoni antara tradisi dan kemajuan. Terletak di jantung lanskap yang subur, desa kami dikenal dengan masyarakatnya yang ramah, semangat gotong royong yang kuat, dan komitmen terhadap pembangunan berkelanjutan.' },
    
    // Statistik Desa
    { key: 'statistik_penduduk', value: '3.245' },
    { key: 'statistik_dusun', value: '2' },
    { key: 'statistik_rtrw', value: '24/6' },
    { key: 'statistik_potensi', value: '12' },
    { key: 'statistik_luas', value: '450 Ha' },
    { key: 'statistik_ketinggian', value: '350 mdpl' },
    
    // Kontak & Sosial Media
    { key: 'kontak_telepon', value: '(0355) 123456' },
    { key: 'kontak_email', value: 'info@sukorame.desa.id' },
    { key: 'kontak_alamat', value: 'Jl. Raya Sukorame No. 1' },
    { key: 'sosmed_facebook', value: '' },
    { key: 'sosmed_instagram', value: '' },
    { key: 'sosmed_youtube', value: '' },
    
    // Pengaturan Footer
    { key: 'footer_deskripsi', value: 'Pusat informasi dan pelayanan publik Pemerintah Desa Sukorame untuk mewujudkan desa yang mandiri dan inovatif.' }
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    })
  }
  console.log('✅ Settings seeded with exact text')

  // ---------------------------------------------------------
  // 2. SEED PROGRAM DESA
  // ---------------------------------------------------------
  const programs = [
    {
      kategori: "Pelayanan Publik",
      title: "Digitalisasi Pelayanan Desa",
      description: "Transformasi layanan administrasi desa ke sistem digital terpadu untuk memudahkan warga mengakses surat pengantar, informasi desa, dan pelaporan secara real-time.",
      image: "/assets/images/program-placeholder.png"
    }
  ]

  await prisma.program.deleteMany({});
  for (const p of programs) {
    await prisma.program.create({ data: p })
  }
  console.log('✅ Programs seeded')

  // ---------------------------------------------------------
  // 3. SEED PERANGKAT DESA
  // ---------------------------------------------------------
  const perangkat = [
    {
      name: "Kusnadi",
      role: "Kepala Desa",
      email: "kades@sukorame.desa.id",
      image: "https://picsum.photos/seed/kades50/400/500",
      quote: "Berkomitmen untuk mewujudkan Desa Sukorame yang mandiri, sejahtera, dan berbudaya melalui tata kelola pemerintahan yang bersih dan pelayanan publik yang prima.",
      order: 1
    },
    {
      name: "Ahmad Yani, S.E.",
      role: "Sekretaris Desa",
      email: "sekdes@sukorame.desa.id",
      image: "https://picsum.photos/seed/sekdes35/400/500",
      order: 2
    },
    {
      name: "Siti Aminah, S.Ak.",
      role: "Kaur Keuangan",
      email: "keuangan@sukorame.desa.id",
      image: "https://picsum.photos/seed/kaur30/400/500",
      order: 3
    },
    {
      name: "Budi Santoso",
      role: "Kasi Pelayanan",
      email: "pelayanan@sukorame.desa.id",
      image: "https://picsum.photos/seed/kasi45/400/500",
      order: 4
    },
    {
      name: "Dewi Lestari, S.Sos.",
      role: "Kasi Kesejahteraan",
      email: "kesejahteraan@sukorame.desa.id",
      image: "https://picsum.photos/seed/kasikes40/400/500",
      order: 5
    },
    {
      name: "Eko Prasetyo",
      role: "Kepala Dusun Krajan",
      email: "krajan@sukorame.desa.id",
      image: "https://picsum.photos/seed/kadus28/400/500",
      order: 6
    }
  ]

  await prisma.perangkat.deleteMany({});
  for (const p of perangkat) {
    await prisma.perangkat.create({ data: p })
  }
  console.log('✅ Perangkat seeded')

  // ---------------------------------------------------------
  // 4. SEED LEMBAGA DESA
  // ---------------------------------------------------------
  const lembaga = [
    {
      name: "BPD",
      description: "Badan Permusyawaratan Desa. Mitra pemerintah desa dalam merancang peraturan desa.",
      logo: "/assets/icons/handshake.svg"
    },
    {
      name: "LPMD",
      description: "Lembaga Pemberdayaan Masyarakat Desa. Menggerakkan partisipasi swadaya.",
      logo: "/assets/icons/people-tree.svg"
    },
    {
      name: "PKK",
      description: "Pemberdayaan Kesejahteraan Keluarga. Mewujudkan keluarga mandiri.",
      logo: "/assets/icons/home.svg"
    },
    {
      name: "Karang Taruna",
      description: "Wadah pengembangan generasi muda desa dalam bidang sosial, olahraga, dan seni.",
      logo: "/assets/icons/grad.svg"
    },
    {
      name: "RT / RW",
      description: "Rukun Tetangga & Rukun Warga. Ujung tombak pelayanan administrasi masyarakat.",
      logo: "/assets/icons/hand-care.svg"
    },
    {
      name: "Linmas",
      description: "Perlindungan Masyarakat. Menjaga keamanan, ketertiban, dan ketenteraman desa.",
      logo: "/assets/icons/shield.svg"
    },
    {
      name: "Posyandu",
      description: "Pos Pelayanan Terpadu. Menjamin akses kesehatan dasar bagi ibu dan anak.",
      logo: "/assets/icons/leaf.svg"
    },
    {
      name: "BUMDes",
      description: "Badan Usaha Milik Desa. Mengelola potensi ekonomi desa untuk kesejahteraan.",
      logo: "/assets/icons/market.svg"
    }
  ]

  await prisma.lembaga.deleteMany({});
  for (const l of lembaga) {
    await prisma.lembaga.create({ data: l })
  }
  console.log('✅ Lembaga seeded')

  // ---------------------------------------------------------
  // 5. SEED ADMIN USER
  // ---------------------------------------------------------
  const adminEmail = 'admin@sukorame.desa.id'
  const adminPassword = 'password123'
  
  const bcrypt = require('bcryptjs')
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })
  
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await prisma.user.create({
      data: {
        name: 'Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    console.log(`✅ Admin User seeded`)
    console.log(`   - Email: ${adminEmail}`)
    console.log(`   - Pass : ${adminPassword}`)
  } else {
    console.log('⏭️ Admin User already exists, skipping')
  }

  console.log('\n🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
