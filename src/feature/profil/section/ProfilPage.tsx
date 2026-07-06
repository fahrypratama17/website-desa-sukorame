import Breadcrumb from "../components/Breadcrumb.tsx";
import GambaranUmum from "../components/GambaranUmum.tsx";
import { profilHero } from "../data/data.ts";

const ProfilPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-[90%] pt-12">
        {/* Breadcrumb */}
        <Breadcrumb items={profilHero.breadcrumb} />

        {/* Hero Section */}
        <section className="mb-4">
          <h1 className="font-montserrat-700 text-green-50 mb-4 text-4xl">
            {profilHero.title}
          </h1>
          <p className="font-inter-400 text-green-350 max-w-2xl text-base leading-relaxed">
            {profilHero.subtitle}
          </p>
        </section>

        {/* Gambaran Umum */}
        <GambaranUmum />
      </div>
    </div>
  );
};

export default ProfilPage;
