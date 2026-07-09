"use client";

import { useState } from "react";

export default function ToastForm({ 
  action, 
  children, 
  className 
}: { 
  action: (formData: FormData) => Promise<void>; 
  children: React.ReactNode;
  className?: string;
}) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      await action(formData);
      setToast({ message: "Pengaturan berhasil disimpan!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error: any) {
      setToast({ message: error?.message || "Gagal menyimpan pengaturan.", type: 'error' });
      setTimeout(() => setToast(null), 5000);
    }
  };

  return (
    <>
      <form action={handleSubmit} className={className}>
        {children}
      </form>
      
      {/* Toast Notification Popup */}
      {toast && (
        <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 z-[100] transition-all transform translate-y-0 ${
          toast.type === 'success' ? 'bg-[#0A2615] border-[#1C3F2D] text-white' : 'bg-red-600 border-red-700 text-white'
        }`}>
          {toast.type === 'success' ? (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          )}
          <p className="font-inter-600 text-sm">{toast.message}</p>
        </div>
      )}
    </>
  );
}
