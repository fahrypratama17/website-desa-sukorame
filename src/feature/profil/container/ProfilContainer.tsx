import ProfilPage from "../section/ProfilPage";

interface ProfilContainerProps {
  settings: Record<string, string>;
}

const ProfilContainer = ({ settings }: ProfilContainerProps) => {
  return (
    <div>
      <ProfilPage settings={settings} />
    </div>
  );
};

export default ProfilContainer;
