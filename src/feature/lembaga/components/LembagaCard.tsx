import Link from "next/link";

interface LembagaCardProps {
  name: string;
  description: string;
  logo: string;
}

const LembagaCard = ({ name, description, logo }: LembagaCardProps) => {
  return (
    <div className="flex flex-col rounded-[24px] bg-white p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-[#E5F3EF]">
        <img src={logo} alt={name} className="size-5" />
      </div>
      <h3 className="font-montserrat-700 text-green-50 mb-3 text-lg">{name}</h3>
      <p className="font-inter-400 mb-6 text-sm leading-relaxed text-[#5F6561] flex-1">
        {description}
      </p>
      <Link
        href="#"
        className="font-inter-600 text-green-50 flex w-fit items-center gap-2 text-xs transition-colors hover:text-green-700"
      >
        Detail
        <img
          src="/assets/icons/arrow.svg"
          alt="arrow"
          className="size-3"
        />
      </Link>
    </div>
  );
};

export default LembagaCard;
