import Link from "next/link";
import { Plus } from "lucide-react";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Filters from "@/components/courses/filters";
import CoursesList from "@/components/courses/course-list";
import { getCourses } from "@/lib/actions/courses";

export default async function CoursesPage() {
  const courses = [
  {
    id: "1",
    title: "Advanced React Patterns",
    category: "Development",
    instructorIds: ["1"],
    status: "PUBLICADO",
    type: "ONLINE",
    studentsCount: 1204,
    duration: "4h 32m",
    thumbnail: "https://picsum.photos/id/180/800/450",
    description: "Master compound components, control props, and custom hooks.",
  },
  {
    id: "2",
    title: "UX Design Fundamentals",
    category: "Design",
    instructorIds: ["2"],
    status: "RASCUNHO",
    type: "HIBRIDO",
    studentsCount: 850,
    duration: "6h 15m",
    thumbnail: "https://picsum.photos/id/201/800/450",
    description: "Learn wireframing, prototyping, and user research basics.",
  },
  {
    id: "3",
    title: "SEO Strategy 2024",
    category: "Marketing",
    instructorIds: ["1"],
    status: "ENCERRADO",
    type: "PRESENCIAL",
    studentsCount: 2300,
    duration: "2h 10m",
    thumbnail: "https://picsum.photos/id/20/800/450",
    description: "Complete guide to technical SEO and content optimization.",
  },
];
  // const courses = await getCourses();

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

      <CoursesList courses={courses} />
    </div>
  );
}
