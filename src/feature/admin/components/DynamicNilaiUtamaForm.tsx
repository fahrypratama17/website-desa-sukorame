"use client";

import { useState, useTransition } from "react";

export type NilaiUtamaItem = {
  icon: string;
  title: string;
  description: string;
};

export default function DynamicNilaiUtamaForm({ initialData, saveAction }: { initialData: string | undefined, saveAction: (formData: FormData) => Promise<void> }) {
  const [items, setItems] = useState<NilaiUtamaItem[]>(() => {
    if (!initialData) return [];
    try {
      const parsed = JSON.parse(initialData);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const addItem = () => {
    setItems([...items, { icon: "", title: "", description: "" }]);
  };

  const handleOpenDelete = (index: number) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;
    
    const newItems = [...items];
    newItems.splice(deleteIndex, 1);
    
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('desa_nilai_utama', JSON.stringify(newItems));
        await saveAction(formData);
        setItems(newItems);
        setDeleteIndex(null);
      } catch (error) {
        alert(error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus");
        setDeleteIndex(null);
      }
    });
  };

  const updateItem = (index: number, field: keyof NilaiUtamaItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;
    
    const newItems = [...items];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    const temp = newItems[index];
    newItems[index] = newItems[swapIndex];
    newItems[swapIndex] = temp;
    
    setItems(newItems);
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-inter-600 text-gray-700">Manajemen Kartu Nilai Utama</label>
        <button 
          type="button" 
          onClick={addItem}
          className="px-3 py-1.5 bg-[#E5F2EC] text-[#1C3F2D] text-xs font-inter-600 rounded-lg hover:bg-[#D1E8DD] transition flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Tambah Nilai
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50/30 relative group">
            <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button type="button" onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-1 text-gray-400 hover:text-[#1C3F2D] disabled:opacity-30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </button>
              <button type="button" onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1} className="p-1 text-gray-400 hover:text-[#1C3F2D] disabled:opacity-30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <button type="button" onClick={() => handleOpenDelete(index)} className="p-1 text-gray-400 hover:text-red-600 ml-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
            
            <div className="flex items-center gap-3 mb-3 pr-24">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1C3F2D] text-white text-xs font-inter-600 shrink-0">
                {index + 1}
              </span>
              <input 
                type="text" 
                value={item.title} 
                onChange={(e) => updateItem(index, 'title', e.target.value)}
                placeholder="Judul Nilai (contoh: Religius)" 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285A43] text-sm font-inter-500"
                required
              />
            </div>
            
            <div className="pl-9 space-y-3">
              <input 
                type="text" 
                value={item.icon} 
                onChange={(e) => updateItem(index, 'icon', e.target.value)}
                placeholder="URL Ikon (contoh: /assets/icons/hands.svg)" 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285A43] text-sm"
              />
              <textarea 
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                placeholder="Deskripsi panjang penjelasan nilai ini..." 
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285A43] text-sm resize-y"
                required
              />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl text-gray-400 text-sm">
            Belum ada Nilai Utama. Klik tombol "Tambah Nilai" di atas.
          </div>
        )}
      </div>

      {deleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2615]/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-montserrat-700 text-gray-900 mb-2">Hapus Nilai Ini?</h3>
            <p className="text-gray-500 font-inter-400 text-sm mb-6">
              Nilai "{items[deleteIndex]?.title || 'ini'}" akan dihapus secara permanen dari database.
            </p>
            <div className="flex justify-center gap-3">
              <button 
                type="button" 
                onClick={() => setDeleteIndex(null)} 
                disabled={isPending}
                className="px-5 py-2.5 text-gray-600 font-inter-600 hover:bg-gray-100 rounded-xl transition w-full"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={confirmDelete}
                disabled={isPending}
                className="px-5 py-2.5 bg-red-600 text-white font-inter-600 hover:bg-red-700 rounded-xl transition flex items-center justify-center gap-2 w-full"
              >
                {isPending ? (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      <input type="hidden" name="desa_nilai_utama" value={JSON.stringify(items)} />
    </div>
  );
}
