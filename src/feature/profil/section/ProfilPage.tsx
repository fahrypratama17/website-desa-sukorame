import Breadcrumb from "../components/Breadcrumb";
import GambaranUmum from "../components/GambaranUmum";
import { profilHero, gambaranUmum } from "../data/data";
import ScrollReveal from "@/shared/components/ScrollReveal";

interface ProfilPageProps {
  settings: Record<string, string>;
}

const ProfilPage = ({ settings }: ProfilPageProps) => {
  const title = `Profil ${settings.desa_nama || "Desa Sukorame"}`;
  const subtitle = settings.profil_hero_subtitle || profilHero.subtitle;

  const dynamicGambaran = {
    ...gambaranUmum,
    description: settings.gambaran_umum_deskripsi || gambaranUmum.description,
    stats: [
      { label: "LUAS WILAYAH", value: settings.statistik_luas || "450 Ha" },
      { label: "KETINGGIAN", value: settings.statistik_ketinggian || "350 mdpl" },
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-[90%] pt-12">
        <ScrollReveal direction="none">
          {/* Breadcrumb */}
          <Breadcrumb items={profilHero.breadcrumb} />

          {/* Hero Section */}
          <section className="mb-4">
            <h1 className="font-montserrat-700 text-green-50 mb-4 text-4xl">
              {title}
            </h1>
            <p className="font-inter-400 text-green-350 max-w-2xl text-base leading-relaxed">
              {subtitle}
            </p>
          </section>
        </ScrollReveal>

        {/* Gambaran Umum */}
        <ScrollReveal>
          <GambaranUmum data={dynamicGambaran} />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default ProfilPage;
