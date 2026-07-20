import PotensiContainer from "@/feature/potensi/container/PotensiContainer";

export const metadata = {
  title: "Potensi Desa | Desa Sukorame",
  description: "Jelajahi potensi unggulan, komoditas, dan produk lokal dari Desa Sukorame.",
};
export const revalidate = 3600;

export default function Potensi() {
  return <PotensiContainer />;
}
