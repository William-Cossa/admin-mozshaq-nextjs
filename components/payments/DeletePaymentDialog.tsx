"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deletePayment } from "@/lib/actions/payments";
import { Payment } from "@/types/types";

interface DeletePaymentDialogProps {
  payment: Payment;
  onSuccess?: (id: string) => void;
}

export function DeletePaymentDialog({
  payment,
  onSuccess,
}: DeletePaymentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deletePayment(payment.id);
        if (res) {
          toast.success(`Pagamento de ${payment.studentName} removido!`);
          setOpen(false);
          if (onSuccess) {
            onSuccess(payment.id);
          }
        }
      } catch (e: any) {
        toast.error(e.message || "Erro ao apagar pagamento");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500 transition-colors rounded-lg dark:hover:bg-slate-800"
          title="Apagar pagamento"
        >
          <Trash2 size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-lg border-none shadow-2xl bg-white dark:bg-slate-900 sm:max-w-[425px]" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900 dark:text-white">
            Confirmar Remoção
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 font-medium">
            Tem certeza que deseja apagar este pagamento de <span className="font-bold text-slate-900 dark:text-white">{payment.studentName}</span> para <span className="font-bold text-slate-900 dark:text-white">{payment.courseName}</span>?
            <br />Esta operação não pode ser revertida.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 pt-4 flex sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="rounded-lg font-bold border-slate-200 dark:border-slate-800"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg font-bold bg-red-500 hover:bg-red-600 text-white min-w-[100px]"
          >
            {isPending ? <Loader2 className="animate-spin" size={18} /> : "Remover"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
