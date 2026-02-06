import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Edit3,
  ListTree,
  MoreVertical,
  Users,
  Clock,
  Globe,
  MapPin,
  Layers,
} from "lucide-react";

interface Props {
  course: any;
}

export default function CourseCard({ course }: Props) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute top-3 left-3 z-20 flex gap-2">
          <span className="px-2 py-0.5 rounded-lg bg-white/95 dark:bg-black/50 text-[10px] font-black text-primary uppercase tracking-widest shadow-sm">
            {course.category}
          </span>

          <span
            className={cn(
              "px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1",
              course.type === "ONLINE"
                ? "bg-blue-500 text-white"
                : course.type === "PRESENCIAL"
                ? "bg-orange-500 text-white"
                : "bg-purple-500 text-white"
            )}
          >
            {course.type === "ONLINE" && <Globe size={8} />}
            {course.type === "PRESENCIAL" && <MapPin size={8} />}
            {course.type === "HIBRIDO" && <Layers size={8} />}
            {course.type}
          </span>
        </div>

        {/* Hover buttons */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <Link
            href={`/courses/${course.id}/edit`}
            className="p-1.5 rounded-xl bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all"
          >
            <Edit3 size={16} />
          </Link>
          <Link
            href={`/courses/${course.id}/structure`}
            className="p-1.5 rounded-xl bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-all"
          >
            <ListTree size={16} />
          </Link>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical size={18} />
          </button>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Users size={14} />
              <span>{course.studentsCount?.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">STATUS</span>
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                course.status === "PUBLICADO"
                  ? "text-emerald-500"
                  : course.status === "RASCUNHO"
                  ? "text-amber-500"
                  : "text-slate-400"
              )}
            >
              {course.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
