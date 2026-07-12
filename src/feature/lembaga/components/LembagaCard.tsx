import Link from "next/link";
import DynamicIcon from "@/shared/components/DynamicIcon";
import { FiArrowRight } from "react-icons/fi";

interface LembagaCardProps {
  name: string;
  description: string;
  logo: string;
}

const LembagaCard = ({ name, description, logo }: LembagaCardProps) => {
  return (
    <div className="flex flex-col rounded-xl md:rounded-[24px] bg-white p-4 md:p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-4 md:mb-6 flex size-10 md:size-12 items-center justify-center rounded-full bg-[#E5F3EF]">
        <DynamicIcon name={logo} className="size-4 md:size-5 text-[#285A43]" />
      </div>
      <h3 className="font-montserrat-700 text-green-50 mb-2 md:mb-3 text-sm md:text-lg">{name}</h3>
      <p className="font-inter-400 mb-4 md:mb-6 text-xs md:text-sm line-clamp-3 md:line-clamp-none leading-relaxed text-[#5F6561] flex-1">
        {description}
      </p>
      <Link
        href="#"
        className="font-inter-600 text-green-50 flex w-fit items-center gap-2 text-xs transition-colors hover:text-green-700"
      >
        Detail
        <FiArrowRight className="size-3" />
      </Link>
    </div>
  );
};

export default LembagaCard;
