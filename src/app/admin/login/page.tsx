import LoginForm from '@/feature/admin/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-850/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-250/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 mx-4">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-[#0A2615] rounded-xl flex items-center justify-center mb-4 shadow-lg rotate-3">
            <svg className="w-8 h-8 text-white -rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
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
