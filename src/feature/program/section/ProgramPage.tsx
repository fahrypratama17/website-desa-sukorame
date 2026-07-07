import ProgramHeader from "../components/ProgramHeader";
import KategoriProgram from "../components/KategoriProgram";
import ProgramHighlight from "../components/ProgramHighlight";

const ProgramPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <ProgramHeader />
      <KategoriProgram />
      <ProgramHighlight />
    </div>
  );
};

export default ProgramPage;
