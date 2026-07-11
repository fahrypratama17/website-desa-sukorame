import ProfilContainer from "@/feature/profil/container/ProfilContainer";
import { getGlobalSettings } from "@/lib/settings";

export const metadata = {
  title: "Profil Desa | Desa Sukorame",
  description: "Sejarah, letak geografis, dan demografi penduduk Desa Sukorame.",
};
export const revalidate = 3600;

export default async function Profil() {
  const settings = await getGlobalSettings();
  
  return <ProfilContainer settings={settings} />;
}
