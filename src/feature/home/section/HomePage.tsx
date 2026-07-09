import Hero from "../components/Hero";
import Tentang from "../components/Tentang";
import Potensi from "../components/Potensi";
import BeritaTerbaru from "../components/BeritaTerbaru";
import { Berita } from "@prisma/client";

interface HomePageProps {
  settings: Record<string, string>;
  latestBerita: Berita[];
}

const HomePage = ({ settings, latestBerita }: HomePageProps) => {
  return (
    <>
      <Hero settings={settings} />
      <Tentang settings={settings} />
      <Potensi />
      <BeritaTerbaru beritaData={latestBerita} />
    </>
  );
};

export default HomePage;
