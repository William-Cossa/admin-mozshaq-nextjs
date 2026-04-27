"use client";



interface StudentPaginationProps {
  total: number;
  page?: number;
  limit?: number;
}

export function StudentPagination({
  total,
}: StudentPaginationProps) {


  if (total === 0) return (
    <div className="mt-auto p-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
      <p className="text-xs text-slate-400 font-medium">Nenhum resultado</p>
    </div>
  );

  return (
    <div className="mt-auto p-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        Total de {total} estudantes
      </p>
    </div>
  );
}
