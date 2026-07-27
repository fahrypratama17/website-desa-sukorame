import HomePage from "../section/HomePage";
import { Berita, Potensi } from "@prisma/client";

interface HomeContainerProps {
  settings: Record<string, string>;
  latestBerita: Berita[];
  latestPotensi: Potensi[];
}

const HomeContainer = ({ settings, latestBerita, latestPotensi }: HomeContainerProps) => {
  return (
    <div>
      <HomePage settings={settings} latestBerita={latestBerita} latestPotensi={latestPotensi} />
    </div>
  );
};

export default HomeContainer;
