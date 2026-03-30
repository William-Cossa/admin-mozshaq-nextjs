import { CourseEditor } from "@/components/courses/course-editor";
import { createCourse } from "@/lib/actions/courses";
import { getCategories } from "@/lib/actions/categories";
import { getInstructors } from "@/lib/actions/instructors";
import { redirect } from "next/navigation";

export default async function NewCoursePage() {
  const [categories, instructorsData] = await Promise.all([
    getCategories(),
    getInstructors({ limit: "100" }),
  ]);

  const instructors = instructorsData.data || [];

  async function createCourseAction(data: any) {
    "use server";
    const result = await createCourse(data);
    if (result.success) {
      redirect("/courses");
    } else {
      throw new Error(result.error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Criar Novo Curso</h1>
      <CourseEditor 
        onSubmit={createCourseAction} 
        categories={categories}
        instructors={instructors}
      />
    </div>
  );
}