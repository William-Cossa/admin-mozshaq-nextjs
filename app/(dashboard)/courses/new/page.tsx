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

  async function createCourseAction(data: any) {
    "use server";
    
    const payload = await mapCourseToApi(data);
    const result = await createCourse(payload);
    
    if (result.success) {
      redirect("/courses");
    } else {
      const errorData = result.error || {};
      let msg = typeof errorData === 'string' ? errorData : (errorData.message || "Erro ao criar curso");
      if (errorData.errors) {
        const details = Object.entries(errorData.errors)
          .map(([field, msgs]: [string, any]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
          .join(" | ");
        msg = `${msg} (${details})`;
      }
      throw new Error(msg);
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