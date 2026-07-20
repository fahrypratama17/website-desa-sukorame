import PotensiHero from "../components/PotensiHero";
import PilarEkonomi from "../components/PilarEkonomi";
import SektorPertanian from "../components/SektorPertanian";
import ProdukUMKM from "../components/ProdukUMKM";

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
