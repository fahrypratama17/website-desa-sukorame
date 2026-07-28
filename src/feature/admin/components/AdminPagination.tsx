'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

interface AdminPaginationProps {
  totalPages: number;
}

export default function AdminPagination({ totalPages }: AdminPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
      <div className="flex flex-1 justify-between sm:hidden">
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="relative inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sebelumnya
          </Link>
        ) : (
          <button
            disabled
            className="relative inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400 opacity-50 cursor-not-allowed"
          >
            Sebelumnya
          </button>
        )}
        
        {currentPage < totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Selanjutnya
          </Link>
        ) : (
          <button
            disabled
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400 opacity-50 cursor-not-allowed"
          >
            Selanjutnya
          </button>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500 font-inter-400">
            Halaman <span className="font-medium">{currentPage}</span> dari <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {currentPage > 1 ? (
              <Link
                href={createPageUrl(currentPage - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition"
              >
                <span className="sr-only">Previous</span>
                <FiChevronLeft className="h-5 w-5" />
              </Link>
            ) : (
              <button
                disabled
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <FiChevronLeft className="h-5 w-5" />
              </button>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={createPageUrl(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2615] transition ${
                  currentPage === page
                    ? 'z-10 bg-[#0A2615] text-white focus-visible:outline-[#0A2615]'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50'
                }`}
              >
                {page}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link
                href={createPageUrl(currentPage + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition"
              >
                <span className="sr-only">Next</span>
                <FiChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <button
                disabled
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <FiChevronRight className="h-5 w-5" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
