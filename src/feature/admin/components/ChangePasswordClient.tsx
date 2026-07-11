'use client';

import { useState } from 'react';
import { changePassword } from '@/feature/admin/actions/akun';
import { useRouter } from 'next/navigation';

export default function ChangePasswordClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await changePassword(formData);
      
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset(); // Clear the form
        // Optionally redirect or show a bigger success message
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      setError('Terjadi kesalahan yang tidak terduga.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <div>
          <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Ubah Kata Sandi</h3>
          <p className="text-sm text-gray-500 mt-1">Perbarui kata sandi akun Administrator Anda secara berkala untuk menjaga keamanan.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
            <p className="text-sm text-green-700 font-inter-500">Kata sandi berhasil diubah! Silakan gunakan kata sandi baru ini pada login berikutnya.</p>
          </div>
        )}

        <div className="space-y-5 max-w-lg">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-inter-600 text-gray-700 mb-2">Kata Sandi Saat Ini</label>
            <input 
              type="password" 
              id="oldPassword" 
              name="oldPassword" 
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" 
              placeholder="Masukkan kata sandi lama..."
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-inter-600 text-gray-700 mb-2">Kata Sandi Baru</label>
            <input 
              type="password" 
              id="newPassword" 
              name="newPassword" 
              required
              minLength={6}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" 
              placeholder="Minimal 6 karakter"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-inter-600 text-gray-700 mb-2">Konfirmasi Kata Sandi Baru</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              required
              minLength={6}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43]" 
              placeholder="Ketik ulang kata sandi baru"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2.5 bg-[#0A2615] text-white rounded-lg font-inter-600 hover:bg-[#1C3F2D] transition shadow-sm flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Menyimpan...
              </>
            ) : (
              'Simpan Kata Sandi'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
