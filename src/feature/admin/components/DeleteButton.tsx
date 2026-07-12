"use client";

import { useState, useTransition } from "react";
import { FiTrash2, FiAlertTriangle, FiLoader } from "react-icons/fi";

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
    ? `Data ini akan diarsipkan ke Tong Sampah dan disembunyikan dari halaman publik. Jangan khawatir, Anda bisa memulihkannya kembali kapan saja.`
    : `Apakah Anda yakin ingin menghapus ${itemName}? Tindakan ini permanen dan tidak dapat dibatalkan.`;
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
        <FiTrash2 className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2615]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${iconColor}`}>
              <FiAlertTriangle className="w-6 h-6" />
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
                    <FiLoader className="w-4 h-4 animate-spin" />
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
