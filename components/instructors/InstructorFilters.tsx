"use client";

import React, { useTransition } from "react";
import { Search, Download } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function InstructorFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const updateUrl = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-2 items-center justify-between">
      <div className="w-full lg:w-96 relative">
        <Search
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
            isPending ? "text-primary animate-pulse" : "text-slate-400"
          )}
          size={16}
        />
        <input
          type="text"
          placeholder="Procurar instrutor…"
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => updateUrl({ search: e.target.value || null })}
          className="w-full pl-10 pr-4 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-1 focus:ring-primary transition-all outline-none"
        />
      </div>
      <div className="flex items-center gap-2 w-full lg:w-auto">
        <select
          defaultValue={searchParams.get("status") || "all"}
          onChange={(e) => updateUrl({ status: e.target.value === "all" ? null : e.target.value })}
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-primary outline-none"
        >
          <option value="all">Todos os estados</option>
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
        </select>
        <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-500 hover:text-primary transition-colors">
          <Download size={16} />
        </button>
      </div>
    </div>
  );
}
