"use client";

import { useState, useTransition } from "react";
import type { Perangkat } from "@prisma/client";
import DeleteButton from "./DeleteButton";

type PerangkatClientProps = {
  initialData: Perangkat[];
  saveAction: (formData: FormData, id?: number) => Promise<void>;
  deleteAction: (id: number) => Promise<void>;
};

export default function PerangkatClient({ initialData, saveAction, deleteAction }: PerangkatClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Perangkat | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Perangkat) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
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
          <h2 className="text-2xl font-montserrat-700 text-[#1C3F2D]">Kelola Perangkat Desa</h2>
          <p className="text-[#414844] mt-1 font-inter-400">Daftar aparatur dan staf pemerintahan desa.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#0A2615] text-white rounded-lg font-inter-600 hover:bg-[#1C3F2D] transition flex items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Perangkat
        </button>
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
                    Belum ada data perangkat desa.
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
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
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
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <DeleteButton onDelete={() => deleteAction(item.id)} />
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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
                <label htmlFor="image" className="block text-sm font-inter-600 text-gray-700 mb-2">URL Foto (Opsional)</label>
                <input type="url" id="image" name="image" defaultValue={editingItem?.image || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" />
              </div>

              <div>
                <label htmlFor="quote" className="block text-sm font-inter-600 text-gray-700 mb-2">Kutipan / Pesan (Opsional)</label>
                <textarea id="quote" name="quote" defaultValue={editingItem?.quote || ''} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] resize-y"></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-6">
                <button type="button" onClick={handleClose} disabled={isPending} className="px-5 py-2.5 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition">
                  Batal
                </button>
                <button type="submit" disabled={isPending} className="px-5 py-2.5 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition shadow-sm flex items-center gap-2">
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
