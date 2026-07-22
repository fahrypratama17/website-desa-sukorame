import { FiMenu } from 'react-icons/fi';

export default function AdminHeader({ 
  userName, 
  onMenuClick 
}: { 
  userName: string;
  onMenuClick?: () => void;
}) {
  const initial = userName.charAt(0).toUpperCase() || 'A';

  return (
    <header className="bg-white border-b border-gray-200 p-4 md:p-6 flex justify-between items-center sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          aria-label="Toggle menu"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        <h1 className="text-lg md:text-xl font-montserrat-600 text-[#1C3F2D] hidden sm:block">Manajemen Desa</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#285A43] to-[#1C3F2D] text-white flex items-center justify-center font-bold text-sm shadow-inner cursor-pointer hover:opacity-90 transition">
          {initial}
        </div>
        <span className="font-inter-500 text-sm text-gray-700 hidden sm:block">{userName}</span>
      </div>
    </header>
  );
}
