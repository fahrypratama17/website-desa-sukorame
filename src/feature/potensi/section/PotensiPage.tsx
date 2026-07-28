import PotensiHero from "../components/PotensiHero";
import PilarEkonomi from "../components/PilarEkonomi";
import SektorPertanian from "../components/SektorPertanian";
import ProdukUMKM from "../components/ProdukUMKM";
import ScrollReveal from "@/shared/components/ScrollReveal";

const PotensiPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <ScrollReveal direction="none">
        <PotensiHero />
      </ScrollReveal>
      <ScrollReveal>
        <PilarEkonomi />
      </ScrollReveal>
      <ScrollReveal>
        <SektorPertanian />
      </ScrollReveal>
      <ScrollReveal>
        <ProdukUMKM />
      </ScrollReveal>
    </div>
  );
};

export default PotensiPage;
