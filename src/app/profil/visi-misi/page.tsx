import VisiMisiContainer from "@/feature/visi-misi/container/VisiMisiContainer";
import { getGlobalSettings } from "@/lib/settings";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Visi & Misi | Desa Sukorame",
  description: "Arah pembangunan dan komitmen Pemerintah Desa Sukorame untuk mewujudkan kesejahteraan masyarakat.",
};
export const revalidate = 3600;

export default async function VisiMisi() {
  const settings = await getGlobalSettings();
  const misiItems = await prisma.misi.findMany({ orderBy: { order: 'asc' } });
  const nilaiItems = await prisma.nilaiUtama.findMany({ orderBy: { order: 'asc' } });

  return <VisiMisiContainer settings={settings} misiItems={misiItems} nilaiItems={nilaiItems} />;
}
