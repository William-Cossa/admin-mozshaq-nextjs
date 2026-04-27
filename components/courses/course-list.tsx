import React from "react";
import CourseCard from "./course-card";
import { CoursePagination } from "./CoursePagination";

interface CoursesListProps {
  courses: any[];
  total: number;
  page?: number;
  limit?: number;
}

export default function CoursesList({
  courses,
  total,
}: CoursesListProps) {
  const page = 1;
  const limit = 10;
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
            Nenhum curso encontrado.
          </div>
        ) : (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>

      <CoursePagination total={total} />
    </div>
  );
}
