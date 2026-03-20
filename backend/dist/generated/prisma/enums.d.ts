export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly MANAGER: "MANAGER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly PENDING: "PENDING";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const StudentStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly PENDING: "PENDING";
    readonly DROPPED: "DROPPED";
};
export type StudentStatus = (typeof StudentStatus)[keyof typeof StudentStatus];
export declare const InstructorStatus: {
    readonly ACTIVO: "ACTIVO";
    readonly INACTIVO: "INACTIVO";
};
export type InstructorStatus = (typeof InstructorStatus)[keyof typeof InstructorStatus];
export declare const CourseType: {
    readonly ONLINE: "ONLINE";
    readonly PRESENCIAL: "PRESENCIAL";
    readonly HIBRIDO: "HIBRIDO";
};
export type CourseType = (typeof CourseType)[keyof typeof CourseType];
export declare const CourseStatus: {
    readonly RASCUNHO: "RASCUNHO";
    readonly PUBLICADO: "PUBLICADO";
    readonly ENCERRADO: "ENCERRADO";
};
export type CourseStatus = (typeof CourseStatus)[keyof typeof CourseStatus];
export declare const CourseLevel: {
    readonly INICIANTE: "INICIANTE";
    readonly INTERMEDIARIO: "INTERMEDIARIO";
    readonly AVANCADO: "AVANCADO";
};
export type CourseLevel = (typeof CourseLevel)[keyof typeof CourseLevel];
export declare const ModuleStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type ModuleStatus = (typeof ModuleStatus)[keyof typeof ModuleStatus];
export declare const LessonType: {
    readonly VIDEO: "VIDEO";
    readonly TEXTO: "TEXTO";
    readonly QUIZ: "QUIZ";
    readonly LIVE: "LIVE";
};
export type LessonType = (typeof LessonType)[keyof typeof LessonType];
export declare const CourseClassStatus: {
    readonly ABERTA: "ABERTA";
    readonly LOTADA: "LOTADA";
    readonly FINALIZADA: "FINALIZADA";
};
export type CourseClassStatus = (typeof CourseClassStatus)[keyof typeof CourseClassStatus];
export declare const EnrollmentStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly DROPPED: "DROPPED";
};
export type EnrollmentStatus = (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
