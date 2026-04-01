import { CourseEditor } from "@/components/courses/course-editor";
import { createCourse } from "@/lib/actions/courses";
import { getCategories } from "@/lib/actions/categories";
import { getInstructors } from "@/lib/actions/instructors";
import { redirect } from "next/navigation";
import Heading from "@/components/Heading";

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
      <div className="flex -mb-12" >

        <Heading
          title="Criar Novo Curso"
          text="Preencha os campos abaixo para criar um novo curso."
        />
      </div>
      <CourseEditor
        onSubmit={createCourseAction}
        categories={categories}
        instructors={instructors}
      />
    </div>
  );
}