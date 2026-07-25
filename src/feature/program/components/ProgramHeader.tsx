import { programHeaderData } from "../data/data";

const ProgramHeader = () => {
  return (
    <section className="bg-[#FAF9F6] pt-20 md:pt-24 pb-8 md:pb-12">
      <div className="mx-auto flex w-[90%] max-w-3xl flex-col items-center text-center">
        <h1 className="font-montserrat-700 mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl text-[#1C3F2D]">
          {programHeaderData.title}
        </h1>
        <p className="font-inter-400 text-base md:text-lg leading-relaxed text-[#414844]">
          {programHeaderData.description}
        </p>
      </div>
    </section>
  );
};

export default ProgramHeader;
