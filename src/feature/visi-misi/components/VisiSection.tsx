import { visiData } from "../data/data";

const VisiSection = () => {
  return (
    <section className="mb-16">
      <div className="from-green-50 to-green-150 rounded-2xl bg-gradient-to-br px-10 py-12 md:px-16 md:py-16">
        {/* Badge */}
        <div className="mb-8 flex justify-start">
          <span className="font-inter-600 rounded-full border border-green-650/40 bg-green-250/50 px-5 py-1.5 text-xs tracking-widest text-green-850">
            {visiData.badge}
          </span>
        </div>

        {/* Quote */}
        <blockquote className="font-montserrat-700 mb-8 text-left text-2xl leading-snug text-white md:text-3xl lg:text-4xl">
          {visiData.quote}
        </blockquote>

        {/* Penjelasan */}
        <p className="font-inter-400 text-left text-base leading-relaxed text-green-750/80">
          {visiData.description}
        </p>
      </div>
    </section>
  );
};

export default VisiSection;
