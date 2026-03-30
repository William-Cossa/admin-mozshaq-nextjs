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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser, updateUser } from "@/lib/actions/users";
import { generateAvatarUrl } from "@/lib/avatar";
import { Plus, Edit2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

// --- Validação local (espelha o backend) ---
const createUserSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

const updateUserSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Email inválido."),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .or(z.literal(""))
    .optional(),
});

type FieldErrors = Record<string, string>;

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string | null;
  lastLogin: string | null;
};

interface UserFormDialogProps {
  user?: User;
  trigger?: React.ReactNode;
}

export function UserFormDialog({ user, trigger }: UserFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const isEdit = !!user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as string;

    // Validação local com Zod
    const schema = isEdit ? updateUserSchema : createUserSchema;
    const parsed = schema.safeParse({ name, email, password });

    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }

    const data: any = { name, email, role, status };
    if (password) data.password = password;
    if (!isEdit) data.avatar = generateAvatarUrl(name);

    startTransition(async () => {
      const result = isEdit
        ? await updateUser(user.id, data)
        : await createUser(data);

      if (result.success) {
        toast.success(
          isEdit
            ? "Utilizador actualizado com sucesso!"
            : "Utilizador criado com sucesso!"
        );
        setOpen(false);
        setFieldErrors({});
      } else {
        toast.error(result.error || "Ocorreu um erro ao gravar o utilizador.");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setFieldErrors({});
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button className="inline-flex items-center justify-center gap-2 text-sm font-bold shadow-xl shadow-primary/20 transition-all active:scale-95 cursor-pointer">
            <Plus size={16} />
            Adicionar Utilizador
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Editar Utilizador" : "Adicionar Utilizador"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Altere os dados do utilizador abaixo. Clique em guardar para confirmar."
                : "Preencha os dados para criar um novo utilizador na plataforma."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Nome */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="name" className="text-right pt-2.5">
                Nome
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  defaultValue={user?.name || ""}
                  autoComplete="off"
                  className={fieldErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {fieldErrors.name && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="email" className="text-right pt-2.5">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user?.email || ""}
                  autoComplete="off"
                  className={fieldErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
                )}
              </div>
            </div>

            {/* Senha */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="password" className="text-right pt-2.5">
                Senha
              </Label>
              <div className="col-span-3">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={isEdit ? "Deixe em branco para manter" : ""}
                  autoComplete="new-password"
                  className={fieldErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {fieldErrors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Papel */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Papel
              </Label>
              <div className="col-span-3">
                <Select name="role" defaultValue={user?.role || "MANAGER"}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Selecione um papel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="MANAGER">MANAGER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Estado */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Estado
              </Label>
              <div className="col-span-3">
                <Select name="status" defaultValue={user?.status || "ACTIVE"}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
