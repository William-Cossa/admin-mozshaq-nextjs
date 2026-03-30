import Link from "next/link";
import { Plus } from "lucide-react";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Filters from "@/components/courses/filters";
import CoursesList from "@/components/courses/course-list";
import { getCourses } from "@/lib/actions/courses";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function CoursesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const result = await getCourses(params);
  const courses = result.data || [];

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <Heading title="Cursos" text=" Gerencie sua grade acadêmica" />

        <Link href="/courses/new">
          <Button className="cursor-pointer hover:scale-105">
            <Plus size={16} />
            <span>Criar Novo Curso</span>
          </Button>
        </Link>
      </div>

      <Filters />

      <CoursesList 
        courses={courses} 
        total={result.total || 0}
        page={result.page || 1}
        limit={result.limit || 10}
      />
    </div>
  );
}
