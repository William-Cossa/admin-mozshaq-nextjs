"use client";

import { Search, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function UsersSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset to page 1 on new search
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="bg-background p-2 rounded-2xl border shadow-sm flex flex-col lg:flex-row gap-2 justify-between items-center">
      <div className="relative w-full lg:w-96 group">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
            isPending ? "text-primary animate-pulse" : "text-slate-400 group-focus-within:text-primary"
          }`}
          size={16}
        />
        <input
          className="w-full pl-10 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 transition-all outline-none"
          placeholder="Procurar pelo nome ou email…"
          type="text"
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <Filter size={16} className="text-slate-400" />
          <span>Mais filtros</span>
        </button>
      </div>
    </div>
  );
}
