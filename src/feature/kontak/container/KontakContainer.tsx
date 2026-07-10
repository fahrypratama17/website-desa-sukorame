import KontakPage from "../section/KontakPage";

const KontakContainer = ({ settings }: { settings: Record<string, string> }) => {
  return <KontakPage settings={settings} />;
};

export default KontakContainer;
