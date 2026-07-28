import Hero from "../components/Hero";
import Tentang from "../components/Tentang";
import Potensi from "../components/Potensi";
import BeritaTerbaru from "../components/BeritaTerbaru";
import { Berita, Potensi as PotensiType } from "@prisma/client";
import ScrollReveal from "@/shared/components/ScrollReveal";

interface HomePageProps {
  settings: Record<string, string>;
  latestBerita: Berita[];
  latestPotensi: PotensiType[];
}

const HomePage = ({ settings, latestBerita, latestPotensi }: HomePageProps) => {
  return (
    <>
      <ScrollReveal direction="none" className="relative z-20">
        <Hero settings={settings} />
      </ScrollReveal>
      <ScrollReveal className="relative z-10">
        <Tentang settings={settings} />
      </ScrollReveal>
      <ScrollReveal className="relative z-10">
        <Potensi potensiList={latestPotensi} />
      </ScrollReveal>
      <ScrollReveal className="relative z-10">
        <BeritaTerbaru beritaData={latestBerita} />
      </ScrollReveal>
    </>
  );
};

export default HomePage;
