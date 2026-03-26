import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Student: "Student";
    readonly Instructor: "Instructor";
    readonly Category: "Category";
    readonly Course: "Course";
    readonly CourseInstructor: "CourseInstructor";
    readonly Module: "Module";
    readonly Lesson: "Lesson";
    readonly CourseClass: "CourseClass";
    readonly Enrollment: "Enrollment";
    readonly Payment: "Payment";
    readonly RefreshToken: "RefreshToken";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly status: "status";
    readonly avatar: "avatar";
    readonly lastLogin: "lastLogin";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const StudentScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly avatar: "avatar";
    readonly status: "status";
    readonly joinDate: "joinDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly password: "password";
};
export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum];
export declare const InstructorScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly photo: "photo";
    readonly specialization: "specialization";
    readonly yearsExperience: "yearsExperience";
    readonly bio: "bio";
    readonly education: "education";
    readonly linkedin: "linkedin";
    readonly professionalEmail: "professionalEmail";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InstructorScalarFieldEnum = (typeof InstructorScalarFieldEnum)[keyof typeof InstructorScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const CourseScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly thumbnail: "thumbnail";
    readonly categoryId: "categoryId";
    readonly level: "level";
    readonly type: "type";
    readonly status: "status";
    readonly objectives: "objectives";
    readonly targetAudience: "targetAudience";
    readonly requirements: "requirements";
    readonly rating: "rating";
    readonly reviewCount: "reviewCount";
    readonly studentsCount: "studentsCount";
    readonly duration: "duration";
    readonly locationDefault: "locationDefault";
    readonly price: "price";
    readonly discountPrice: "discountPrice";
    readonly longDescription: "longDescription";
    readonly objective: "objective";
    readonly skills: "skills";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum];
export declare const CourseInstructorScalarFieldEnum: {
    readonly courseId: "courseId";
    readonly instructorId: "instructorId";
    readonly assignedAt: "assignedAt";
};
export type CourseInstructorScalarFieldEnum = (typeof CourseInstructorScalarFieldEnum)[keyof typeof CourseInstructorScalarFieldEnum];
export declare const ModuleScalarFieldEnum: {
    readonly id: "id";
    readonly courseId: "courseId";
    readonly title: "title";
    readonly order: "order";
    readonly status: "status";
    readonly duration: "duration";
    readonly topics: "topics";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ModuleScalarFieldEnum = (typeof ModuleScalarFieldEnum)[keyof typeof ModuleScalarFieldEnum];
export declare const LessonScalarFieldEnum: {
    readonly id: "id";
    readonly moduleId: "moduleId";
    readonly title: "title";
    readonly type: "type";
    readonly content: "content";
    readonly duration: "duration";
    readonly order: "order";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LessonScalarFieldEnum = (typeof LessonScalarFieldEnum)[keyof typeof LessonScalarFieldEnum];
export declare const CourseClassScalarFieldEnum: {
    readonly id: "id";
    readonly courseId: "courseId";
    readonly name: "name";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly schedule: "schedule";
    readonly location: "location";
    readonly vacancies: "vacancies";
    readonly enrolledCount: "enrolledCount";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CourseClassScalarFieldEnum = (typeof CourseClassScalarFieldEnum)[keyof typeof CourseClassScalarFieldEnum];
export declare const EnrollmentScalarFieldEnum: {
    readonly id: "id";
    readonly studentId: "studentId";
    readonly courseId: "courseId";
    readonly progress: "progress";
    readonly status: "status";
    readonly contact: "contact";
    readonly date: "date";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly studentId: "studentId";
    readonly courseId: "courseId";
    readonly studentName: "studentName";
    readonly courseName: "courseName";
    readonly amount: "amount";
    readonly paymentProof: "paymentProof";
    readonly status: "status";
    readonly rejectionReason: "rejectionReason";
    readonly approvedAt: "approvedAt";
    readonly rejectedAt: "rejectedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly token: "token";
    readonly portal: "portal";
    readonly entityId: "entityId";
    readonly expiresAt: "expiresAt";
    readonly revoked: "revoked";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
