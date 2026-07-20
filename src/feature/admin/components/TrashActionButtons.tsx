'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FiRefreshCcw, FiTrash2, FiAlertTriangle } from 'react-icons/fi';

interface TrashActionButtonsProps {
  id: number;
  itemName: string;
  onRestore: (id: number) => Promise<any>;
  onHardDelete: (id: number) => Promise<any>;
}

export default function TrashActionButtons({ id, itemName, onRestore, onHardDelete }: TrashActionButtonsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<'NONE' | 'RESTORE' | 'HARD_DELETE'>('NONE');

  const handleRestore = () => {
    startTransition(async () => {
      await onRestore(id);
      setActiveModal('NONE');
      router.refresh();
    });
  };

  const handleHardDelete = () => {
    startTransition(async () => {
      await onHardDelete(id);
      setActiveModal('NONE');
      router.refresh();
    });
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setActiveModal('RESTORE')}
          disabled={isPending}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50"
          title="Pulihkan"
        >
          <FiRefreshCcw className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveModal('HARD_DELETE')}
          disabled={isPending}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
          title="Hapus Permanen"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>

      {activeModal === 'RESTORE' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2615]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <FiRefreshCcw className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-montserrat-700 text-center text-[#1C3F2D] mb-2 text-capitalize">Pulihkan {itemName}?</h3>
            <p className="text-center text-sm text-gray-500 font-inter-400 mb-6">
              Data ini akan dikembalikan ke daftar utama dengan status seperti semula.
            </p>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setActiveModal('NONE')}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-inter-600 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleRestore}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 text-white bg-green-600 hover:bg-green-700 rounded-xl font-inter-600 transition flex items-center justify-center gap-2"
              >
                {isPending ? 'Memproses...' : 'Pulihkan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'HARD_DELETE' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2615]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <FiAlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-montserrat-700 text-center text-[#1C3F2D] mb-2">Hapus Permanen?</h3>
            <p className="text-center text-sm text-gray-500 font-inter-400 mb-6">
              Data ini akan dihapus sepenuhnya dari sistem dan <b>tidak dapat dikembalikan lagi</b>. Anda yakin?
            </p>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setActiveModal('NONE')}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-inter-600 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleHardDelete}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl font-inter-600 transition flex items-center justify-center gap-2"
              >
                {isPending ? 'Menghapus...' : 'Hapus Permanen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
