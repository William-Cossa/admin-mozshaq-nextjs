import * as Prisma from './internal/prismaNamespaceBrowser.js';
export { Prisma };
export * as $Enums from './enums.js';
export * from './enums.js';
/**
 * Model User
 * Administradores e gestores da plataforma
 */
export type User = Prisma.UserModel;
/**
 * Model Student
 * Alunos inscritos na plataforma
 */
export type Student = Prisma.StudentModel;
/**
 * Model Instructor
 * Formadores/instrutores dos cursos
 */
export type Instructor = Prisma.InstructorModel;
/**
 * Model Category
 * Categorias de cursos
 */
export type Category = Prisma.CategoryModel;
/**
 * Model Course
 * Cursos disponíveis na plataforma
 */
export type Course = Prisma.CourseModel;
/**
 * Model CourseInstructor
 * Tabela de junção N:N entre Cursos e Instrutores
 */
export type CourseInstructor = Prisma.CourseInstructorModel;
/**
 * Model Module
 * Módulos de um curso (capítulos/secções)
 */
export type Module = Prisma.ModuleModel;
/**
 * Model Lesson
 * Aulas dentro de um módulo
 */
export type Lesson = Prisma.LessonModel;
/**
 * Model CourseClass
 * Turmas de um curso (para modalidades PRESENCIAL/HIBRIDO)
 */
export type CourseClass = Prisma.CourseClassModel;
/**
 * Model Enrollment
 * Inscrições de alunos em cursos
 */
export type Enrollment = Prisma.EnrollmentModel;
/**
 * Model Payment
 * Pagamentos de alunos para inscrição em cursos
 */
export type Payment = Prisma.PaymentModel;
/**
 * Model RefreshToken
 * Refresh tokens persistidos para revogação segura (admin + student portals)
 */
export type RefreshToken = Prisma.RefreshTokenModel;
