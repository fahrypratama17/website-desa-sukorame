'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

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
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
        </button>
        <button
          onClick={() => setActiveModal('HARD_DELETE')}
          disabled={isPending}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
          title="Hapus Permanen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

      {activeModal === 'RESTORE' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2615]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
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
