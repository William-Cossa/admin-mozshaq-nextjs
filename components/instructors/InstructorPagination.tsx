"use client";



interface InstructorPaginationProps {
  total: number;
  page?: number;
  limit?: number;
}

export function InstructorPagination({
  total,
}: InstructorPaginationProps) {


  if (total === 0) return null;

  return (
    <div className="mt-auto p-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/10">
      <p className="text-xs text-slate-500 font-medium">
        Total de {total} formadores
      </p>
    </div>
  );
}
