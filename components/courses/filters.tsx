"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export default function Filters() {
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

    // Reset to page 1 on search or filter change
    if (newParams.search !== undefined || newParams.type !== undefined) {
      params.set("page", "1");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
      <div className="relative flex-1 w-full md:max-w-md group">
        <Search
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
            isPending ? "text-primary animate-pulse" : "text-slate-400"
          )}
          size={16}
        />
        <input
          className="w-full h-10 pl-10 pr-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-1 focus:ring-primary transition-all"
          placeholder="Pesquisar por nome..."
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => updateUrl({ search: e.target.value || null })}
        />
      </div>

      <select
        className="h-10 pl-3 pr-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-primary"
        defaultValue={searchParams.get("type") || ""}
        onChange={(e) => updateUrl({ type: e.target.value || null })}
      >
        <option value="">Todas Modalidades</option>
        <option value="ONLINE">Online</option>
        <option value="PRESENCIAL">Presencial</option>
        <option value="HIBRIDO">Híbrido</option>
      </select>
    </div>
  );
}
