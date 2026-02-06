"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  ChevronLeft,
  Save,
  UserRound,
  Briefcase,
  GraduationCap,
  Linkedin,
  Mail,
  Info,
  Upload,
  BookOpen,
  Plus,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const instructorSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  slug: z.string().min(3, "Slug inválido"),
  specialization: z.string().min(3, "Informe a especialização"),
  yearsExperience: z.number().min(0, "Experiência não pode ser negativa"),
  bio: z.string().min(10, "A bio deve ter pelo menos 10 caracteres"),
  education: z.string().min(3, "Informe a formação académica"),
  linkedin: z
    .string()
    .url("URL de LinkedIn inválida")
    .optional()
    .or(z.literal("")),
  professionalEmail: z
    .string()
    .email("E-mail profissional inválido")
    .optional()
    .or(z.literal("")),
  status: z.enum(["ACTIVO", "INACTIVO"] as const),
});

type InstructorFormValues = z.infer<typeof instructorSchema>;

const InstructorForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InstructorFormValues>({
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      status: "ACTIVO",
      yearsExperience: 0,
    },
  });

  const onSubmit = async (data: InstructorFormValues) => {
    console.log("Saving Instructor Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/instructors");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-12">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/instructors"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isEdit ? "Editar Formador" : "Novo Formador"}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Configure o perfil profissional e dados de contacto.
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-xl font-bold shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={16} />
          )}
          <span>{isEdit ? "Salvar Alterações" : "Criar Formador"}</span>
        </button>
      </header>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <section className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-all group overflow-hidden relative">
                <Upload
                  size={16}
                  className="text-slate-400 group-hover:text-primary"
                />
                <span className="text-[10px] font-black text-slate-400 group-hover:text-primary uppercase tracking-widest">
                  Foto
                </span>
              </div>
              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                    Nome Completo
                  </label>
                  <input
                    {...register("name")}
                    className="w-full h-9 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm"
                    placeholder="Nome do formador"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 pl-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                    Slug (URL)
                  </label>
                  <input
                    {...register("slug")}
                    className="w-full h-9 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm"
                    placeholder="nome-formador"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1 pl-1">
                  <Briefcase size={14} className="text-primary" />
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Especialização
                  </label>
                </div>
                <input
                  {...register("specialization")}
                  className="w-full h-9 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm"
                  placeholder="Ex: React & TypeScript"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                  Anos de Experiência
                </label>
                <input
                  type="number"
                  {...register("yearsExperience", { valueAsNumber: true })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1 pl-1">
                <GraduationCap size={14} className="text-primary" />
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Formação Académica
                </label>
              </div>
              <input
                {...register("education")}
                className="w-full h-9 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm"
                placeholder="Ex: Licenciatura em Design"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                Breve Biografia
              </label>
              <textarea
                {...register("bio")}
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm"
                placeholder="Fale sobre a trajetória profissional..."
              />
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Info size={16} />
              <h2 className="text-base font-bold">Canais de Contacto</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1 pl-1">
                  <Linkedin size={14} className="text-primary" />
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    LinkedIn (URL)
                  </label>
                </div>
                <input
                  {...register("linkedin")}
                  className="w-full h-9 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1 pl-1">
                  <Mail size={14} className="text-primary" />
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    E-mail Profissional
                  </label>
                </div>
                <input
                  {...register("professionalEmail")}
                  className="w-full h-9 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm"
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
              Definições
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Estado na Plataforma
                </label>
                <select
                  {...register("status")}
                  className="w-full h-9 px-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs font-bold"
                >
                  <option value="ACTIVO">Activo</option>
                  <option value="INACTIVO">Inactivo</option>
                </select>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  Associação de Cursos
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium cursor-pointer">
                    <BookOpen size={14} className="text-primary" />
                    <span>React Mastery 2024</span>
                  </div>
                  <button
                    type="button"
                    className="w-full py-1.5 flex items-center justify-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest hover:underline transition-all"
                  >
                    <Plus size={12} /> Vincular Curso
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary/5 dark:bg-primary/10 p-4 rounded-3xl border border-primary/20 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <UserRound size={16} />
              <h3 className="text-base font-bold">Estatísticas</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Total Alunos</span>
                <span className="text-slate-900 dark:text-white">1,245</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Média Rating</span>
                <span className="text-emerald-500">4.8 ★</span>
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default InstructorForm;
