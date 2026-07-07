export interface PerangkatMember {
  name: string;
  role: string;
  email: string;
  image: string;
  quote?: string;
  initials: string;
  avatarColor: string;
}

export const kepalaDesa: PerangkatMember = {
  name: "Kusnadi",
  role: "Kepala Desa",
  email: "kades@sukorame.desa.id",
  // Foto wajah pria profesional (picsum — seed stabil)
  image: "https://picsum.photos/seed/kades50/400/500",
  initials: "K",
  avatarColor: "#2B694D",
  quote: "Berkomitmen untuk mewujudkan Desa Sukorame yang mandiri, sejahtera, dan berbudaya melalui tata kelola pemerintahan yang bersih dan pelayanan publik yang prima."
};

export const perangkatList: PerangkatMember[] = [
  {
    name: "Ahmad Yani, S.E.",
    role: "Sekretaris Desa",
    email: "sekdes@sukorame.desa.id",
    image: "https://picsum.photos/seed/sekdes35/400/500",
    initials: "AY",
    avatarColor: "#274E3D",
  },
  {
    name: "Siti Aminah, S.Ak.",
    role: "Kaur Keuangan",
    email: "keuangan@sukorame.desa.id",
    image: "https://picsum.photos/seed/kaur30/400/500",
    initials: "SA",
    avatarColor: "#3F6653",
  },
  {
    name: "Budi Santoso",
    role: "Kasi Pelayanan",
    email: "pelayanan@sukorame.desa.id",
    image: "https://picsum.photos/seed/kasi45/400/500",
    initials: "BS",
    avatarColor: "#57806B",
  },
  {
    name: "Dewi Lestari, S.Sos.",
    role: "Kasi Kesejahteraan",
    email: "kesejahteraan@sukorame.desa.id",
    image: "https://picsum.photos/seed/kasikes40/400/500",
    initials: "DL",
    avatarColor: "#709A84",
  },
  {
    name: "Eko Prasetyo",
    role: "Kepala Dusun Krajan",
    email: "krajan@sukorame.desa.id",
    image: "https://picsum.photos/seed/kadus28/400/500",
    initials: "EP",
    avatarColor: "#0E3727",
  }
];
