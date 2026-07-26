import LoginForm from '@/feature/admin/components/LoginForm';
import { FiHome } from 'react-icons/fi';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-850/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-250/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 mx-4">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-[#0A2615] rounded-xl flex items-center justify-center mb-4 shadow-lg rotate-3">
            <FiHome className="w-8 h-8 text-white -rotate-3" />
          </div>
          <h1 className="text-2xl font-montserrat-700 text-[#1C3F2D]">CMS Desa Sukorame</h1>
          <p className="text-sm font-inter-400 text-gray-500 mt-2">Silakan masuk menggunakan kredensial admin Anda</p>
        </div>

        <LoginForm />
        
        <div className="mt-8 text-center">
          <p className="text-xs font-inter-400 text-gray-400">&copy; {new Date().getFullYear()} Pemerintah Desa Sukorame</p>
        </div>
      </div>
    </div>
  );
}
