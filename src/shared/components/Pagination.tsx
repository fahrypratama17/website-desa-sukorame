"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
      {/* Prev Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors shadow-sm"
        >
          <FiChevronLeft className="h-5 w-5" />
        </Link>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed">
          <FiChevronLeft className="h-5 w-5" />
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg font-inter-600 transition-all ${
              page === currentPage
                ? "bg-[#285A43] text-white shadow-md shadow-[#285A43]/20"
                : "border border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors shadow-sm"
        >
          <FiChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed">
          <FiChevronRight className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};

export default Pagination;
