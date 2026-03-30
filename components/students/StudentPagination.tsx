"use client";

import React, { useTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface StudentPaginationProps {
  total: number;
  page: number;
  limit: number;
}

export function StudentPagination({
  total,
  page,
  limit,
}: StudentPaginationProps) {
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

  if (total === 0) return (
    <div className="mt-auto p-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
      <p className="text-xs text-slate-400 font-medium">Nenhum resultado</p>
    </div>
  );

  return (
    <div className="mt-auto p-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        Mostrando {from} a {to} de {total} estudantes
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
            disabled={page <= 1 || isPending}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  disabled={isPending}
                  onClick={() => handlePageChange(p)}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm transition-colors",
                    p === page
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "hover:bg-white dark:hover:bg-slate-800 text-slate-500"
                  )}
                >
                  {p}
                </button>
              )
            )}
          </div>
          <button
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
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
