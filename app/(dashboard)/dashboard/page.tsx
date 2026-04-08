import EnrollmentsTrends from "@/components/charts/EnrollmentsTrends";
import { StatCard } from "@/components/StatCards";
import DashboardFilter from "@/components/dashboard/DashboardFilter";
import RecentEnrollments from "@/components/dashboard/RecentEnrollments";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  Users,
} from "lucide-react";
import React from "react";
import Heading from "@/components/Heading";
import { getDashboardOverview } from "@/lib/actions/dashboard";

async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const period = typeof resolvedParams.period === "string" ? resolvedParams.period : "30d";

  const data = await getDashboardOverview(period);
  const cards = data?.success !== false && data?.cards ? data.cards : {
    instructors: { value: 0, trend: "0%" },
    students: { value: 0, trend: "0%" },
    courses: { value: 0, trend: "0%" },
    enrollments: { value: 0, trend: "0%" },
    revenue: { value: 0, trend: "0%" }
  };

  return (
    <section className="max-w-7xl mx-auto space-y-3">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <Heading
          title="Dashboard"
          text="Visão geral das métricas e estatísticas do portal"
        />
        <DashboardFilter />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Total de Professores"
          value={cards.instructors.value.toString()}
          icon={Users}
          trend={cards.instructors.trend}
          color="bg-blue-50 text-blue-600 "
        />
        <StatCard
          title="Total de Alunos"
          value={cards.students.value.toString()}
          icon={GraduationCap}
          trend={cards.students.trend}
          color="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20"
        />
        <StatCard
          title="Total de Inscrições"
          value={cards.enrollments.value.toString()}
          icon={CheckCircle}
          trend={cards.enrollments.trend}
          color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
        />
        <StatCard
          title="Total de Cursos"
          value={cards.courses.value.toString()}
          icon={BookOpen}
          trend={cards.courses.trend}
          color="bg-orange-50 text-orange-600 dark:bg-orange-900/20"
        />
      </div>

      <EnrollmentsTrends 
        enrollmentsTrends={data?.enrollmentsTrends || []} 
        performanceTrends={data?.performanceTrends || []} 
      />

      {data?.recentEnrollments && (
        <RecentEnrollments enrollments={data.recentEnrollments} />
      )}
    </section>
  );
}

export default Dashboard;
