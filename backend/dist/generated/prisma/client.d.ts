import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
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
