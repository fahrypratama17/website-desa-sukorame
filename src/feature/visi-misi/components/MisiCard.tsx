import type { ReactNode } from "react";

interface MisiCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const MisiCard = ({ icon, title, description }: MisiCardProps) => {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-xl border border-green-850/20 bg-white px-6 pt-8 pb-2 text-center transition-shadow duration-300 hover:shadow-lg">
      {/* Watermark Icon */}
      <div className="absolute -top-2 -right-2 z-0 scale-[4] text-green-50 opacity-[0.03]">
        {icon}
      </div>

      {/* Icon Circle — solid dark green */}
      <div className="bg-green-50 relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full text-white">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-inter-600 text-green-50 relative z-10 mb-2 text-base">
        {title}
      </h3>

      {/* Description */}
      <p className="font-inter-400 relative z-10 mb-6 text-sm leading-relaxed text-green-450">
        {description}
      </p>

      {/* Green accent bar at bottom */}
      <div className="bg-green-350 relative z-10 mt-auto h-1 w-16 rounded-full" />
    </div>
  );
};

export default MisiCard;
