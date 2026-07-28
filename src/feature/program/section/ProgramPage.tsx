import ProgramHeader from "../components/ProgramHeader";
import KategoriProgram from "../components/KategoriProgram";
import ProgramHighlight from "../components/ProgramHighlight";
import ProgramGrid from "../components/ProgramGrid";
import { Suspense } from "react";
import ScrollReveal from "@/shared/components/ScrollReveal";

const ProgramPage = async () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <ScrollReveal direction="none">
        <ProgramHeader />
      </ScrollReveal>
      <ScrollReveal>
        <KategoriProgram />
      </ScrollReveal>
      <ScrollReveal>
        <ProgramHighlight />
      </ScrollReveal>
      <ScrollReveal>
        <Suspense fallback={<div className="text-center py-10">Memuat program...</div>}>
          <ProgramGrid />
        </Suspense>
      </ScrollReveal>
    </div>
  );
};

export default ProgramPage;
