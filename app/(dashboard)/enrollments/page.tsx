import React from "react";
import {
  Plus,
  Filter,
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  Phone,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchEnrollments } from "@/components/enrollments/search-enrollments";
import { getEnrollments, getEnrollmentMetrics } from "@/lib/actions/enrollments";
import { StatusSelect } from "@/components/enrollments/status-select";
import { DeleteEnrollmentDialog } from "@/components/enrollments/DeleteEnrollmentDialog";
import Heading from "@/components/Heading";
import Link from "next/link";
import AddButton from "@/components/add-button";
import Image from "next/image";

export default async function EnrollmentsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const query = (await searchParams).q?.toLowerCase() || "";
  const statusFilter = (await searchParams).status || "";

  const [enrollments, metricsData] = await Promise.all([
    getEnrollments(),
    getEnrollmentMetrics(),
  ]);

  const metrics = metricsData.success ? metricsData : { active: 0, pending: 0, completedMonth: 0, droppedMonth: 0 };

  const filteredEnrollments = enrollments.filter((enr) => {
    const matchesQuery =
      enr.studentName.toLowerCase().includes(query) ||
      enr.courseName.toLowerCase().includes(query) ||
      enr.id.toLowerCase().includes(query);

    const matchesStatus = statusFilter ? enr.status === statusFilter : true;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Heading title="Gestão de inscrições" text="Gerencie o acesso dos alunos, acompanhe o progresso e actualize os estados das inscrições." />
        </div>
        <Link href="/enrollments/new">
          <AddButton text="Nova Inscrição" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Total Activos",
            value: metrics.active.toString(),
            trend: "Em curso",
            icon: CheckCircle2,
            color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
          },
          {
            label: "Pendente de Aprovação",
            value: metrics.pending.toString(),
            trend: "Acção Necessária",
            icon: Clock,
            color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
          },
          {
            label: "Concluídos (Mês)",
            value: metrics.completedMonth.toString(),
            trend: "Sucesso",
            icon: CheckCircle2,
            color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
          },
          {
            label: "Cancelados (Mês)",
            value: metrics.droppedMonth.toString(),
            trend: "Atenção",
            icon: XCircle,
            color: "text-red-500 bg-red-50 dark:bg-red-500/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div className={cn("p-2 rounded-lg", stat.color)}>
                <stat.icon size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="text-[#616189] text-xs font-bold uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-center">
          <SearchEnrollments placeholder="Pesquisar por aluno, curso ou ID..." />
          <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <button className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-50 transition-colors">
              <Filter size={16} className="text-slate-400" />
              <span>Filtros</span>
            </button>
            <button className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-50 transition-colors">
              <Calendar size={16} className="text-slate-400" />
              <span>Intervalo de Datas</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr className="text-[10px] uppercase tracking-widest text-slate-500 font-black">
                {/* <th className="px-4 py-2">ID</th> */}
                <th className="px-4 py-2">Aluno</th>
                <th className="px-4 py-2">Contacto</th>
                <th className="px-4 py-2">Curso</th>
                <th className="px-4 py-2">Data</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2 text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredEnrollments.map((enr) => (
                <tr
                  key={enr.id}
                  className="group hover:bg-primary/[0.03] transition-colors"
                >
                  <td className="hidden px-4 py-1.5 text-slate-500 font-mono text-xs">
                    {enr.id}
                  </td>
                  <td className="px-4 py-1.5">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                        {enr.studentAvatar ? (
                          <Image
                            src={enr.studentAvatar}
                            className="size-full object-cover"
                            alt=""
                            width={24}
                            height={24}
                          />
                        ) : (
                          <Users size={16} className="text-slate-400" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {enr.studentName}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-1.5">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <Phone size={12} className="text-slate-400" />
                      <span className="font-medium text-xs">
                        {enr.contact || "841234567"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-1.5 font-semibold  text-slate-700 dark:text-slate-300">
                    {enr.courseName}
                  </td>
                  <td className="px-4 py-1.5 text-slate-500 font-medium">
                    {enr.date}
                  </td>
                  <td className="px-4 py-1.5">
                    <StatusSelect
                      enrollmentId={enr.id}
                      currentStatus={enr.status}
                    />
                  </td>
                  <td className="px-4 py-1.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* For now, just a button for View. We can create a ViewEnrollmentDialog later. */}
                      <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" title="Ver">
                        <Eye size={14} />
                      </button>
                      <Link href={`/enrollments/${enr.id}/edit`}>
                        <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" title="Editar">
                          <Edit2 size={14} />
                        </button>
                      </Link>
                      <DeleteEnrollmentDialog enrollmentId={enr.id} studentName={enr.studentName} />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEnrollments.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-slate-500"
                  >
                    Nenhuma inscrição encontrada para a sua pesquisa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
