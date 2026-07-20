import { FaEnvira } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-gray-200 border-t-[#285A43]"></div>
        <FaEnvira className="h-6 w-6 text-[#285A43] animate-pulse" />
      </div>
      <p className="font-inter-500 text-[#285A43] animate-pulse">Memuat halaman...</p>
    </div>
  );
}
