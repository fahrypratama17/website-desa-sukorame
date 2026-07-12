"use client";

import { useState, useTransition } from "react";
import type { Perangkat } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { uploadImage } from '@/feature/admin/actions/upload';
import { FiTrash2, FiPlus, FiUser, FiEdit, FiX } from 'react-icons/fi';

type PerangkatClientProps = {
  initialData: Perangkat[];
  saveAction: (formData: FormData, id?: number) => Promise<void>;
  deleteAction: (id: number) => Promise<void>;
};

export default function PerangkatClient({ initialData, saveAction, deleteAction }: PerangkatClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Perangkat | null>(null);
  const [isPending, startTransition] = useTransition();

  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setImageUrl('');
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Perangkat) => {
    setEditingItem(item);
    setImageUrl(item.image || '');
    setError(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageUrl('');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await saveAction(formData, editingItem?.id);
        handleClose();
      } catch (error) {
        alert(error instanceof Error ? error.message : "Terjadi kesalahan");
      }
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran foto maksimal adalah 2 MB. Silakan pilih atau kompres foto yang lebih kecil.");
      return;
    }

    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "perangkat");

    const result = await uploadImage(formData);
    setIsUploading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      setImageUrl(result.url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Kelola Perangkat Desa</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar aparatur dan staf pemerintahan desa.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/perangkat/trash"
            className="px-4 py-2.5 bg-red-50 text-red-700 rounded-lg font-inter-600 hover:bg-red-100 transition flex items-center gap-2 border border-red-200"
            title="Lihat Data yang Terhapus"
          >
            <FiTrash2 className="w-5 h-5" />
            <span className="hidden sm:inline">Tong Sampah</span>
          </Link>
          <button 
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-[#0A2615] text-white rounded-lg font-inter-600 hover:bg-[#1C3F2D] transition flex items-center gap-2 shadow-sm"
          >
            <FiPlus className="w-5 h-5" />
            Tambah Perangkat
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100 text-[#414844] font-inter-600 text-sm">
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Perangkat</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500 font-inter-400">
                    Data tim perangkat desa masih kosong. Klik &quot;Tambah Perangkat&quot; untuk memperkenalkan tim Anda.
                  </td>
                </tr>
              ) : (
                initialData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-inter-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-200" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                            <FiUser className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-[#1C3F2D]">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.role} • {item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FiEdit className="w-5 h-5" />
                        </button>
                        <DeleteButton itemName="perangkat" isSoftDelete={true} onDelete={() => deleteAction(item.id)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2615]/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8 transform transition-all flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-montserrat-700 text-[#1C3F2D]">
                {editingItem ? 'Edit Perangkat' : 'Tambah Perangkat'}
              </h3>
              <button onClick={handleClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-inter-600 text-gray-700 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                <input type="text" id="name" name="name" defaultValue={editingItem?.name} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-inter-600 text-gray-700 mb-2">Jabatan <span className="text-red-500">*</span></label>
                <input type="text" id="role" name="role" defaultValue={editingItem?.role} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="Contoh: Kepala Desa" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-inter-600 text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                <input type="email" id="email" name="email" defaultValue={editingItem?.email} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-inter-600 text-gray-700 mb-2">Foto Perangkat (Opsional)</label>
                
                {error && (
                  <div className="mb-3 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-inter-500 rounded-r-lg">
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={isUploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-inter-600 file:bg-[#E5F2EC] file:text-[#1C3F2D] hover:file:bg-[#C9E6D7] transition cursor-pointer border border-gray-200 rounded-xl"
                  />
                  {isUploading && <p className="text-sm text-[#285A43] mt-2 font-inter-500 animate-pulse">Mengunggah foto...</p>}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-xs text-gray-400 font-inter-500 uppercase">ATAU URL MANUAL</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <input 
                  type="text" 
                  id="image" 
                  name="image" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/assets/perangkat/foto.jpg" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" 
                />
                
                {imageUrl && (
                  <div className="mt-4 w-24 h-24 rounded-full overflow-hidden border border-gray-200 bg-gray-50 relative flex items-center justify-center">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover relative z-10" 
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="quote" className="block text-sm font-inter-600 text-gray-700 mb-2">Kutipan / Pesan (Opsional)</label>
                <textarea id="quote" name="quote" defaultValue={editingItem?.quote || ''} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-6">
                <button type="button" onClick={handleClose} disabled={isPending || isUploading} className="px-5 py-2.5 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition">
                  Batal
                </button>
                <button type="submit" disabled={isPending || isUploading} className="px-5 py-2.5 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition shadow-sm flex items-center gap-2">
                  {isPending ? 'Menyimpan...' : (isUploading ? 'Tunggu Upload...' : 'Simpan')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
