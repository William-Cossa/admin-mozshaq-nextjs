import { CourseEditor } from "@/components/courses/course-editor";
import { createCourse } from "@/lib/actions/courses";
import { Course } from "@/types/types";
import { redirect } from "next/navigation";

export default function NewCoursePage() {
  async function createCourseAction(data: Course) {
    "use server";
    await createCourse(data);
    redirect("/courses");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Criar Novo Curso</h1>
      <CourseEditor onSubmit={createCourseAction} />
    </div>
  );
}