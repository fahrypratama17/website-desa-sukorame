import BeritaPageSection from "../section/BeritaPageSection";
import { Berita } from "@prisma/client";

interface BeritaContainerProps {
  beritaData: Berita[];
  totalPages: number;
}

const BeritaContainer = ({ beritaData, totalPages }: BeritaContainerProps) => {
  return (
    <>
      <BeritaPageSection beritaData={beritaData} totalPages={totalPages} />
    </>
  );
};

export default BeritaContainer;
