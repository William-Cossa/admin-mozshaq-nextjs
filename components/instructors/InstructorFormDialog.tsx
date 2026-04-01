"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { createInstructor, updateInstructor } from "@/lib/actions/instructors";
import { cn } from "@/lib/utils";

const instructorSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  specialization: z.string().min(2, "Especialização é obrigatória"),
  yearsExperience: z.coerce.number().int().min(0, "Anos de experiência inválidos"),
  bio: z.string().min(10, "Bio deve ter pelo menos 10 caracteres"),
  education: z.string().min(2, "Formação é obrigatória"),
  professionalEmail: z.string().email("Email inválido").optional().or(z.literal("")),
  linkedin: z.string().url("URL do LinkedIn inválida").optional().or(z.literal("")),
  status: z.enum(["ACTIVO", "INACTIVO"]),
});

export type InstructorRow = {
  id: string;
  name: string;
  photo: string | null;
  specialization: string;
  yearsExperience: number;
  bio: string;
  education: string;
  linkedin: string | null;
  professionalEmail: string | null;
  phone: string | null;
  status: string;
  totalCourses?: number;
};

interface InstructorFormDialogProps {
  instructor?: InstructorRow;
  trigger?: React.ReactNode;
}

export function InstructorFormDialog({ instructor, trigger }: InstructorFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = instructorSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      toast.error("Por favor, corrija os erros no formulário.");
      return;
    }

    try {
      const action = instructor ? updateInstructor(instructor.id, result.data) : createInstructor(result.data);
      const res = await action;

      if (res.success) {
        toast.success(instructor ? "Formador actualizado!" : "Formador criado!");
        setOpen(false);
      } else {
        toast.error(res.error || "Ocorreu um erro");
      }
    } catch (error) {
      toast.error("Erro na comunicação com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-2 rounded-lg font-bold bg-primary hover:bg-primary/90">
            <Plus size={16} />
            <span>Novo Formador</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto rounded-lg border-none shadow-2xl p-0 overflow-hidden bg-white dark:bg-slate-900">
        <div className="bg-primary/5 dark:bg-primary/10 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-900 dark:text-white">
              {instructor ? "Editar Formador" : "Adicionar Novo Formador"}
            </DialogTitle>
            <p className="text-xs text-slate-500 font-medium">
              Preencha os dados do especialista que irá ministrar os cursos.
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-500">Nome Completo</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Dr. William Cossa"
                defaultValue={instructor?.name}
                className={cn(
                  "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-primary",
                  errors.name && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name}</p>}
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="professionalEmail" className="text-xs font-black uppercase tracking-widest text-slate-500">Email Profissional</Label>
              <Input
                id="professionalEmail"
                name="professionalEmail"
                type="email"
                placeholder="exemplo@mozshaq.com"
                defaultValue={instructor?.professionalEmail || ""}
                className={cn(
                  "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-primary",
                  errors.professionalEmail && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.professionalEmail && <p className="text-[10px] text-red-500 font-bold">{errors.professionalEmail}</p>}
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="specialization" className="text-xs font-black uppercase tracking-widest text-slate-500">Especialização</Label>
              <Input
                id="specialization"
                name="specialization"
                placeholder="Ex: Engenharia de Software"
                defaultValue={instructor?.specialization}
                className={cn(
                  "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-primary",
                  errors.specialization && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.specialization && <p className="text-[10px] text-red-500 font-bold">{errors.specialization}</p>}
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="yearsExperience" className="text-xs font-black uppercase tracking-widest text-slate-500">Anos de Experiência</Label>
              <Input
                id="yearsExperience"
                name="yearsExperience"
                type="number"
                defaultValue={instructor?.yearsExperience || 0}
                className={cn(
                  "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-primary",
                  errors.yearsExperience && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.yearsExperience && <p className="text-[10px] text-red-500 font-bold">{errors.yearsExperience}</p>}
            </div>

            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="education" className="text-xs font-black uppercase tracking-widest text-slate-500">Formação Académica</Label>
              <Input
                id="education"
                name="education"
                placeholder="Ex: Mestrado em Ciência de Computação - UEM"
                defaultValue={instructor?.education}
                className={cn(
                  "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-primary",
                  errors.education && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.education && <p className="text-[10px] text-red-500 font-bold">{errors.education}</p>}
            </div>

            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest text-slate-500">Resumo Profissional / Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Descreva brevemente a trajectória e conquistas do formador..."
                defaultValue={instructor?.bio}
                rows={3}
                className={cn(
                  "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-primary resize-none",
                  errors.bio && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.bio && <p className="text-[10px] text-red-500 font-bold">{errors.bio}</p>}
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="linkedin" className="text-xs font-black uppercase tracking-widest text-slate-500">LinkedIn URL</Label>
              <Input
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/..."
                defaultValue={instructor?.linkedin || ""}
                className={cn(
                  "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-primary",
                  errors.linkedin && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.linkedin && <p className="text-[10px] text-red-500 font-bold">{errors.linkedin}</p>}
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Estado</Label>
              <Select name="status" defaultValue={instructor?.status || "ACTIVO"}>
                <SelectTrigger className="rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-primary">
                  <SelectValue placeholder="Seleccione o estado" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-slate-200 dark:border-slate-800">
                  <SelectItem value="ACTIVO">Activo</SelectItem>
                  <SelectItem value="INACTIVO">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-lg font-bold border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-lg font-bold bg-primary hover:bg-primary/90 text-white min-w-[120px]"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : instructor ? "Actualizar" : "Salvar Formador"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
