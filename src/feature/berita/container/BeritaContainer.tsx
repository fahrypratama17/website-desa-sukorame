import BeritaPageSection from "../section/BeritaPageSection";
import { Berita } from "@prisma/client";

interface BeritaContainerProps {
  beritaData: Berita[];
}

const BeritaContainer = ({ beritaData }: BeritaContainerProps) => {
  return (
    <>
      <BeritaPageSection beritaData={beritaData} />
    </>
  );
};

export default BeritaContainer;
