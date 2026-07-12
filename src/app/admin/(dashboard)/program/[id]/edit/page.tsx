import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProgramEditClient from '@/feature/admin/components/ProgramEditClient';

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const programId = parseInt(resolvedParams.id);
  
  if (isNaN(programId)) {
    notFound();
  }

  const program = await prisma.program.findUnique({
    where: { id: programId }
  });

  if (!program) {
    notFound();
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/program" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Edit Program</h2>
          <p className="text-[#414844] mt-1 font-inter-400 text-sm">Perbarui data program kerja desa.</p>
        </div>
      </div>

      <ProgramEditClient program={program} />
    </div>
  );
}
