import { getPayments } from "@/lib/actions/payments";
import { PaymentTable } from "@/components/payments/PaymentTable";
import {
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function PaymentsPage() {
  const payments = await getPayments();

  const total = payments.length;
  const pending = payments.filter((p) => p.status === "pending").length;
  const approved = payments.filter((p) => p.status === "approved").length;
  const rejected = payments.filter((p) => p.status === "rejected").length;
  const totalAmount = payments
    .filter((p) => p.status === "approved")
    .reduce((sum, p) => sum + p.amount, 0);

  const formatAmount = (n: number) =>
    new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      maximumFractionDigits: 0,
    }).format(n);

  const stats = [
    {
      label: "Total de Pagamentos",
      value: total,
      icon: CreditCard,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
      trend: "Todos os registos",
    },
    {
      label: "Pendentes",
      value: pending,
      icon: Clock,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
      trend: pending > 0 ? "Requer acção" : "Sem pendências",
      urgent: pending > 0,
    },
    {
      label: "Aprovados",
      value: approved,
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
      trend: `${total > 0 ? Math.round((approved / total) * 100) : 0}% do total`,
    },
    {
      label: "Receita Aprovada",
      value: formatAmount(totalAmount),
      icon: TrendingUp,
      color: "text-violet-500 bg-violet-50 dark:bg-violet-500/10",
      trend: "Pagamentos aprovados",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Gestão de Pagamentos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Reveja e valide os comprovativos de pagamento das inscrições.
          </p>
        </div>

        {pending > 0 && (
          <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm font-bold px-4 py-2 rounded-lg">
            <Clock size={15} />
            {pending} pagamento{pending > 1 ? "s" : ""} pendente
            {pending > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={cn("p-2 rounded-lg", stat.color)}>
                <stat.icon size={16} />
              </div>
              <span
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full",
                  stat.urgent
                    ? "text-amber-600 bg-amber-100 dark:bg-amber-900/30"
                    : "text-slate-500 bg-slate-100 dark:bg-slate-800",
                )}
              >
                {stat.trend}
              </span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Payments table (client component with all filters) */}
      <PaymentTable initialPayments={payments} />
    </div>
  );
}
