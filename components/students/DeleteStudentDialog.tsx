"use client";

import { useState, useTransition } from "react";
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
import { deleteStudent } from "@/lib/actions/students";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteStudentDialogProps {
  studentId: string;
  studentName: string;
  trigger?: React.ReactNode;
}

export function DeleteStudentDialog({ studentId, studentName, trigger }: DeleteStudentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteStudent(studentId);
      if (result.success) {
        toast.success(`Estudante ${studentName} removido com sucesso!`);
        setOpen(false);
      } else {
        toast.error(result.error || "Ocorreu um erro ao remover o estudante.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={14} />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600">Remover Estudante</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover o estudante <strong>{studentName}</strong>?
            Esta ação não pode ser desfeita. As inscrições e pagamentos associados
            também serão removidos permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirmar Remoção
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
