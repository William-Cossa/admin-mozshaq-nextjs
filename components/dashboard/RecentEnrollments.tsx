import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type RecentEnrollmentProps = {
  enrollments: any[];
};

export default function RecentEnrollments({ enrollments }: RecentEnrollmentProps) {
  if (!enrollments || enrollments.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Inscrições Recentes</h3>
      </div>
      <div className="space-y-4">
        {enrollments.map((enr) => (
          <div key={enr.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={enr.student.avatar || ""} alt={enr.student.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {enr.student.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{enr.student.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px] sm:max-w-[300px] truncate">{enr.course.title}</p>
              </div>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(enr.course.price)}
              </p>
              <p className="text-xs text-slate-500 capitalize">
                {format(new Date(enr.createdAt), "dd MMM, HH:mm", { locale: ptBR })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
