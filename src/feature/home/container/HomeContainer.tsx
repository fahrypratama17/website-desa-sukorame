import HomePage from "../section/HomePage";
import { Berita } from "@prisma/client";

interface HomeContainerProps {
  settings: Record<string, string>;
  latestBerita: Berita[];
}

const HomeContainer = ({ settings, latestBerita }: HomeContainerProps) => {
  return (
    <div>
      <HomePage settings={settings} latestBerita={latestBerita} />
    </div>
  );
};

export default HomeContainer;
