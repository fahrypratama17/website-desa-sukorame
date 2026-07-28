'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createLocation, updateLocation } from '@/feature/admin/actions/location';
import type { Location } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FiMapPin, FiBriefcase, FiHome, FiShoppingBag, FiInfo, FiActivity } from 'react-icons/fi';
import { FaBuilding, FaMosque, FaSchool, FaTree, FaHospital, FaHandshake, FaMonument, FaStore, FaArchway, FaUniversity } from 'react-icons/fa';

const iconOptions = [
  { value: 'FiBriefcase', label: 'Bisnis/Usaha', icon: FiBriefcase },
  { value: 'FaHospital', label: 'Fasilitas Kesehatan', icon: FaHospital },
  { value: 'FaBuilding', label: 'Gedung/Kantor (Pemerintahan)', icon: FaBuilding },
  { value: 'FaHandshake', label: 'Koperasi/Komunitas', icon: FaHandshake },
  { value: 'FaMosque', label: 'Masjid/Tempat Ibadah', icon: FaMosque },
  { value: 'FaMonument', label: 'Pemakaman/Petilasan', icon: FaMonument },
  { value: 'FiMapPin', label: 'Pin Lokasi Umum', icon: FiMapPin },
  { value: 'FaTree', label: 'Pohon/Taman', icon: FaTree },
  { value: 'FiHome', label: 'Rumah/Pemukiman', icon: FiHome },
  { value: 'FaSchool', label: 'Sekolah/Pendidikan', icon: FaSchool },
  { value: 'FaStore', label: 'Toko/Warung', icon: FaStore },
  { value: 'FaArchway', label: 'Tugu Perbatasan/Gapura', icon: FaArchway },
  { value: 'FaUniversity', label: 'Universitas/Kampus', icon: FaUniversity },
];

export default function FormLokasi({ location }: { location?: Location }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      latitude: parseFloat(formData.get('latitude') as string),
      longitude: parseFloat(formData.get('longitude') as string),
      icon: formData.get('icon') as string,
      color: formData.get('color') as string,
    };

    let result;
    if (location) {
      result = await updateLocation(location.id, data);
    } else {
      result = await createLocation(data);
    }

    setIsSubmitting(false);

    if (result.success) {
      router.push('/admin/lokasi');
      router.refresh();
    } else {
      setError(result.error || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-inter-500 text-sm rounded-r-lg shadow-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 md:col-span-2">
              <div>
                <label htmlFor="name" className="block text-sm font-inter-600 text-gray-700 mb-2">Nama Lokasi <span className="text-red-500">*</span></label>
                <input type="text" id="name" name="name" defaultValue={location?.name} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="Contoh: Kantor Kepala Desa" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-inter-600 text-gray-700 mb-2">Deskripsi <span className="text-red-500">*</span></label>
                <textarea id="description" name="description" defaultValue={location?.description} required rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y" placeholder="Jelaskan lokasi ini..."></textarea>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="latitude" className="block text-sm font-inter-600 text-gray-700 mb-2">Latitude (Garis Lintang) <span className="text-red-500">*</span></label>
                <input type="number" step="any" id="latitude" name="latitude" defaultValue={location?.latitude} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="Contoh: -8.220669" />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm font-inter-600 text-gray-700 mb-2">Longitude (Garis Bujur) <span className="text-red-500">*</span></label>
                <input type="number" step="any" id="longitude" name="longitude" defaultValue={location?.longitude} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="Contoh: 112.380401" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="icon" className="block text-sm font-inter-600 text-gray-700 mb-2">Pilih Ikon</label>
                <div className="relative">
                  <select id="icon" name="icon" defaultValue={location?.icon || 'FiMapPin'} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] appearance-none bg-white">
                    {iconOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="color" className="block text-sm font-inter-600 text-gray-700 mb-2">Warna Marker (Hex Code)</label>
                <div className="flex gap-3 items-center">
                  <input type="color" id="colorPicker" defaultValue={location?.color || '#0A2615'} onChange={(e) => {
                    const input = document.getElementById('color') as HTMLInputElement;
                    if (input) input.value = e.target.value;
                  }} className="h-12 w-12 rounded cursor-pointer" />
                  <input type="text" id="color" name="color" defaultValue={location?.color || '#0A2615'} required className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="#0A2615" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
            <Link href="/admin/lokasi" className="w-full sm:w-auto text-center px-6 py-3 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition">
              Batal
            </Link>
            <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto text-center px-6 py-3 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? 'Menyimpan...' : (location ? 'Simpan Perubahan' : 'Tambah Lokasi')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
