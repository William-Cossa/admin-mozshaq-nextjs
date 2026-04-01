import React from "react";
import {
  Edit2,
  Phone,
} from "lucide-react";
import type { StudentRow } from "./StudentFormDialog";
import Heading from "../Heading";
import Image from "next/image";
import { StudentFormDialog } from "./StudentFormDialog";
import { DeleteStudentDialog } from "./DeleteStudentDialog";
import { cn } from "@/lib/utils";
import { StudentFilters } from "./StudentFilters";
import { StudentPagination } from "./StudentPagination";

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  ACTIVE: {
    label: "Activo",
    cls: "bg-green-50 text-green-700 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
  },
  PENDING: {
    label: "Pendente",
    cls: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  },
  INACTIVE: {
    label: "Inactivo",
    cls: "bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600/50",
  },
  DROPPED: {
    label: "Cancelado",
    cls: "bg-red-50 text-red-700 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  },
};

interface StudentsClientProps {
  students: StudentRow[];
  total: number;
  page: number;
  limit: number;
}

const StudentsClient: React.FC<StudentsClientProps> = ({
  students,
  total,
  page,
  limit,
}) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-3 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Heading
          title="Estudantes"
          text="Gerencie os dados, estados e inscrições de todos os estudantes da plataforma."
        />
        <StudentFormDialog />
      </div>

      <StudentFilters />

      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase tracking-widest text-slate-500 font-black">
                <th className="px-4 py-2">Estudante</th>
                <th className="px-4 py-2">Telefone</th>
                <th className="px-4 py-2">Inscrições</th>
                <th className="px-4 py-2">Data de Registo</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2 text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-slate-400"
                  >
                    Nenhum estudante encontrado.
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const statusInfo = STATUS_MAP[student.status] || {
                    label: student.status,
                    cls: "bg-slate-50 text-slate-700 border-slate-100",
                  };
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                            {student.avatar ? (
                              <Image
                                width={36}
                                height={36}
                                src={student.avatar}
                                alt={student.name}
                                className="w-full h-full object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 font-bold text-slate-400 text-sm">
                                {student.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                              {student.name}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-slate-500 text-xs">
                        {student.phone ? (
                          <span className="flex items-center gap-1">
                            <Phone size={12} />
                            {student.phone}
                          </span>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex flex-col text-xs">
                          <span className="font-semibold text-slate-900 dark:text-whiteTracking-tight">
                            {student.totalCursos ?? 0} total
                          </span>
                          <span className="text-slate-400">
                            {student.cursosActivos ?? 0} activos
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-slate-500 text-xs">
                        {student.joinDate
                          ? new Date(student.joinDate).toLocaleDateString("pt-PT")
                          : "—"}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest border",
                            statusInfo.cls
                          )}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right text-xs">
                        <div className="flex items-center justify-end gap-1">
                          <StudentFormDialog
                            student={student}
                            trigger={
                              <button className="p-1 text-slate-400 hover:text-blue-500 transition-colors" title="Editar">
                                <Edit2 size={14} />
                              </button>
                            }
                          />
                          <DeleteStudentDialog
                            studentId={student.id}
                            studentName={student.name}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <StudentPagination total={total} page={page} limit={limit} />
      </div>
    </div>
  );
};

export default StudentsClient;
