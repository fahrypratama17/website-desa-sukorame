import ProgramHeader from "../components/ProgramHeader.tsx";
import KategoriProgram from "../components/KategoriProgram.tsx";
import ProgramHighlight from "../components/ProgramHighlight.tsx";

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
