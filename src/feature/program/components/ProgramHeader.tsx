import { programHeaderData } from "../data/data.ts";

const ProgramHeader = () => {
  return (
    <section className="bg-[#FAF9F6] pt-24 pb-12">
      <div className="mx-auto flex w-[90%] max-w-3xl flex-col items-center text-center">
        <h1 className="font-montserrat-700 mb-6 text-4xl text-[#1C3F2D] lg:text-5xl">
          {programHeaderData.title}
        </h1>
        <p className="font-inter-400 text-lg leading-relaxed text-[#414844]">
          {programHeaderData.description}
        </p>
      </div>
    </section>
  );
};

export default ProgramHeader;
