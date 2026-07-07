import PotensiHero from "../components/PotensiHero.tsx";
import PilarEkonomi from "../components/PilarEkonomi.tsx";
import SektorPertanian from "../components/SektorPertanian.tsx";
import ProdukUMKM from "../components/ProdukUMKM.tsx";

const PotensiPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <PotensiHero />
      <PilarEkonomi />
      <SektorPertanian />
      <ProdukUMKM />
    </div>
  );
};

export default PotensiPage;
