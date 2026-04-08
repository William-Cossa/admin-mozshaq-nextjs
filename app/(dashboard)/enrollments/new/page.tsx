import React from "react";
import Heading from "@/components/Heading";
import { EnrollmentForm } from "@/components/enrollments/EnrollmentForm";
import { getStudents } from "@/lib/actions/students";
import { getCourses } from "@/lib/actions/courses";

export default async function NewEnrollmentPage() {
  // Fetch up to 500 for the dropdowns. A real app might use async comboboxes but for now static lists are enough.
  const [studentsRes, coursesRes] = await Promise.all([
    getStudents({ limit: "500" }),
    getCourses({ limit: "500" }),
  ]);

  const students = studentsRes.data || [];
  const courses = coursesRes.data || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Heading
        title="Nova Inscrição"
        text="Inscreva um aluno existente num curso ou adicione um novo aluno directamente."
      />
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
        <EnrollmentForm students={students} courses={courses} />
      </div>
    </div>
  );
}
