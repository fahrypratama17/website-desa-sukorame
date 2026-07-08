import LoginForm from '../../../feature/admin/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#E8F0EA] p-4 relative overflow-hidden">
      {/* Decorative Background SVG */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute -top-20 -left-20 w-96 h-96 text-[#285A43]/5">
          <circle cx="50" cy="50" r="50" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] text-[#285A43]/5">
          <circle cx="50" cy="50" r="50" fill="currentColor" />
        </svg>
      </div>

      <div className="w-full max-w-md p-10 space-y-8 bg-white/80 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative z-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#0A2615] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-[#0A2615]/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-montserrat-700 text-[#1C3F2D]">Admin Login</h1>
          <p className="mt-2 text-sm text-[#414844] font-inter-400">Website Desa Sukorame</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
