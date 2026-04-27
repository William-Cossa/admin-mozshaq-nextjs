"use client";



interface CoursePaginationProps {
  total: number;
  page?: number;
  limit?: number;
}

export function CoursePagination({
  total,
}: CoursePaginationProps) {


  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm mt-4">
      <p className="text-sm text-slate-500 font-medium">
        Total de {total} cursos
      </p>
    </div>
  );
}
