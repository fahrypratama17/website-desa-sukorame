"use client";

import { useState, useTransition } from "react";
import type { Misi } from "@prisma/client";
import { FiPlus, FiEdit, FiTrash2, FiLoader, FiAlertTriangle } from "react-icons/fi";
import DynamicIcon from "@/shared/components/DynamicIcon";

interface DynamicMisiFormProps {
  initialData: Misi[];
  createAction: (formData: FormData) => Promise<void>;
  updateAction: (id: number, formData: FormData) => Promise<void>;
  deleteAction: (id: number) => Promise<{ success: boolean }>;
}

export default function DynamicMisiForm({ initialData, createAction, updateAction, deleteAction }: DynamicMisiFormProps) {
  const [items, setItems] = useState<Misi[]>(initialData);
  const [editingItem, setEditingItem] = useState<{ icon: string; title: string; description: string } | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const openAddForm = () => {
    setEditingItem({ icon: "", title: "", description: "" });
    setEditingId(null);
  };

  const openEditForm = (item: Misi) => {
    setEditingItem({ icon: item.icon || "", title: item.title, description: item.description });
    setEditingId(item.id);
  };

  const handleSave = () => {
    if (!editingItem) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("icon", editingItem.icon);
        formData.append("title", editingItem.title);
        formData.append("description", editingItem.description);
        formData.append("order", String(editingId ? items.find(i => i.id === editingId)?.order ?? 0 : 0));

        if (editingId) {
          await updateAction(editingId, formData);
        } else {
          await createAction(formData);
        }
        setEditingItem(null);
        setEditingId(null);
        // Data akan di-refresh oleh revalidatePath
        window.location.reload();
      } catch (error) {
        alert(error instanceof Error ? error.message : "Terjadi kesalahan");
      }
    });
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    startTransition(async () => {
      try {
        await deleteAction(deleteId);
        setItems(items.filter(i => i.id !== deleteId));
        setDeleteId(null);
      } catch (error) {
        alert(error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus");
        setDeleteId(null);
      }
    });
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-inter-600 text-gray-700">Manajemen Kartu Misi</label>
        <button
          type="button"
          onClick={openAddForm}
          className="px-3 py-1.5 bg-[#E5F2EC] text-[#1C3F2D] text-xs font-inter-600 rounded-lg hover:bg-[#D1E8DD] transition flex items-center gap-1"
        >
          <FiPlus className="w-4 h-4" />
          Tambah Misi
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50/30 relative group">
            <div className="absolute right-4 top-4 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <button type="button" onClick={() => openEditForm(item)} className="p-1 text-gray-400 hover:text-blue-600">
                <FiEdit className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => setDeleteId(item.id)} className="p-1 text-gray-400 hover:text-red-600 ml-2">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-2 pr-24">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1C3F2D] text-white text-xs font-inter-600 shrink-0">
                {index + 1}
              </span>
              <h4 className="font-inter-600 text-[#1C3F2D] text-sm">{item.title}</h4>
            </div>
            <div className="pl-9">
              {item.icon && <p className="text-xs text-gray-400 mb-1">Icon: {item.icon}</p>}
              <p className="text-sm text-gray-600 font-inter-400">{item.description}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl text-gray-400 text-sm">
            Belum ada Misi. Klik tombol &quot;Tambah Misi&quot; di atas.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2615]/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">
              {editingId ? "Edit Misi" : "Tambah Misi Baru"}
            </h3>
            <div>
              <label className="block text-sm font-inter-600 text-gray-700 mb-1">Judul Misi</label>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="Judul Singkat Misi"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285A43] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-inter-600 text-gray-700 mb-1">Nama Ikon (React Icons)</label>
              <input
                type="text"
                value={editingItem.icon}
                onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                placeholder="Contoh: FiTarget, FiHeart"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285A43] text-sm"
              />
              <p className="mt-2 text-xs text-gray-500 font-inter-400">
                Gunakan nama ikon dari <a href="https://react-icons.github.io/react-icons/icons/fi/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Feather Icons</a> (misal: FiTarget) atau <a href="https://react-icons.github.io/react-icons/icons/fa6/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FontAwesome 6</a> (misal: FaHeart).
              </p>

              {editingItem.icon && (
                <div className="mt-4 flex flex-col items-start gap-2">
                  <span className="text-xs font-inter-600 text-gray-500 uppercase">Preview Ikon</span>
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-green-50 relative flex items-center justify-center">
                    <DynamicIcon name={editingItem.icon} className="w-8 h-8 text-[#285A43]" />
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-inter-600 text-gray-700 mb-1">Deskripsi</label>
              <textarea
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Deskripsi panjang penjelasan misi ini..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285A43] text-sm resize-y"
              />
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
              <button type="button" onClick={() => { setEditingItem(null); setEditingId(null); }} disabled={isPending} className="w-full sm:w-auto text-center px-4 py-2 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition">
                Batal
              </button>
              <button type="button" onClick={handleSave} disabled={isPending} className="w-full sm:w-auto text-center px-4 py-2 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition flex items-center justify-center gap-2">
                {isPending ? (
                  <FiLoader className="w-4 h-4 animate-spin" />
                ) : null}
                {editingId ? "Simpan Perubahan" : "Tambah Misi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2615]/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-montserrat-700 text-gray-900 mb-2">Hapus Misi Ini?</h3>
            <p className="text-gray-500 font-inter-400 text-sm mb-6">
              Misi ini akan dihapus secara permanen dari database.
            </p>
            <div className="flex justify-center gap-3">
              <button type="button" onClick={() => setDeleteId(null)} disabled={isPending} className="px-5 py-2.5 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition w-full">
                Batal
              </button>
              <button type="button" onClick={confirmDelete} disabled={isPending} className="px-5 py-2.5 bg-red-600 text-white font-inter-600 hover:bg-red-700 rounded-xl transition flex items-center justify-center gap-2 w-full">
                {isPending ? (
                  <FiLoader className="w-5 h-5 animate-spin" />
                ) : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
