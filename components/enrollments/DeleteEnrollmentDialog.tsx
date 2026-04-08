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
import { deleteEnrollment } from "@/lib/actions/enrollments";

interface DeleteEnrollmentDialogProps {
  enrollmentId: string;
  studentName: string;
}

export function DeleteEnrollmentDialog({
  enrollmentId,
  studentName,
}: DeleteEnrollmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deleteEnrollment(enrollmentId);
        if (res.success) {
          toast.success(`Inscrição de ${studentName} removida com sucesso!`);
          setOpen(false);
        } else {
          toast.error(res.error || "Erro ao remover inscrição");
        }
      } catch (e) {
        toast.error("Erro na comunicação com o servidor");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500 transition-colors rounded-lg dark:hover:bg-slate-800"
          title="Apagar"
        >
          <Trash2 size={14} />
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-lg border-none shadow-2xl bg-white dark:bg-slate-900 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900 dark:text-white">
            Confirmar Remoção
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 font-medium font-bold">
            Tem certeza que deseja remover a inscrição de <span className="font-bold text-slate-900 dark:text-white">{studentName}</span>?
            Esta operação não pode ser revertida.
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
