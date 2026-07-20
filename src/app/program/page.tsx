import ProgramContainer from "@/feature/program/container/ProgramContainer";

export const metadata = {
  title: "Program Desa | Desa Sukorame",
  description: "Informasi program kerja, pembangunan, dan kegiatan strategis Pemerintah Desa Sukorame.",
};

export const revalidate = 3600;

export default function Program() {
  return <ProgramContainer />;
}
