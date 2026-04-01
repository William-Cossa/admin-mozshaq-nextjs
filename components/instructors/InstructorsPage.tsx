import React from "react";
import {
  Edit2,
  BookOpen,
  Award,
  Phone,
  Mail,
  Plus,
} from "lucide-react";
import Heading from "../Heading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DeleteInstructorDialog } from "./DeleteInstructorDialog";
import { ViewInstructorDialog } from "./ViewInstructorDialog";
import { InstructorFilters } from "./InstructorFilters";
import { InstructorPagination } from "./InstructorPagination";
import AddButton from "../add-button";

export type InstructorRow = {
  id: string;
  name: string;
  photo: string | null;
  specialization: string;
  yearsExperience: number;
  bio: string;
  education: string;
  phone: string | null;
  professionalEmail: string | null;
  status: string;
  totalCourses?: number;
};

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

interface InstructorsClientProps {
  instructors: InstructorRow[];
  total: number;
  page: number;
  limit: number;
}

const InstructorsClient: React.FC<InstructorsClientProps> = ({
  instructors,
  total,
  page,
  limit,
}) => {
  console.log("INSTRUCTORS:", {
    instructors,
    total,
    page,
    limit,
  });
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-3 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Heading
          title="Formadores"
          text="Gerencie a equipa de instrutores, especialidades e o impacto nos cursos."
        />
        <Link href="/instructors/new">
          <AddButton text="Novo formador" />
        </Link>
      </div>

      <InstructorFilters />

      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                <th className="px-4 py-3">Formador</th>
                <th className="px-4 py-3">Especialização</th>
                <th className="px-4 py-3">Métricas</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {instructors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">
                    Nenhum formador encontrado.
                  </td>
                </tr>
              ) : (
                instructors.map((instructor) => {
                  const statusInfo = STATUS_MAP[instructor.status] || {
                    label: instructor.status,
                    cls: "bg-slate-50 text-slate-700 border-slate-100",
                  };
                  return (
                    <tr key={instructor.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                            {instructor.photo ? (
                              <Image
                                width={36}
                                height={36}
                                src={instructor.photo}
                                alt={instructor.name}
                                className="w-full h-full object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-black text-slate-400 text-xs">
                                {instructor.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                              {instructor.name}
                            </span>
                            <div className="flex items-center gap-2">
                              {instructor.professionalEmail && (
                                <Link href={`mailto:${instructor.professionalEmail}`} className="text-slate-400 hover:text-primary transition-colors">
                                  {/* <Mail size={12} /> <span className="text-sm">{instructor.professionalEmail}</span> */}
                                </Link>
                              )}
                              {instructor.phone && (
                                <Link href={`tel:${instructor.phone}`} className="text-slate-400 flex items-center gap-2 hover:text-green-500 transition-colors">
                                  <Phone size={12} /> <span className="text-xs font-semibold">{instructor.phone}</span>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {instructor.specialization}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                              <Award size={12} className="text-amber-500" />
                              {instructor.yearsExperience}y
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Exp.</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                              <BookOpen size={12} className="text-primary" />
                              {instructor.totalCourses ?? 0}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Cursos</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border", statusInfo.cls)}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <ViewInstructorDialog instructor={instructor} />
                          <Link href={`/instructors/${instructor.id}/edit`}>
                            <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-md transition-all" title="Editar">
                              <Edit2 size={14} />
                            </button>
                          </Link>
                          <DeleteInstructorDialog instructorId={instructor.id} instructorName={instructor.name} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <InstructorPagination total={total} page={page} limit={limit} />
      </div>
    </div>
  );
};

export default InstructorsClient;
