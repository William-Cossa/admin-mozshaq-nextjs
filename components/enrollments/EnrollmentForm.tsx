"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, CreditCard, User, BookOpen } from "lucide-react";
import { createEnrollment } from "@/lib/actions/enrollments";
import { createStudent } from "@/lib/actions/students";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EnrollmentFormProps {
  students: any[];
  courses: any[];
}

export function EnrollmentForm({ students: initialStudents, courses }: EnrollmentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [students, setStudents] = useState(initialStudents);

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    contact: "",
    status: "PENDING",
  });

  // For Add Student Dialog
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", phone: "", status: "ACTIVE" });
  const [isCreatingStudent, startStudentTransition] = useTransition();

  const handleCreateStudent = () => {
    startStudentTransition(async () => {
      if (!newStudent.name || !newStudent.email) {
        toast.error("Nome e E-mail são obrigatórios para o aluno.");
        return;
      }
      try {
        const res = await createStudent(newStudent);
        if (res.success) {
          toast.success("Aluno criado com sucesso!");
          // Mock append to list to immediately select it without reloading page
          const tempId = res.student?.id || "temp-" + Date.now();
          const created = res.student || { ...newStudent, id: tempId };
          setStudents((prev) => [created, ...prev]);
          setFormData((prev) => ({ ...prev, studentId: tempId }));
          setOpenStudentDialog(false);
          setNewStudent({ name: "", email: "", phone: "", status: "ACTIVE" });
        } else {
          toast.error(res.error || "Erro ao criar aluno.");
        }
      } catch (e) {
        toast.error("Erro de rede ao criar aluno.");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId) {
      toast.error("Por favor, selecione um aluno e um curso.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await createEnrollment(formData);
        if (res.success) {
          toast.success("Inscrição criada com sucesso!");
          router.push("/enrollments");
        } else {
          toast.error(res.error || "Erro ao criar inscrição. O aluno pode já estar inscrito neste curso.");
        }
      } catch (e) {
        toast.error("Erro ao comunicar com o servidor.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Student Selector Area */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5"><User size={16} className="text-slate-400" /> Aluno</span>
            
            <Dialog open={openStudentDialog} onOpenChange={setOpenStudentDialog}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="text-xs text-primary hover:text-emerald-600 transition-colors flex items-center gap-1 font-bold bg-primary/10 px-2 py-1 rounded-md"
                >
                  <Plus size={12} /> Adicionar Novo
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-lg font-black text-slate-900 dark:text-white">Registo Rápido de Aluno</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Nome Completo</label>
                    <input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary dark:text-white"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">E-mail</label>
                    <input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary dark:text-white"
                      placeholder="Ex: joao@exemplo.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Telemóvel (Opcional)</label>
                    <input
                      type="tel"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary dark:text-white"
                      placeholder="Ex: 841234567"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCreateStudent}
                    disabled={isCreatingStudent}
                    className="w-full h-10 bg-primary hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    {isCreatingStudent ? <Loader2 className="animate-spin" size={16} /> : "Criar e Selecionar Aluno"}
                  </button>
                </div>
              </DialogContent>
            </Dialog>

          </label>
          <select
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary dark:text-white"
            required
          >
            <option value="">Selecione um aluno da lista</option>
            {students.map((stu) => (
              <option key={stu.id} value={stu.id}>
                {stu.name} ({stu.email})
              </option>
            ))}
          </select>
        </div>

        {/* Course Selector */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <BookOpen size={16} className="text-slate-400" /> Curso
          </label>
          <select
            value={formData.courseId}
            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary dark:text-white"
            required
          >
            <option value="">Selecione um curso para inscrever</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Contacto Activo (Para Inscrição)
          </label>
          <input
            type="text"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary dark:text-white"
            placeholder="Opcional. Ex: 840000000"
          />
        </div>

        {/* Payment / Status Aspect */}
        <div className="space-y-4">
          <div className="space-y-2">
             <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <CreditCard size={16} className="text-slate-400" /> Estado de Pagamento / Inscrição
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:border-primary dark:text-white"
            >
              <option value="PENDING">Pendente (Aguardando Pagamento)</option>
              <option value="ACTIVE">Activo (Pagamento Confirmado / Grátis)</option>
            </select>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              * Inscrições marcadas como <strong className="text-emerald-500">Activo</strong> garantem acesso imediato ao curso (caso o aluno possua conta).
              Se o aluno necessita de pagar via m-Pesa manual, selecione <strong className="text-amber-500">Pendente</strong> até a validação.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => router.back()}
          className="h-10 px-4 rounded-lg font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          disabled={isPending}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="h-10 px-6 bg-primary hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" size={18} /> : "Finalizar Inscrição"}
        </button>
      </div>
    </form>
  );
}
