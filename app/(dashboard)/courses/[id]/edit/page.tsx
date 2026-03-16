import { CourseEditor } from "@/components/courses/course-editor";
import { getCourseById, updateCourse } from "@/lib/actions/courses";
import { Course } from "@/types/types";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const course = {
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
  // const course = await getCourseById(id);
  

  if (!course) {
    return <div>Curso não encontrado</div>;
  }

  async function updateCourseAction(data: Course) {
    "use server";
    await updateCourse(id, data);
    redirect("/courses");
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className="text-3xl font-semibold mb-6">Editar curso</h1>
      <CourseEditor initialData={course} onSubmit={updateCourseAction} />
    </div>
  );
}
