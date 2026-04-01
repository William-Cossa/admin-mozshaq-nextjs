export type Role = "admin" | "manager";

export type CourseType = "ONLINE" | "PRESENCIAL" | "HIBRIDO";
export type CourseStatus = "RASCUNHO" | "PUBLICADO" | "ENCERRADO";
export type CourseLevel = "INICIANTE" | "INTERMEDIARIO" | "AVANCADO";
export type LessonType = "VIDEO" | "TEXTO" | "QUIZ" | "LIVE";
export type InstructorStatus = "ACTIVO" | "INACTIVO";

export interface Instructor {
  id: string;
  name: string;
  slug: string;
  photo?: string;
  specialization: string;
  yearsExperience: number;
  bio: string;
  education: string;
  phone?: string;
  professionalEmail?: string;
  status: InstructorStatus;
  courseIds: string[]; // Relação N:N
}

export interface Lesson {
  id: string;
  title: string;
  type?: LessonType;
  content?: string;
  duration?: string;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
  status: "draft" | "published" | "archived";
}

export interface CourseClass {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  schedule: string;
  location: string;
  vacancies: number;
  enrolledCount: number;
  status: "ABERTA" | "LOTADA" | "FINALIZADA";
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  level: CourseLevel;
  type: CourseType;
  status: CourseStatus;
  instructorIds: string[]; // Atualizado para N:N

  objectives: string[];
  targetAudience: string[];
  requirements: string[];

  rating: number;
  reviewCount: number;
  studentsCount: number;

  modules?: Module[];
  classes?: CourseClass[];
  locationDefault?: string;

  duration: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  status: "active" | "pending" | "inactive";
  lastLogin: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "DROPPED";
  statusLabel?: string;
  joinDate: string;
  createdAt?: string;
  totalCursos?: number;
  cursosActivos?: number;
  totalInvestido?: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  courseId: string;
  courseName: string;
  date: string;
  progress: number;
  status: "active" | "pending" | "completed" | "dropped";
  contact?: string;
}

export type PaymentStatus = "pending" | "approved" | "rejected";

export interface Payment {
  id: string;
  studentName: string;
  courseName: string;
  amount: number;
  paymentProof: string;
  status: PaymentStatus;
  rejectionReason?: string;
  createdAt: string;
}
