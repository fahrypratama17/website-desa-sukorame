export default function AdminLoading() {
  return (
    <div className="flex h-full min-h-[60vh] w-full flex-col items-center justify-center gap-4">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-gray-200 border-t-[#285A43]"></div>
      </div>
      <p className="font-inter-500 text-sm text-gray-500 animate-pulse">Memuat data...</p>
    </div>
  );
}
