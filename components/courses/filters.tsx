"use client";

import { Search } from "lucide-react";

interface Props {
  onSearch?: (value: string) => void;
  onFilterType?: (type: string) => void;
}

export default function Filters({ onSearch, onFilterType }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
      <div className="relative flex-1 w-full md:max-w-md group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          className="w-full h-10 pl-10 pr-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
          placeholder="Pesquisar por nome ou modalidade..."
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      <select
        className="h-10 pl-3 pr-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold"
        onChange={(e) => onFilterType?.(e.target.value)}
      >
        <option value="">Todas Modalidades</option>
        <option value="ONLINE">Online</option>
        <option value="PRESENCIAL">Presencial</option>
        <option value="HIBRIDO">Híbrido</option>
      </select>
    </div>
  );
}
