"use client";

import { useState, useTransition } from "react";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  itemName?: string;
  isSoftDelete?: boolean;
}

export default function DeleteButton({ onDelete, itemName = "data ini", isSoftDelete = false }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await onDelete();
      setIsOpen(false);
    });
  };

  const modalTitle = isSoftDelete ? "Pindahkan ke Tong Sampah?" : "Konfirmasi Hapus";
  const modalDesc = isSoftDelete 
    ? `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} akan dipindahkan ke Tong Sampah dan tidak akan tampil di halaman publik. Anda masih dapat memulihkannya nanti.`
    : `Apakah Anda yakin ingin menghapus ${itemName}? Tindakan ini tidak dapat dibatalkan.`;
  const confirmBtnText = isSoftDelete ? "Ya, Pindahkan" : "Hapus Data";
  const confirmBtnColor = isSoftDelete ? "bg-orange-600 hover:bg-orange-700" : "bg-red-600 hover:bg-red-700";
  const iconColor = isSoftDelete ? "bg-orange-100 text-orange-600" : "bg-red-100 text-red-600";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
        title="Hapus Data"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2615]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${iconColor}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-montserrat-700 text-center text-[#1C3F2D] mb-2">{modalTitle}</h3>
            <p className="text-center text-sm text-gray-500 font-inter-400 mb-6">
              {modalDesc}
            </p>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-inter-600 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className={`flex-1 px-4 py-2.5 text-white rounded-xl font-inter-600 transition flex items-center justify-center gap-2 ${confirmBtnColor}`}
              >
                {isPending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  confirmBtnText
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
