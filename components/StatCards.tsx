import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="p-3 rounded-2xl bg-background border shadow-sm flex flex-col gap-1 group hover:border-primary/50 transition-all duration-300">
    <div className="flex items-start justify-between">
      <div className={cn("p-2 rounded-lg", color)}>
        <Icon size={18} />
      </div>
      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
        <TrendingUp size={10} />
        {trend}
      </span>
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
        {value}
      </h3>
    </div>
  </div>
);
