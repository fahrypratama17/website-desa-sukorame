import KontakPage from "../section/KontakPage";
import type { Location } from "@prisma/client";

const KontakContainer = ({ settings, locations = [] }: { settings: Record<string, string>; locations?: Location[] }) => {
  return <KontakPage settings={settings} locations={locations} />;
};

export default KontakContainer;
