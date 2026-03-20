"use client";

import { useState, useCallback } from "react";
import { Payment } from "@/types/types";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { PaymentDetailModal } from "./PaymentDetailModal";
import { Search, Calendar, SlidersHorizontal, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const STATUS_FILTERS = [
  { label: "Todos", value: "" },
  { label: "Pendente", value: "pending" },
  { label: "Aprovado", value: "approved" },
  { label: "Rejeitado", value: "rejected" },
];

interface PaymentTableProps {
  initialPayments: Payment[];
}

export function PaymentTable({ initialPayments }: PaymentTableProps) {
  const router = useRouter();

  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selected, setSelected] = useState<Payment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Client-side filtering (instant)
  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      p.studentName.toLowerCase().includes(q) ||
      p.courseName.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q);
    const matchStatus = !statusFilter || p.status === statusFilter;
    const matchDate = !dateFilter || p.createdAt.startsWith(dateFilter);
    return matchQ && matchStatus && matchDate;
  });

  const handleRowClick = (payment: Payment) => {
    setSelected(payment);
    setModalOpen(true);
  };

  // After approve/reject, refresh data from server
  const handleUpdate = useCallback(() => {
    router.refresh();
    // Optimistically sync local payments from server response is handled by server refresh
  }, [router]);

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Filters bar */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por aluno, curso ou ID..."
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>

          {/* Status pills */}
          <div className="flex gap-1.5 items-center overflow-x-auto">
            <SlidersHorizontal size={14} className="text-slate-400 shrink-0" />
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={[
                  "h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all",
                  statusFilter === f.value
                    ? "bg-primary text-white shadow shadow-primary/20"
                    : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Date filter */}
          <div className="relative">
            <Calendar
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-9 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 font-black">
                <th className="px-4 py-2.5">ID</th>
                <th className="px-4 py-2.5">Aluno</th>
                <th className="px-4 py-2.5">Curso</th>
                <th className="px-4 py-2.5">Montante</th>
                <th className="px-4 py-2.5">Data</th>
                <th className="px-4 py-2.5">Estado</th>
                <th className="px-4 py-2.5 text-right">Acção</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="group hover:bg-primary/[0.03] transition-colors cursor-pointer"
                  onClick={() => handleRowClick(p)}
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {p.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        {p.studentName.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {p.studentName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[180px] truncate font-medium">
                    {p.courseName}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white">
                    {formatAmount(p.amount)}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {formatDate(p.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <PaymentStatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      <Eye size={13} />
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-16 text-center text-slate-400 text-sm"
                  >
                    Nenhum pagamento encontrado para os filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer row count */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 font-medium">
          {filtered.length} de {payments.length} pagamentos
        </div>
      </div>

      <PaymentDetailModal
        payment={selected}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onUpdate={handleUpdate}
      />
    </>
  );
}
