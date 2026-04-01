import { CourseEditor } from "@/components/courses/course-editor";
import { getCourseById, updateCourse } from "@/lib/actions/courses";
import { getCategories } from "@/lib/actions/categories";
import { getInstructors } from "@/lib/actions/instructors";
import { redirect } from "next/navigation";
import Heading from "@/components/Heading";

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
      <div className="flex -mb-12" >

        <Heading
          title="Editar Curso"
          text="Preencha os campos abaixo para editar o curso."
        />
      </div>
      <CourseEditor
        initialData={course}
        onSubmit={updateCourseAction}
        categories={categories}
        instructors={instructors}
      />
    </div>
  );
}
