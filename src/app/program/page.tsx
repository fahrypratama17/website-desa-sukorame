import ProgramContainer from "@/feature/program/container/ProgramContainer";

export const metadata = {
  title: "Program Desa | Desa Sukorame",
  description: "Informasi program kerja, pembangunan, dan kegiatan strategis Pemerintah Desa Sukorame.",
};

export const dynamic = 'force-dynamic';

export default function Program() {
  return <ProgramContainer />;
}
