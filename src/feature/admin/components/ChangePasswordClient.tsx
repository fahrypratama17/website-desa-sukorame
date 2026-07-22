'use client';

import { useState } from 'react';
import { changePassword } from '@/feature/admin/actions/akun';
import { useRouter } from 'next/navigation';
import { FiLock, FiLoader } from 'react-icons/fi';

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
      <div className="bg-gray-50/50 px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex items-center gap-3">
        <FiLock className="w-6 h-6 text-orange-500" />
        <div>
          <h3 className="text-lg font-montserrat-700 text-[#1C3F2D]">Ubah Kata Sandi</h3>
          <p className="text-sm text-gray-500 mt-1">Perbarui kata sandi akun Administrator Anda secara berkala untuk menjaga keamanan.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8 space-y-6">
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
            className={`w-full sm:w-auto justify-center px-6 py-2.5 bg-[#0A2615] text-white rounded-lg font-inter-600 hover:bg-[#1C3F2D] transition shadow-sm flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin h-5 w-5 text-white" />
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
