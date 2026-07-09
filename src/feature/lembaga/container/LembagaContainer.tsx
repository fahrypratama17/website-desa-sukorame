import LembagaPage from "../section/LembagaPage";
import { Lembaga } from "@prisma/client";

interface LembagaContainerProps {
  lembagaData: Lembaga[];
}

const LembagaContainer = ({ lembagaData }: LembagaContainerProps) => {
  return (
    <div>
      <LembagaPage lembagaData={lembagaData} />
    </div>
  );
};

export default LembagaContainer;
