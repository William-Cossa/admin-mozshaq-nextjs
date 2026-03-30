import { CourseEditor } from "@/components/courses/course-editor";
import { getCourseById, updateCourse } from "@/lib/actions/courses";
import { getCategories } from "@/lib/actions/categories";
import { getInstructors } from "@/lib/actions/instructors";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const [result, categories, instructorsData] = await Promise.all([
    getCourseById(id),
    getCategories(),
    getInstructors({ limit: "100" }),
  ]);

  if (!result.success || !result.data) {
    return <div>Curso não encontrado</div>;
  }

  const course = result.data;
  const instructors = instructorsData.data || [];

  async function updateCourseAction(data: any) {
    "use server";
    const res = await updateCourse(id, data);
    if (res.success) {
      redirect("/courses");
    } else {
      throw new Error(res.error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className="text-3xl font-semibold mb-6">Editar curso</h1>
      <CourseEditor 
        initialData={course} 
        onSubmit={updateCourseAction} 
        categories={categories}
        instructors={instructors}
      />
    </div>
  );
}
