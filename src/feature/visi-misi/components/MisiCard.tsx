import Image from "next/image";

interface MisiCardProps {
  icon: string;
  title: string;
  description: string;
}

const MisiCard = ({ icon, title, description }: MisiCardProps) => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-xl border-2 border-green-850/50 bg-white px-6 pt-8 pb-2 text-center transition-shadow duration-300 hover:shadow-lg">
      {/* Accent icon — top right */}
      <Image
        src={icon}
        alt=""
        width={56}
        height={56}
        className="absolute -top-4 -right-4 z-0 h-14 w-14 opacity-[0.12] invert"
      />

      {/* Icon Circle — solid dark green */}
      <div className="bg-green-50 relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full">
        <Image src={icon} alt={title} width={28} height={28} className="size-7" />
      </div>

      {/* Title */}
      <h3 className="font-inter-600 text-green-50 mb-2 text-base">
        {title}
      </h3>

      {/* Description */}
      <p className="font-inter-400 mb-6 text-sm leading-relaxed text-green-450">
        {description}
      </p>

      {/* Green accent bar at bottom */}
      <div className="bg-green-850/50 mt-auto h-1 w-16 rounded-full" />
    </div>
  );
};

export default MisiCard;
