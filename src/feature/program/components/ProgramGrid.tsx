import prisma from "@/lib/prisma";

const ProgramGrid = async () => {
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: "desc" },
    where: { deletedAt: null },
  });

  if (programs.length === 0) return null;

  return (
    <section className="bg-[#FAF9F6] py-16">
      <div className="mx-auto w-[90%] max-w-6xl">
        <h2 className="font-montserrat-700 text-3xl text-[#1C3F2D] mb-8 text-center">
          Daftar Program Desa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {program.image ? (
                <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-inter-500">Tidak ada gambar</span>
                </div>
              )}
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-[#E5F2EC] text-[#1C3F2D] text-xs font-semibold rounded-full mb-3">
                  {program.kategori}
                </span>
                <h3 className="font-montserrat-700 text-lg text-[#1C3F2D] mb-2">
                  {program.title}
                </h3>
                <p className="font-inter-400 text-sm text-[#414844] line-clamp-3">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramGrid;
