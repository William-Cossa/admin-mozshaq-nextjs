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
import { deleteCourse } from "@/lib/actions/courses";
import { Loader2, Trash2, MoreVertical } from "lucide-react";
import { toast } from "sonner";

interface DeleteCourseDialogProps {
  courseId: string;
  courseTitle: string;
  trigger?: React.ReactNode;
}

export function DeleteCourseDialog({ courseId, courseTitle, trigger }: DeleteCourseDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCourse(courseId);
      if (result.success) {
        toast.success(`Curso "${courseTitle}" removido com sucesso!`);
        setOpen(false);
      } else {
        toast.error(result.error || "Ocorreu um erro ao remover o curso.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all" title="Remover">
            <Trash2 size={16} />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600">Remover Curso</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover o curso <strong>{courseTitle}</strong>?
            Esta ação não pode ser desfeita. Todos os módulos, aulas e turmas associados
            serão removidos permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="rounded-lg font-bold"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg font-bold"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirmar Remoção
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
