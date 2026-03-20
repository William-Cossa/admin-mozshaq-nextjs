"use client";

import { useState, useTransition } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import { rejectPayment } from "@/lib/actions/payments";
import { toast } from "sonner";

interface RejectModalProps {
  paymentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function RejectModal({
  paymentId,
  open,
  onOpenChange,
  onSuccess,
}: RejectModalProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = reason.trim();

    if (trimmed.length < 10) {
      setError("O motivo deve ter pelo menos 10 caracteres.");
      return;
    }

    setError("");
    startTransition(async () => {
      try {
        await rejectPayment(paymentId, trimmed);
        toast.success("Pagamento rejeitado com sucesso.");
        setReason("");
        onOpenChange(false);
        onSuccess();
      } catch {
        toast.error("Erro ao rejeitar pagamento. Tente novamente.");
      }
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <Dialog.Title className="text-base font-bold text-slate-900 dark:text-white">
                Rejeitar Pagamento
              </Dialog.Title>
              <Dialog.Description className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Indique o motivo da rejeição. O aluno será notificado.
              </Dialog.Description>
            </div>
            <Dialog.Close className="ml-auto text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <X size={18} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Motivo da Rejeição <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (error) setError("");
                }}
                rows={4}
                placeholder="Ex: Comprovativo ilegível. Por favor reenvie com melhor qualidade..."
                className="w-full resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
              {error && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>
              )}
              <p className="text-xs text-slate-400 mt-1.5">
                {reason.trim().length} / mín. 10 caracteres
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="flex-1 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                {isPending ? "A rejeitar..." : "Confirmar Rejeição"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
