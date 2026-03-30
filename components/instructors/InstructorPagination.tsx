"use client";

import React, { useTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface InstructorPaginationProps {
  total: number;
  page: number;
  limit: number;
}

export function InstructorPagination({
  total,
  page,
  limit,
}: InstructorPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(total / limit);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  if (total === 0) return null;

  return (
    <div className="mt-auto p-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/10">
      <p className="text-xs text-slate-500 font-medium">
        Mostrando {from}-{to} de {total}
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
            disabled={page <= 1 || isPending}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400">
            Página {page} de {totalPages}
          </div>
          <button
            className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
            disabled={page >= totalPages || isPending}
            onClick={() => handlePageChange(page + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
