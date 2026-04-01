"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Mail, Phone, BookOpen, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { InstructorRow } from "./InstructorsPage";

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  ACTIVO: {
    label: "Activo",
    cls: "bg-green-50 text-green-700 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
  },
  INACTIVO: {
    label: "Inactivo",
    cls: "bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600/50",
  },
};

interface ViewInstructorDialogProps {
  instructor: InstructorRow;
}

export function ViewInstructorDialog({ instructor }: ViewInstructorDialogProps) {
  const [open, setOpen] = useState(false);
  const statusInfo = STATUS_MAP[instructor.status] || {
    label: instructor.status,
    cls: "bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md transition-all"
          title="Ver Detalhes"
        >
          <Eye size={14} />
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-lg border-none shadow-2xl bg-white dark:bg-slate-900 sm:max-w-[480px] p-0 overflow-hidden">
        <div className="bg-slate-50/80 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800">
          <DialogHeader className="flex flex-row items-center gap-4 text-left space-y-0">
            <div className="size-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
              {instructor.photo ? (
                <Image
                  width={64}
                  height={64}
                  src={instructor.photo}
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-slate-400 text-2xl">
                  {instructor.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <DialogTitle className="text-xl font-black text-slate-900 dark:text-white truncate">
                  {instructor.name}
                </DialogTitle>
                <span className={cn("inline-flex items-center rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border", statusInfo.cls)}>
                  {statusInfo.label}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {instructor.specialization}
              </p>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <Award size={14} className="text-amber-500" />
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Experiência</span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{instructor.yearsExperience} anos</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={14} className="text-primary" />
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Cursos</span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{instructor.totalCourses ?? 0} criados</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5">Sobre</span>
              {instructor.bio ? instructor.bio : <span className="text-slate-400 italic">Nenhuma biografia disponível.</span>}
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5">Formação Académica</span>
              {instructor.education ? instructor.education : <span className="text-slate-400 italic">Não especificada.</span>}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
            <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Contactos Profissionais</span>

            {instructor.professionalEmail ? (
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-slate-400" />
                </div>
                <Link href={`mailto:${instructor.professionalEmail}`} className="font-semibold hover:text-primary transition-colors truncate">
                  {instructor.professionalEmail}
                </Link>
              </div>
            ) : null}

            {instructor.phone ? (
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="size-8 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-green-600 dark:text-green-400" />
                </div>
                <Link href={`tel:${instructor.phone}`} className="font-semibold hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {instructor.phone}
                </Link>
              </div>
            ) : null}

            {!instructor.professionalEmail && !instructor.phone && (
              <p className="text-sm text-slate-400 italic font-medium">Nenhum contacto disponível.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
