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
import { deleteUser } from "@/lib/actions/users";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteUserDialogProps {
  userId: string;
  userName: string;
  trigger?: React.ReactNode;
}

export function DeleteUserDialog({ userId, userName, trigger }: DeleteUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteUser(userId);
      if (result.success) {
        toast.success(`Utilizador ${userName} removido com sucesso!`);
        setOpen(false);
      } else {
        toast.error(result.error || "Ocorreu um erro ao excluir o utilizador.");
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
          <DialogTitle className="text-red-600">Remover Utilizador</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover o utilizador <strong>{userName}</strong>?
            Esta ação não pode ser desfeita e todos os dados relacionados com este
            utilizador poderão ser perdidos ou desassociados.
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
