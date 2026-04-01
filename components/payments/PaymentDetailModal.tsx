"use client";

import { useState, useTransition } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  User,
  BookOpen,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { Payment } from "@/types/types";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { RejectModal } from "./RejectModal";
import { approvePayment } from "@/lib/actions/payments";
import { toast } from "sonner";

interface PaymentDetailModalProps {
  payment: Payment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export function PaymentDetailModal({
  payment,
  open,
  onOpenChange,
  onUpdate,
}: PaymentDetailModalProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imgError, setImgError] = useState(false);

  if (!payment) return null;

  const handleApprove = () => {
    startTransition(async () => {
      try {
        await approvePayment(payment.id);
        toast.success("Pagamento aprovado com sucesso!");
        onOpenChange(false);
        onUpdate();
      } catch {
        toast.error("Erro ao aprovar pagamento. Tente novamente.");
      }
    });
  };

  const formattedDate = new Date(payment.createdAt).toLocaleDateString(
    "pt-BR",
    { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" },
  );

  const formattedAmount = new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
  }).format(payment.amount);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <Dialog.Title className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Detalhes do Pagamento
                  <span className="font-mono text-xs text-slate-400 font-normal">
                    #{payment.id}
                  </span>
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  Informações completas do pagamento do aluno
                </Dialog.Description>
              </div>
              <div className="flex items-center gap-3">
                <PaymentStatusBadge status={payment.status} />
                <Dialog.Close className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X size={18} />
                </Dialog.Close>
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1">
              {/* Info fields */}
              <div className="grid grid-cols-2 gap-3 p-6 pb-4">
                {[
                  { icon: User, label: "Aluno", value: payment.studentName },
                  { icon: BookOpen, label: "Curso", value: payment.courseName },
                  { icon: DollarSign, label: "Montante", value: formattedAmount },
                  { icon: Calendar, label: "Data de Submissão", value: formattedDate },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3.5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={13} className="text-slate-400" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                        {label}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Rejection reason */}
              {payment.status === "rejected" && payment.rejectionReason && (
                <div className="mx-6 mb-4 flex items-start gap-3 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 p-3.5">
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-0.5 uppercase tracking-wide">
                      Motivo da Rejeição
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      {payment.rejectionReason}
                    </p>
                  </div>
                </div>
              )}

              {/* Proof image */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Comprovativo de Pagamento
                  </p>
                  <a
                    href={payment.paymentProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    <ExternalLink size={11} />
                    Abrir original
                  </a>
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-video flex items-center justify-center">
                  {imgError ? (
                    <div className="text-center text-slate-400 py-8">
                      <AlertCircle size={32} className="mx-auto mb-2" />
                      <p className="text-sm">Não foi possível carregar a imagem</p>
                    </div>
                  ) : (
                    <img
                      src={payment.paymentProof}
                      alt="Comprovativo de pagamento"
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Footer actions — only for pending */}
            {payment.status === "pending" && (
              <div className="flex gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="flex-1 h-10 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle size={15} />
                  Rejeitar
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isPending}
                  className="flex-1 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-60"
                >
                  {isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={15} />
                  )}
                  {isPending ? "A aprovar..." : "Aprovar"}
                </button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <RejectModal
        paymentId={payment.id}
        open={showRejectModal}
        onOpenChange={setShowRejectModal}
        onSuccess={() => {
          onOpenChange(false);
          onUpdate();
        }}
      />
    </>
  );
}
