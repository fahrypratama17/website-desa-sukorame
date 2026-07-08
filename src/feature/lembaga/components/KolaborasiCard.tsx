"use client";

interface KolaborasiCardProps {
  title: string;
  description: string;
  image: string;
}

const KolaborasiCard = ({ title, description, image }: KolaborasiCardProps) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2">
      <div className="h-48 w-full bg-gray-200">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover" 
          onError={(e) => {
            // Fallback if image doesn't exist yet
            e.currentTarget.src = "/assets/images/program-placeholder.png";
          }}
        />
      </div>
      <div className="flex flex-col p-6">
        <h3 className="font-montserrat-700 text-green-50 mb-2 text-lg">
          {title}
        </h3>
        <p className="font-inter-400 text-sm leading-relaxed text-[#5F6561]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default KolaborasiCard;
