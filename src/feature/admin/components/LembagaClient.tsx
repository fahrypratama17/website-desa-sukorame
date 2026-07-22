"use client";

import { useState, useTransition } from "react";
import type { Lembaga } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { FiTrash2, FiPlus, FiBox, FiEdit, FiX } from 'react-icons/fi';
import DynamicIcon from "@/shared/components/DynamicIcon";

type LembagaClientProps = {
  initialData: Lembaga[];
  saveAction: (formData: FormData, id?: number) => Promise<void>;
  deleteAction: (id: number) => Promise<void>;
};

export default function LembagaClient({ initialData, saveAction, deleteAction }: LembagaClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Lembaga | null>(null);
  const [isPending, startTransition] = useTransition();

  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setLogoUrl('');
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Lembaga) => {
    setEditingItem(item);
    setLogoUrl(item.logo || '');
    setError(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setLogoUrl('');
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



  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Kelola Lembaga Desa</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar lembaga dan organisasi kemasyarakatan di tingkat desa.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/lembaga/trash"
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
            Tambah Lembaga
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-gray-100 text-[#414844] font-inter-600 text-sm">
                <th className="px-4 sm:px-6 py-3 sm:py-4">No</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4">Lembaga</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 sm:px-6 py-12 text-center text-gray-500 font-inter-400">
                    Data lembaga desa masih kosong. Klik &quot;Tambah Lembaga&quot; untuk mendaftarkan organisasi desa.
                  </td>
                </tr>
              ) : (
                initialData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 font-inter-400">
                      {index + 1}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-4">
                        {item.logo ? (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-[#285A43]">
                            <DynamicIcon name={item.logo} className="w-6 h-6" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                            <FiBox className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <p className="font-inter-600 text-[#1C3F2D]">{item.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-sm">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FiEdit className="w-5 h-5" />
                        </button>
                        <DeleteButton itemName="lembaga" isSoftDelete={true} onDelete={() => deleteAction(item.id)} />
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
                {editingItem ? 'Edit Lembaga' : 'Tambah Lembaga'}
              </h3>
              <button onClick={handleClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-inter-600 text-gray-700 mb-2">Nama Lembaga <span className="text-red-500">*</span></label>
                <input type="text" id="name" name="name" defaultValue={editingItem?.name} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" placeholder="Contoh: Karang Taruna" />
              </div>

              <div>
                <label htmlFor="logo" className="block text-sm font-inter-600 text-gray-700 mb-2">Ikon Lembaga (React Icons)</label>
                
                {error && (
                  <div className="mb-3 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-inter-500 rounded-r-lg">
                    {error}
                  </div>
                )}

                <input 
                  type="text" 
                  id="logo" 
                  name="logo" 
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="Contoh: FiUsers, FiShield" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" 
                />
                
                <p className="mt-2 text-xs text-gray-500 font-inter-400">
                  Gunakan nama ikon dari <a href="https://react-icons.github.io/react-icons/icons/fi/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Feather Icons</a> (misal: FiUsers) atau <a href="https://react-icons.github.io/react-icons/icons/fa6/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FontAwesome 6</a> (misal: FaBuilding).
                </p>

                {logoUrl && (
                  <div className="mt-4 flex flex-col items-start gap-2">
                    <span className="text-xs font-inter-600 text-gray-500 uppercase">Preview Ikon</span>
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-green-50 relative flex items-center justify-center">
                      <DynamicIcon name={logoUrl} className="w-8 h-8 text-[#285A43]" />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-inter-600 text-gray-700 mb-2">Deskripsi Lembaga <span className="text-red-500">*</span></label>
                <textarea id="description" name="description" defaultValue={editingItem?.description || ''} required rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y" placeholder="Jelaskan peran dan fungsi lembaga ini..."></textarea>
              </div>

              <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
                <button type="button" onClick={handleClose} disabled={isPending} className="w-full sm:w-auto text-center px-5 py-2.5 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition">
                  Batal
                </button>
                <button type="submit" disabled={isPending} className="w-full sm:w-auto text-center px-5 py-2.5 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition shadow-sm flex items-center justify-center gap-2">
                  {isPending ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
