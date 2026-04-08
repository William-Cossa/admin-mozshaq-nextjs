import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="p-3 rounded-lg bg-background border shadow-sm flex items-center justify-between group hover:border-primary/50 transition-all duration-300">
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-lg", color)}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
          {value}
        </h3>
      </div>
    </div>
    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full shrink-0">
      <TrendingUp size={10} />
      {trend}
    </span>
  </div>
);
