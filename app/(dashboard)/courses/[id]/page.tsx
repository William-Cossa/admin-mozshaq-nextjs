import { CourseEditor } from "@/components/courses/course-editor";
import { mockCourses } from "@/data";
import { Course } from "@/types/types";

export default async function Page({ params }: { params: { id: string } }) {
  const cursoId = await params.id;
  // Busque dados do DB
  const course = mockCourses.find((c) => c.id === cursoId);

  async function updateCourse(data: Course) {
    "use server";
    console.log("Atualizar curso:", data);
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className="text-3xl font-semibold mb-6">Editar curso</h1>
      <CourseEditor initialData={course} onSubmit={updateCourse} />
    </div>
  );
}
