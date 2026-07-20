import PerangkatPage from "../section/PerangkatPage";
import { Perangkat } from "@prisma/client";

interface PerangkatContainerProps {
  perangkatData: Perangkat[];
}

const PerangkatContainer = ({ perangkatData }: PerangkatContainerProps) => {
  return (
    <div>
      <PerangkatPage perangkatData={perangkatData} />
    </div>
  );
};

export default PerangkatContainer;
