import { IconType } from "react-icons";
import { FaBuilding, FaMapMarkerAlt, FaTree, FaTractor } from "react-icons/fa";

export interface MapLocation {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  icon: IconType;
  color: string;
}

export const villageLocations: MapLocation[] = [
  {
    id: "kantor-desa",
    name: "Kantor Kepala Desa Sukorame",
    description: "Pusat pemerintahan dan pelayanan publik Desa Sukorame.",
    latitude: -8.2172, // Koordinat akurat Desa Sukorame
    longitude: 112.3839,
    icon: FaBuilding,
    color: "#0A2615", // Hijau gelap (tema)
  },
  {
    id: "dusun-sukomulyo",
    name: "Dusun Sukomulyo",
    description: "Salah satu dusun utama di Desa Sukorame.",
    latitude: -8.2150,
    longitude: 112.3800,
    icon: FaMapMarkerAlt,
    color: "#25D366", // Hijau WA
  },
  {
    id: "dusun-sukodadi",
    name: "Dusun Sukodadi",
    description: "Dusun dengan potensi pertanian tebu yang subur.",
    latitude: -8.2200,
    longitude: 112.3870,
    icon: FaMapMarkerAlt,
    color: "#2B694D", // Hijau medium
  },
  {
    id: "punden",
    name: "Petilasan Mbah Irojoyo",
    description: "Situs bersejarah dan pusat kegiatan budaya Bersih Desa.",
    latitude: -8.2165,
    longitude: 112.3820,
    icon: FaTree,
    color: "#D35400", // Oranye
  },
  {
    id: "pertanian",
    name: "Sentra Pertanian Tebu",
    description: "Area perkebunan tebu unggulan milik warga.",
    latitude: -8.2220,
    longitude: 112.3890,
    icon: FaTractor,
    color: "#F39C12", // Kuning
  }
];
