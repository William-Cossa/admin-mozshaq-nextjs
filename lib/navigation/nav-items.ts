import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle,
  BarChart3,
  UserRound,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Estudantes", icon: GraduationCap, path: "/students" },
  { label: "Cursos", icon: BookOpen, path: "/courses" },
  { label: "Instrutores", icon: UserRound, path: "/instructors" },
  { label: "Inscrições", icon: CheckCircle, path: "/enrollments" },
  { label: "Usuários", icon: Users, path: "/users" },
  { label: "Relatórios", icon: BarChart3, path: "/reports" },
];
