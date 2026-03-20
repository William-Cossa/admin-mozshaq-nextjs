import { cn } from "@/lib/utils";
import { PaymentStatus } from "@/types/types";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const config: Record<
  PaymentStatus,
  { label: string; className: string; icon: React.ElementType }
> = {
  pending: {
    label: "Pendente",
    className:
      "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
    icon: Clock,
  },
  approved: {
    label: "Aprovado",
    className:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejeitado",
    className: "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400",
    icon: XCircle,
  },
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const { label, className, icon: Icon } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide",
        className,
      )}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}
