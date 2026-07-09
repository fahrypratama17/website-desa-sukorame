"use client";

import { useState, useTransition } from "react";
import type { Misi } from "@prisma/client";

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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Misi
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50/30 relative group">
            <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button type="button" onClick={() => openEditForm(item)} className="p-1 text-gray-400 hover:text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button type="button" onClick={() => setDeleteId(item.id)} className="p-1 text-gray-400 hover:text-red-600 ml-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
              <label className="block text-sm font-inter-600 text-gray-700 mb-1">URL Ikon</label>
              <input
                type="text"
                value={editingItem.icon}
                onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                placeholder="/assets/icons/leaf.svg"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285A43] text-sm"
              />
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
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => { setEditingItem(null); setEditingId(null); }} disabled={isPending} className="px-4 py-2 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition">
                Batal
              </button>
              <button type="button" onClick={handleSave} disabled={isPending} className="px-4 py-2 bg-[#0A2615] text-white font-inter-600 hover:bg-[#1C3F2D] rounded-xl transition flex items-center gap-2">
                {isPending ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
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
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
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
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
