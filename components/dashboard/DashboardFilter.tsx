"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const periods = [
  { value: "7d", label: "Últimos 7 Dias" },
  { value: "30d", label: "Últimos 30 Dias" },
  { value: "12m", label: "Últimos 12 Meses" },
  { value: "all", label: "Sempre" },
];

export default function DashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPeriod = searchParams.get("period") || "30d";
  const currentLabel = periods.find(p => p.value === currentPeriod)?.label || "Últimos 30 Dias";

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-sm font-bold py-2 px-4 transition-all"
        >
          <Calendar size={18} className="text-primary" />
          <span>{currentLabel}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {periods.map((p) => (
          <DropdownMenuItem 
            key={p.value} 
            onClick={() => handleSelect(p.value)}
            className={currentPeriod === p.value ? "bg-accent font-medium" : "cursor-pointer"}
          >
            {p.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
