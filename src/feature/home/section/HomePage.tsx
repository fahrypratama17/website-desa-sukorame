import Hero from "../components/Hero";
import Tentang from "../components/Tentang";
import Potensi from "../components/Potensi";
import BeritaTerbaru from "../components/BeritaTerbaru";
import { Berita, Potensi as PotensiType } from "@prisma/client";

interface HomePageProps {
  settings: Record<string, string>;
  latestBerita: Berita[];
  latestPotensi: PotensiType[];
}

const HomePage = ({ settings, latestBerita, latestPotensi }: HomePageProps) => {
  return (
    <>
      <Hero settings={settings} />
      <Tentang settings={settings} />
      <Potensi potensiList={latestPotensi} />
      <BeritaTerbaru beritaData={latestBerita} />
    </>
  );
};

export default HomePage;
