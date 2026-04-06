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
    instructorIds: rawCourse.instructorIds || rawCourse.instructors?.map((i: any) => i.id || i.instructorId) || [],
    price: typeof rawCourse.price === "string" ? parseFloat(rawCourse.price) : rawCourse.price,
    discountPrice: rawCourse.discountPrice 
      ? (typeof rawCourse.discountPrice === "string" ? parseFloat(rawCourse.discountPrice) : rawCourse.discountPrice) 
      : undefined,
    duration: rawCourse.duration || "",
    thumbnail: rawCourse.thumbnail || "",
  };
  async function mapCourseToApi(data: any) {
    "use server"
    
    const payload: any = {};
    
    // String fields - only send if not empty
    const stringFields = ["title", "description", "longDescription", "thumbnail", "categoryId", "level", "type", "status", "duration", "locationDefault", "objective"];
    stringFields.forEach(f => {
      if (data[f] !== undefined && data[f] !== null) {
        const val = String(data[f]).trim();
        if (val !== "") {
          payload[f] = val;
        }
      }
    });

    // Numeric fields - cast to float
    const numFields = ["price", "discountPrice"];
    numFields.forEach(f => {
      if (data[f] !== undefined && data[f] !== null && String(data[f]).trim() !== "") {
        const val = parseFloat(data[f]);
        if (!isNaN(val)) {
          payload[f] = val;
        }
      }
    });

    // Array fields - filter out empty/null values
    const arrayFields = ["objectives", "targetAudience", "requirements", "skills", "instructorIds"];
    arrayFields.forEach(f => {
      if (Array.isArray(data[f])) {
        payload[f] = data[f].filter((item: any) => 
          item !== null && item !== undefined && String(item).trim() !== ""
        );
      }
    });

    return payload;
  }

  async function updateCourseAction(data: any) {
    "use server";

    // Clean payload before updating
    const payload = await mapCourseToApi(data);

    const res = await updateCourse(id, payload);
    if (res.success) {
      redirect("/courses");
    } else {
      const errorData = res.error || {};
      let msg = typeof errorData === 'string' ? errorData : (errorData.message || "Erro ao actualizar curso");
      if (errorData.errors) {
        // Formatar erros de validação se existirem
        const details = Object.entries(errorData.errors)
          .map(([field, msgs]: [string, any]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
          .join(" | ");
        msg = `${msg} (${details})`;
      }
      throw new Error(msg);
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
