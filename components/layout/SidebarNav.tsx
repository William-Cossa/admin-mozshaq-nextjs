"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings, HelpCircle } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation/nav-items";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex-1 overflow-y-auto space-y-1 py-6 px-4  w-full">
      {NAV_ITEMS.map((item) => {
        const active = pathname.startsWith(item.path);

        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              active
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-slate-600 hover:bg-muted "
            )}
          >
            <item.icon
              size={20}
              className={cn(
                active
                  ? "text-primary-foreground"
                  : " text-muted-foreground/80 group-hover:text-primary"
              )}
            />
            <span className="text-sm font-medium ">{item.label}</span>
          </Link>
        );
      })}

      <div className="mt-8 pt-4 border-t border-border/70 w-full text-sm">
        <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          Configurações
        </span>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <Settings size={20} /> Geral
        </Link>
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <HelpCircle size={20} /> Suporte
        </Link>
      </div>
    </div>
  );
}
