import React from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Linkedin,
  Mail,
  BadgeCheck,
  XCircle,
} from "lucide-react";
import { Instructor } from "@/types/types";
import Link from "next/link";

const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    slug: "sarah-jenkins",
    specialization: "React & Frontend Architecture",
    yearsExperience: 8,
    bio: "Senior engineer at BigTech.",
    education: "MSc Computer Science",
    status: "ACTIVO",
    courseIds: ["1", "2"],
  },
  {
    id: "2",
    name: "Michael Chen",
    slug: "michael-chen",
    specialization: "UI/UX Design",
    yearsExperience: 12,
    bio: "Product designer for 10 years.",
    education: "BFA Design",
    status: "ACTIVO",
    courseIds: ["2"],
  },
  {
    id: "3",
    name: "John Doe",
    slug: "john-doe",
    specialization: "Backend Engineering",
    yearsExperience: 5,
    bio: "Loves Go and Rust.",
    education: "Self-taught",
    status: "INACTIVO",
    courseIds: [],
  },
];

const Instructors: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Formadores
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Faça a gestão do corpo docente e suas especializações.
          </p>
        </div>
        <Link
          href="/instructors/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95"
        >
          <Plus size={16} />
          <span>Novo Formador</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-3 justify-between items-center">
        <div className="relative w-full lg:w-96 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
            size={16}
          />
          <input
            className="w-full pl-10 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="Pesquisar por nome ou especialização..."
            type="text"
          />
        </div>
        <div className="flex gap-2">
          <select className="h-9 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold">
            <option>Todos os Estados</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
            <Filter size={16} className="text-slate-400" />
            <span>Mais Filtros</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockInstructors.map((instructor) => (
          <div
            key={instructor.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden">
                <img
                  src={`https://i.pravatar.cc/150?u=${instructor.id}`}
                  className="size-full object-cover"
                  alt={instructor.name}
                />
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/instructors/${instructor.id}/edit`}
                  className="p-1.5 text-slate-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-xl"
                >
                  <MoreVertical size={16} />
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {instructor.name}
                </h3>
                {instructor.status === "ACTIVO" ? (
                  <BadgeCheck size={16} className="text-emerald-500" />
                ) : (
                  <XCircle size={16} className="text-slate-300" />
                )}
              </div>
              <p className="text-sm font-bold text-primary mb-4">
                {instructor.specialization}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                {instructor.bio}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Experiência
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {instructor.yearsExperience} Anos
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Cursos
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {instructor.courseIds.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 h-9 flex items-center justify-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-white text-xs font-bold hover:bg-slate-100 transition-all">
                <Linkedin size={14} className="text-primary" />
                <span>LinkedIn</span>
              </button>
              <button className="flex-1 h-9 flex items-center justify-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-white text-xs font-bold hover:bg-slate-100 transition-all">
                <Mail size={14} className="text-primary" />
                <span>Contacto</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
