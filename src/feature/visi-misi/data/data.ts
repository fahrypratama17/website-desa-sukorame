import type { ReactNode } from "react";

export const visiMisiHeader = {
  title: "Visi & Misi",
  subtitle:
    "Arah pembangunan dan komitmen Pemerintah Desa Sukorame untuk mewujudkan kesejahteraan masyarakat melalui tata kelola yang baik dan pemanfaatan potensi lokal.",
};

export const visiData = {
  badge: "VISI DESA",
  quote:
    '"Terwujudnya Desa Sukorame yang Mandiri, Sejahtera, dan Berbudaya melalui Peningkatan Ekonomi Berbasis Agrikultur dan Tata Kelola Pemerintahan yang Transparan."',
  description:
    "Visi ini menjadi bintang penunjuk arah dalam setiap kebijakan dan program yang kami jalankan, memastikan bahwa pembangunan desa selalu berpusat pada kesejahteraan warga dan pelestarian lingkungan.",
};

export interface MisiItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface NilaiUtamaItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export const nilaiUtamaHeader = {
  title: "Nilai - Nilai Utama",
  subtitle:
    "Landasan nilai yang menuntun setiap langkah kami untuk Sukorame yang maju, mandiri, dan sejahtera.",
};

