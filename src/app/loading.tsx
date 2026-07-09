export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-gray-200 border-t-[#285A43]"></div>
        <img src="/assets/icons/leaf-green.svg" alt="Loading" className="h-6 w-6 animate-pulse" />
      </div>
      <p className="font-inter-500 text-[#285A43] animate-pulse">Memuat halaman...</p>
    </div>
  );
}
