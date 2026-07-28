import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import FormLokasi from '@/feature/admin/components/lokasi/FormLokasi';

export default function TambahLokasiPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/lokasi" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">
          <FiArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Tambah Lokasi</h2>
          <p className="text-[#414844] mt-1 font-inter-400 text-sm">Tambahkan titik lokasi baru ke dalam peta.</p>
        </div>
      </div>

      <FormLokasi />
    </div>
  );
}
