import EnrollmentsTrends from "@/components/charts/EnrollmentsTrends";
import { StatCard } from "@/components/StatCards";
import Title from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronDown,
  GraduationCap,
  Users,
} from "lucide-react";
import React from "react";
import Heading from "@/components/Heading";

async function Dashboard() {
  return (
    <section className="max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <Heading
          title="Dashboard"
          text="Visão geral das métricas e estatísticas do portal"
        />
        <Button
          variant="outline"
          className="flex items-center gap-2 text-sm font-bold  py-2 px-4 transition-all"
        >
          <Calendar size={18} className="text-primary" />
          <span>Últimos 30 Dias</span>
          <ChevronDown size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Total de Professores"
          value="10"
          icon={Users}
          trend="+5.2%"
          color="bg-blue-50 text-blue-600 "
        />
        <StatCard
          title="Total de Alunos"
          value="8,320"
          icon={GraduationCap}
          trend="+2.4%"
          color="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20"
        />
        <StatCard
          title="Total de Inscrições"
          value="1,240"
          icon={CheckCircle}
          trend="+12%"
          color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
        />
        <StatCard
          title="Total de Cursos"
          value="48"
          icon={BookOpen}
          trend="0%"
          color="bg-orange-50 text-orange-600 dark:bg-orange-900/20"
        />
      </div>

      <EnrollmentsTrends />
    </section>
  );
}

export default Dashboard;
