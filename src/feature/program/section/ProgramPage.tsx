import ProgramHeader from "../components/ProgramHeader";
import KategoriProgram from "../components/KategoriProgram";
import ProgramHighlight from "../components/ProgramHighlight";
import ProgramGrid from "../components/ProgramGrid";
import { Suspense } from "react";

const ProgramPage = async () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <ProgramHeader />
      <KategoriProgram />
      <ProgramHighlight />
      <Suspense fallback={<div className="text-center py-10">Memuat program...</div>}>
        <ProgramGrid />
      </Suspense>
    </div>
  );
};

export default ProgramPage;
