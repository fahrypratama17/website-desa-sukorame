import VisiMisiPage from "../section/VisiMisiPage";
import type { Misi, NilaiUtama } from "@prisma/client";

interface VisiMisiContainerProps {
  settings: Record<string, string>;
  misiItems: Misi[];
  nilaiItems: NilaiUtama[];
}

const VisiMisiContainer = ({ settings, misiItems, nilaiItems }: VisiMisiContainerProps) => {
  return (
    <div>
      <VisiMisiPage settings={settings} misiItems={misiItems} nilaiItems={nilaiItems} />
    </div>
  );
};

export default VisiMisiContainer;
