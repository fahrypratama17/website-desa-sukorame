import PotensiContainer from "@/feature/potensi/container/PotensiContainer";

export const metadata = {
  title: "Potensi Desa | Desa Sukorame",
  description: "Jelajahi potensi unggulan, komoditas, dan produk lokal dari Desa Sukorame.",
};
export const dynamic = 'force-dynamic';

export default function Potensi() {
  return <PotensiContainer />;
}
