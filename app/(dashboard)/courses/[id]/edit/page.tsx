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

  // Handle both {success: true, course: {...}} and raw course formats
  const rawCourse = result.data.course || result.data;
  const instructors = instructorsData.data || [];

  // Map backend data to frontend form data
  const course = {
    ...rawCourse,
    instructorIds: rawCourse.instructors?.map((i: any) => i.instructorId) || [],
    duration: rawCourse.duration || "",
    discountPrice: rawCourse.discountPrice ?? undefined,
    thumbnail: rawCourse.thumbnail || "",
  };
  async function mapCourseToApi(data: any) {
    "use server"
    return {
      title: data.title,
      description: data.description,
      longDescription: data.longDescription,
      thumbnail: data.thumbnail || undefined,
      categoryId: data.categoryId,
      level: data.level,
      type: data.type,
      status: data.status,
      price: data.price,
      discountPrice: data.discountPrice,
      duration: data.duration,
      objectives: data.objectives,
      targetAudience: data.targetAudience,
      requirements: data.requirements,
      skills: data.skills,
      locationDefault: data.locationDefault,
      instructorIds: data.instructorIds,
    };
  }

  async function updateCourseAction(data: any) {
    "use server";

    // Clean payload before updating
    const payload = await mapCourseToApi(data);

    // Validate thumbnail schema correctly (backend expects Valid URL or undefined)
    if (payload.thumbnail === "") {
      delete payload.thumbnail;
    }
    const res = await updateCourse(id, payload);
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
