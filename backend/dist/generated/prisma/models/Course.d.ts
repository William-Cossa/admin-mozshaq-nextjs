import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Course
 * Cursos disponíveis na plataforma
 */
export type CourseModel = runtime.Types.Result.DefaultSelection<Prisma.$CoursePayload>;
export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null;
    _avg: CourseAvgAggregateOutputType | null;
    _sum: CourseSumAggregateOutputType | null;
    _min: CourseMinAggregateOutputType | null;
    _max: CourseMaxAggregateOutputType | null;
};
export type CourseAvgAggregateOutputType = {
    rating: number | null;
    reviewCount: number | null;
    studentsCount: number | null;
    price: number | null;
    discountPrice: number | null;
};
export type CourseSumAggregateOutputType = {
    rating: number | null;
    reviewCount: number | null;
    studentsCount: number | null;
    price: number | null;
    discountPrice: number | null;
};
export type CourseMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    thumbnail: string | null;
    categoryId: string | null;
    level: $Enums.CourseLevel | null;
    type: $Enums.CourseType | null;
    status: $Enums.CourseStatus | null;
    rating: number | null;
    reviewCount: number | null;
    studentsCount: number | null;
    duration: string | null;
    locationDefault: string | null;
    price: number | null;
    discountPrice: number | null;
    longDescription: string | null;
    objective: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CourseMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    thumbnail: string | null;
    categoryId: string | null;
    level: $Enums.CourseLevel | null;
    type: $Enums.CourseType | null;
    status: $Enums.CourseStatus | null;
    rating: number | null;
    reviewCount: number | null;
    studentsCount: number | null;
    duration: string | null;
    locationDefault: string | null;
    price: number | null;
    discountPrice: number | null;
    longDescription: string | null;
    objective: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CourseCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    thumbnail: number;
    categoryId: number;
    level: number;
    type: number;
    status: number;
    objectives: number;
    targetAudience: number;
    requirements: number;
    rating: number;
    reviewCount: number;
    studentsCount: number;
    duration: number;
    locationDefault: number;
    price: number;
    discountPrice: number;
    longDescription: number;
    objective: number;
    skills: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CourseAvgAggregateInputType = {
    rating?: true;
    reviewCount?: true;
    studentsCount?: true;
    price?: true;
    discountPrice?: true;
};
export type CourseSumAggregateInputType = {
    rating?: true;
    reviewCount?: true;
    studentsCount?: true;
    price?: true;
    discountPrice?: true;
};
export type CourseMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    thumbnail?: true;
    categoryId?: true;
    level?: true;
    type?: true;
    status?: true;
    rating?: true;
    reviewCount?: true;
    studentsCount?: true;
    duration?: true;
    locationDefault?: true;
    price?: true;
    discountPrice?: true;
    longDescription?: true;
    objective?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CourseMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    thumbnail?: true;
    categoryId?: true;
    level?: true;
    type?: true;
    status?: true;
    rating?: true;
    reviewCount?: true;
    studentsCount?: true;
    duration?: true;
    locationDefault?: true;
    price?: true;
    discountPrice?: true;
    longDescription?: true;
    objective?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CourseCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    thumbnail?: true;
    categoryId?: true;
    level?: true;
    type?: true;
    status?: true;
    objectives?: true;
    targetAudience?: true;
    requirements?: true;
    rating?: true;
    reviewCount?: true;
    studentsCount?: true;
    duration?: true;
    locationDefault?: true;
    price?: true;
    discountPrice?: true;
    longDescription?: true;
    objective?: true;
    skills?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CourseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: Prisma.CourseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Courses to fetch.
     */
    orderBy?: Prisma.CourseOrderByWithRelationInput | Prisma.CourseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.CourseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Courses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType;
};
export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
    [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCourse[P]> : Prisma.GetScalarType<T[P], AggregateCourse[P]>;
};
export type CourseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseWhereInput;
    orderBy?: Prisma.CourseOrderByWithAggregationInput | Prisma.CourseOrderByWithAggregationInput[];
    by: Prisma.CourseScalarFieldEnum[] | Prisma.CourseScalarFieldEnum;
    having?: Prisma.CourseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CourseCountAggregateInputType | true;
    _avg?: CourseAvgAggregateInputType;
    _sum?: CourseSumAggregateInputType;
    _min?: CourseMinAggregateInputType;
    _max?: CourseMaxAggregateInputType;
};
export type CourseGroupByOutputType = {
    id: string;
    title: string;
    description: string;
    thumbnail: string | null;
    categoryId: string;
    level: $Enums.CourseLevel;
    type: $Enums.CourseType;
    status: $Enums.CourseStatus;
    objectives: string[];
    targetAudience: string[];
    requirements: string[];
    rating: number;
    reviewCount: number;
    studentsCount: number;
    duration: string | null;
    locationDefault: string | null;
    price: number;
    discountPrice: number | null;
    longDescription: string | null;
    objective: string | null;
    skills: string[];
    createdAt: Date;
    updatedAt: Date;
    _count: CourseCountAggregateOutputType | null;
    _avg: CourseAvgAggregateOutputType | null;
    _sum: CourseSumAggregateOutputType | null;
    _min: CourseMinAggregateOutputType | null;
    _max: CourseMaxAggregateOutputType | null;
};
type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CourseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CourseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CourseGroupByOutputType[P]>;
}>>;
export type CourseWhereInput = {
    AND?: Prisma.CourseWhereInput | Prisma.CourseWhereInput[];
    OR?: Prisma.CourseWhereInput[];
    NOT?: Prisma.CourseWhereInput | Prisma.CourseWhereInput[];
    id?: Prisma.StringFilter<"Course"> | string;
    title?: Prisma.StringFilter<"Course"> | string;
    description?: Prisma.StringFilter<"Course"> | string;
    thumbnail?: Prisma.StringNullableFilter<"Course"> | string | null;
    categoryId?: Prisma.StringFilter<"Course"> | string;
    level?: Prisma.EnumCourseLevelFilter<"Course"> | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFilter<"Course"> | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFilter<"Course"> | $Enums.CourseStatus;
    objectives?: Prisma.StringNullableListFilter<"Course">;
    targetAudience?: Prisma.StringNullableListFilter<"Course">;
    requirements?: Prisma.StringNullableListFilter<"Course">;
    rating?: Prisma.FloatFilter<"Course"> | number;
    reviewCount?: Prisma.IntFilter<"Course"> | number;
    studentsCount?: Prisma.IntFilter<"Course"> | number;
    duration?: Prisma.StringNullableFilter<"Course"> | string | null;
    locationDefault?: Prisma.StringNullableFilter<"Course"> | string | null;
    price?: Prisma.FloatFilter<"Course"> | number;
    discountPrice?: Prisma.FloatNullableFilter<"Course"> | number | null;
    longDescription?: Prisma.StringNullableFilter<"Course"> | string | null;
    objective?: Prisma.StringNullableFilter<"Course"> | string | null;
    skills?: Prisma.StringNullableListFilter<"Course">;
    createdAt?: Prisma.DateTimeFilter<"Course"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Course"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    classes?: Prisma.CourseClassListRelationFilter;
    instructors?: Prisma.CourseInstructorListRelationFilter;
    enrollments?: Prisma.EnrollmentListRelationFilter;
    modules?: Prisma.ModuleListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
};
export type CourseOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    objectives?: Prisma.SortOrder;
    targetAudience?: Prisma.SortOrder;
    requirements?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    studentsCount?: Prisma.SortOrder;
    duration?: Prisma.SortOrderInput | Prisma.SortOrder;
    locationDefault?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrder;
    discountPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    longDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    objective?: Prisma.SortOrderInput | Prisma.SortOrder;
    skills?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    category?: Prisma.CategoryOrderByWithRelationInput;
    classes?: Prisma.CourseClassOrderByRelationAggregateInput;
    instructors?: Prisma.CourseInstructorOrderByRelationAggregateInput;
    enrollments?: Prisma.EnrollmentOrderByRelationAggregateInput;
    modules?: Prisma.ModuleOrderByRelationAggregateInput;
    payments?: Prisma.PaymentOrderByRelationAggregateInput;
};
export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CourseWhereInput | Prisma.CourseWhereInput[];
    OR?: Prisma.CourseWhereInput[];
    NOT?: Prisma.CourseWhereInput | Prisma.CourseWhereInput[];
    title?: Prisma.StringFilter<"Course"> | string;
    description?: Prisma.StringFilter<"Course"> | string;
    thumbnail?: Prisma.StringNullableFilter<"Course"> | string | null;
    categoryId?: Prisma.StringFilter<"Course"> | string;
    level?: Prisma.EnumCourseLevelFilter<"Course"> | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFilter<"Course"> | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFilter<"Course"> | $Enums.CourseStatus;
    objectives?: Prisma.StringNullableListFilter<"Course">;
    targetAudience?: Prisma.StringNullableListFilter<"Course">;
    requirements?: Prisma.StringNullableListFilter<"Course">;
    rating?: Prisma.FloatFilter<"Course"> | number;
    reviewCount?: Prisma.IntFilter<"Course"> | number;
    studentsCount?: Prisma.IntFilter<"Course"> | number;
    duration?: Prisma.StringNullableFilter<"Course"> | string | null;
    locationDefault?: Prisma.StringNullableFilter<"Course"> | string | null;
    price?: Prisma.FloatFilter<"Course"> | number;
    discountPrice?: Prisma.FloatNullableFilter<"Course"> | number | null;
    longDescription?: Prisma.StringNullableFilter<"Course"> | string | null;
    objective?: Prisma.StringNullableFilter<"Course"> | string | null;
    skills?: Prisma.StringNullableListFilter<"Course">;
    createdAt?: Prisma.DateTimeFilter<"Course"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Course"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    classes?: Prisma.CourseClassListRelationFilter;
    instructors?: Prisma.CourseInstructorListRelationFilter;
    enrollments?: Prisma.EnrollmentListRelationFilter;
    modules?: Prisma.ModuleListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
}, "id">;
export type CourseOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    objectives?: Prisma.SortOrder;
    targetAudience?: Prisma.SortOrder;
    requirements?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    studentsCount?: Prisma.SortOrder;
    duration?: Prisma.SortOrderInput | Prisma.SortOrder;
    locationDefault?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrder;
    discountPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    longDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    objective?: Prisma.SortOrderInput | Prisma.SortOrder;
    skills?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CourseCountOrderByAggregateInput;
    _avg?: Prisma.CourseAvgOrderByAggregateInput;
    _max?: Prisma.CourseMaxOrderByAggregateInput;
    _min?: Prisma.CourseMinOrderByAggregateInput;
    _sum?: Prisma.CourseSumOrderByAggregateInput;
};
export type CourseScalarWhereWithAggregatesInput = {
    AND?: Prisma.CourseScalarWhereWithAggregatesInput | Prisma.CourseScalarWhereWithAggregatesInput[];
    OR?: Prisma.CourseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CourseScalarWhereWithAggregatesInput | Prisma.CourseScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Course"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Course"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Course"> | string;
    thumbnail?: Prisma.StringNullableWithAggregatesFilter<"Course"> | string | null;
    categoryId?: Prisma.StringWithAggregatesFilter<"Course"> | string;
    level?: Prisma.EnumCourseLevelWithAggregatesFilter<"Course"> | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeWithAggregatesFilter<"Course"> | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusWithAggregatesFilter<"Course"> | $Enums.CourseStatus;
    objectives?: Prisma.StringNullableListFilter<"Course">;
    targetAudience?: Prisma.StringNullableListFilter<"Course">;
    requirements?: Prisma.StringNullableListFilter<"Course">;
    rating?: Prisma.FloatWithAggregatesFilter<"Course"> | number;
    reviewCount?: Prisma.IntWithAggregatesFilter<"Course"> | number;
    studentsCount?: Prisma.IntWithAggregatesFilter<"Course"> | number;
    duration?: Prisma.StringNullableWithAggregatesFilter<"Course"> | string | null;
    locationDefault?: Prisma.StringNullableWithAggregatesFilter<"Course"> | string | null;
    price?: Prisma.FloatWithAggregatesFilter<"Course"> | number;
    discountPrice?: Prisma.FloatNullableWithAggregatesFilter<"Course"> | number | null;
    longDescription?: Prisma.StringNullableWithAggregatesFilter<"Course"> | string | null;
    objective?: Prisma.StringNullableWithAggregatesFilter<"Course"> | string | null;
    skills?: Prisma.StringNullableListFilter<"Course">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Course"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Course"> | Date | string;
};
export type CourseCreateInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutCoursesInput;
    classes?: Prisma.CourseClassCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutCourseInput;
};
export type CourseUncheckedCreateInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    categoryId: string;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: Prisma.CourseClassUncheckedCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorUncheckedCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleUncheckedCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutCourseInput;
};
export type CourseUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutCoursesNestedInput;
    classes?: Prisma.CourseClassUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutCourseNestedInput;
};
export type CourseUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: Prisma.CourseClassUncheckedUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUncheckedUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUncheckedUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutCourseNestedInput;
};
export type CourseCreateManyInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    categoryId: string;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CourseUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseListRelationFilter = {
    every?: Prisma.CourseWhereInput;
    some?: Prisma.CourseWhereInput;
    none?: Prisma.CourseWhereInput;
};
export type CourseOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type CourseCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    objectives?: Prisma.SortOrder;
    targetAudience?: Prisma.SortOrder;
    requirements?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    studentsCount?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    locationDefault?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    discountPrice?: Prisma.SortOrder;
    longDescription?: Prisma.SortOrder;
    objective?: Prisma.SortOrder;
    skills?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CourseAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    studentsCount?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    discountPrice?: Prisma.SortOrder;
};
export type CourseMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    studentsCount?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    locationDefault?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    discountPrice?: Prisma.SortOrder;
    longDescription?: Prisma.SortOrder;
    objective?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CourseMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    studentsCount?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    locationDefault?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    discountPrice?: Prisma.SortOrder;
    longDescription?: Prisma.SortOrder;
    objective?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CourseSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    studentsCount?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    discountPrice?: Prisma.SortOrder;
};
export type CourseScalarRelationFilter = {
    is?: Prisma.CourseWhereInput;
    isNot?: Prisma.CourseWhereInput;
};
export type CourseCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutCategoryInput, Prisma.CourseUncheckedCreateWithoutCategoryInput> | Prisma.CourseCreateWithoutCategoryInput[] | Prisma.CourseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutCategoryInput | Prisma.CourseCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.CourseCreateManyCategoryInputEnvelope;
    connect?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
};
export type CourseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutCategoryInput, Prisma.CourseUncheckedCreateWithoutCategoryInput> | Prisma.CourseCreateWithoutCategoryInput[] | Prisma.CourseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutCategoryInput | Prisma.CourseCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.CourseCreateManyCategoryInputEnvelope;
    connect?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
};
export type CourseUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutCategoryInput, Prisma.CourseUncheckedCreateWithoutCategoryInput> | Prisma.CourseCreateWithoutCategoryInput[] | Prisma.CourseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutCategoryInput | Prisma.CourseCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.CourseUpsertWithWhereUniqueWithoutCategoryInput | Prisma.CourseUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.CourseCreateManyCategoryInputEnvelope;
    set?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
    disconnect?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
    delete?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
    connect?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
    update?: Prisma.CourseUpdateWithWhereUniqueWithoutCategoryInput | Prisma.CourseUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.CourseUpdateManyWithWhereWithoutCategoryInput | Prisma.CourseUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.CourseScalarWhereInput | Prisma.CourseScalarWhereInput[];
};
export type CourseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutCategoryInput, Prisma.CourseUncheckedCreateWithoutCategoryInput> | Prisma.CourseCreateWithoutCategoryInput[] | Prisma.CourseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutCategoryInput | Prisma.CourseCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.CourseUpsertWithWhereUniqueWithoutCategoryInput | Prisma.CourseUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.CourseCreateManyCategoryInputEnvelope;
    set?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
    disconnect?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
    delete?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
    connect?: Prisma.CourseWhereUniqueInput | Prisma.CourseWhereUniqueInput[];
    update?: Prisma.CourseUpdateWithWhereUniqueWithoutCategoryInput | Prisma.CourseUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.CourseUpdateManyWithWhereWithoutCategoryInput | Prisma.CourseUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.CourseScalarWhereInput | Prisma.CourseScalarWhereInput[];
};
export type CourseCreateobjectivesInput = {
    set: string[];
};
export type CourseCreatetargetAudienceInput = {
    set: string[];
};
export type CourseCreaterequirementsInput = {
    set: string[];
};
export type CourseCreateskillsInput = {
    set: string[];
};
export type EnumCourseLevelFieldUpdateOperationsInput = {
    set?: $Enums.CourseLevel;
};
export type EnumCourseTypeFieldUpdateOperationsInput = {
    set?: $Enums.CourseType;
};
export type EnumCourseStatusFieldUpdateOperationsInput = {
    set?: $Enums.CourseStatus;
};
export type CourseUpdateobjectivesInput = {
    set?: string[];
    push?: string | string[];
};
export type CourseUpdatetargetAudienceInput = {
    set?: string[];
    push?: string | string[];
};
export type CourseUpdaterequirementsInput = {
    set?: string[];
    push?: string | string[];
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type CourseUpdateskillsInput = {
    set?: string[];
    push?: string | string[];
};
export type CourseCreateNestedOneWithoutInstructorsInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutInstructorsInput, Prisma.CourseUncheckedCreateWithoutInstructorsInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutInstructorsInput;
    connect?: Prisma.CourseWhereUniqueInput;
};
export type CourseUpdateOneRequiredWithoutInstructorsNestedInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutInstructorsInput, Prisma.CourseUncheckedCreateWithoutInstructorsInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutInstructorsInput;
    upsert?: Prisma.CourseUpsertWithoutInstructorsInput;
    connect?: Prisma.CourseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CourseUpdateToOneWithWhereWithoutInstructorsInput, Prisma.CourseUpdateWithoutInstructorsInput>, Prisma.CourseUncheckedUpdateWithoutInstructorsInput>;
};
export type CourseCreateNestedOneWithoutModulesInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutModulesInput, Prisma.CourseUncheckedCreateWithoutModulesInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutModulesInput;
    connect?: Prisma.CourseWhereUniqueInput;
};
export type CourseUpdateOneRequiredWithoutModulesNestedInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutModulesInput, Prisma.CourseUncheckedCreateWithoutModulesInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutModulesInput;
    upsert?: Prisma.CourseUpsertWithoutModulesInput;
    connect?: Prisma.CourseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CourseUpdateToOneWithWhereWithoutModulesInput, Prisma.CourseUpdateWithoutModulesInput>, Prisma.CourseUncheckedUpdateWithoutModulesInput>;
};
export type CourseCreateNestedOneWithoutClassesInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutClassesInput, Prisma.CourseUncheckedCreateWithoutClassesInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutClassesInput;
    connect?: Prisma.CourseWhereUniqueInput;
};
export type CourseUpdateOneRequiredWithoutClassesNestedInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutClassesInput, Prisma.CourseUncheckedCreateWithoutClassesInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutClassesInput;
    upsert?: Prisma.CourseUpsertWithoutClassesInput;
    connect?: Prisma.CourseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CourseUpdateToOneWithWhereWithoutClassesInput, Prisma.CourseUpdateWithoutClassesInput>, Prisma.CourseUncheckedUpdateWithoutClassesInput>;
};
export type CourseCreateNestedOneWithoutEnrollmentsInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutEnrollmentsInput, Prisma.CourseUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutEnrollmentsInput;
    connect?: Prisma.CourseWhereUniqueInput;
};
export type CourseUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutEnrollmentsInput, Prisma.CourseUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutEnrollmentsInput;
    upsert?: Prisma.CourseUpsertWithoutEnrollmentsInput;
    connect?: Prisma.CourseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CourseUpdateToOneWithWhereWithoutEnrollmentsInput, Prisma.CourseUpdateWithoutEnrollmentsInput>, Prisma.CourseUncheckedUpdateWithoutEnrollmentsInput>;
};
export type CourseCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutPaymentsInput, Prisma.CourseUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.CourseWhereUniqueInput;
};
export type CourseUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.CourseCreateWithoutPaymentsInput, Prisma.CourseUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.CourseCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.CourseUpsertWithoutPaymentsInput;
    connect?: Prisma.CourseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CourseUpdateToOneWithWhereWithoutPaymentsInput, Prisma.CourseUpdateWithoutPaymentsInput>, Prisma.CourseUncheckedUpdateWithoutPaymentsInput>;
};
export type CourseCreateWithoutCategoryInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: Prisma.CourseClassCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutCourseInput;
};
export type CourseUncheckedCreateWithoutCategoryInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: Prisma.CourseClassUncheckedCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorUncheckedCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleUncheckedCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutCourseInput;
};
export type CourseCreateOrConnectWithoutCategoryInput = {
    where: Prisma.CourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseCreateWithoutCategoryInput, Prisma.CourseUncheckedCreateWithoutCategoryInput>;
};
export type CourseCreateManyCategoryInputEnvelope = {
    data: Prisma.CourseCreateManyCategoryInput | Prisma.CourseCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type CourseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.CourseWhereUniqueInput;
    update: Prisma.XOR<Prisma.CourseUpdateWithoutCategoryInput, Prisma.CourseUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.CourseCreateWithoutCategoryInput, Prisma.CourseUncheckedCreateWithoutCategoryInput>;
};
export type CourseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.CourseWhereUniqueInput;
    data: Prisma.XOR<Prisma.CourseUpdateWithoutCategoryInput, Prisma.CourseUncheckedUpdateWithoutCategoryInput>;
};
export type CourseUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.CourseScalarWhereInput;
    data: Prisma.XOR<Prisma.CourseUpdateManyMutationInput, Prisma.CourseUncheckedUpdateManyWithoutCategoryInput>;
};
export type CourseScalarWhereInput = {
    AND?: Prisma.CourseScalarWhereInput | Prisma.CourseScalarWhereInput[];
    OR?: Prisma.CourseScalarWhereInput[];
    NOT?: Prisma.CourseScalarWhereInput | Prisma.CourseScalarWhereInput[];
    id?: Prisma.StringFilter<"Course"> | string;
    title?: Prisma.StringFilter<"Course"> | string;
    description?: Prisma.StringFilter<"Course"> | string;
    thumbnail?: Prisma.StringNullableFilter<"Course"> | string | null;
    categoryId?: Prisma.StringFilter<"Course"> | string;
    level?: Prisma.EnumCourseLevelFilter<"Course"> | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFilter<"Course"> | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFilter<"Course"> | $Enums.CourseStatus;
    objectives?: Prisma.StringNullableListFilter<"Course">;
    targetAudience?: Prisma.StringNullableListFilter<"Course">;
    requirements?: Prisma.StringNullableListFilter<"Course">;
    rating?: Prisma.FloatFilter<"Course"> | number;
    reviewCount?: Prisma.IntFilter<"Course"> | number;
    studentsCount?: Prisma.IntFilter<"Course"> | number;
    duration?: Prisma.StringNullableFilter<"Course"> | string | null;
    locationDefault?: Prisma.StringNullableFilter<"Course"> | string | null;
    price?: Prisma.FloatFilter<"Course"> | number;
    discountPrice?: Prisma.FloatNullableFilter<"Course"> | number | null;
    longDescription?: Prisma.StringNullableFilter<"Course"> | string | null;
    objective?: Prisma.StringNullableFilter<"Course"> | string | null;
    skills?: Prisma.StringNullableListFilter<"Course">;
    createdAt?: Prisma.DateTimeFilter<"Course"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Course"> | Date | string;
};
export type CourseCreateWithoutInstructorsInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutCoursesInput;
    classes?: Prisma.CourseClassCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutCourseInput;
};
export type CourseUncheckedCreateWithoutInstructorsInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    categoryId: string;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: Prisma.CourseClassUncheckedCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleUncheckedCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutCourseInput;
};
export type CourseCreateOrConnectWithoutInstructorsInput = {
    where: Prisma.CourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseCreateWithoutInstructorsInput, Prisma.CourseUncheckedCreateWithoutInstructorsInput>;
};
export type CourseUpsertWithoutInstructorsInput = {
    update: Prisma.XOR<Prisma.CourseUpdateWithoutInstructorsInput, Prisma.CourseUncheckedUpdateWithoutInstructorsInput>;
    create: Prisma.XOR<Prisma.CourseCreateWithoutInstructorsInput, Prisma.CourseUncheckedCreateWithoutInstructorsInput>;
    where?: Prisma.CourseWhereInput;
};
export type CourseUpdateToOneWithWhereWithoutInstructorsInput = {
    where?: Prisma.CourseWhereInput;
    data: Prisma.XOR<Prisma.CourseUpdateWithoutInstructorsInput, Prisma.CourseUncheckedUpdateWithoutInstructorsInput>;
};
export type CourseUpdateWithoutInstructorsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutCoursesNestedInput;
    classes?: Prisma.CourseClassUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutCourseNestedInput;
};
export type CourseUncheckedUpdateWithoutInstructorsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: Prisma.CourseClassUncheckedUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUncheckedUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutCourseNestedInput;
};
export type CourseCreateWithoutModulesInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutCoursesInput;
    classes?: Prisma.CourseClassCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutCourseInput;
};
export type CourseUncheckedCreateWithoutModulesInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    categoryId: string;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: Prisma.CourseClassUncheckedCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorUncheckedCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutCourseInput;
};
export type CourseCreateOrConnectWithoutModulesInput = {
    where: Prisma.CourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseCreateWithoutModulesInput, Prisma.CourseUncheckedCreateWithoutModulesInput>;
};
export type CourseUpsertWithoutModulesInput = {
    update: Prisma.XOR<Prisma.CourseUpdateWithoutModulesInput, Prisma.CourseUncheckedUpdateWithoutModulesInput>;
    create: Prisma.XOR<Prisma.CourseCreateWithoutModulesInput, Prisma.CourseUncheckedCreateWithoutModulesInput>;
    where?: Prisma.CourseWhereInput;
};
export type CourseUpdateToOneWithWhereWithoutModulesInput = {
    where?: Prisma.CourseWhereInput;
    data: Prisma.XOR<Prisma.CourseUpdateWithoutModulesInput, Prisma.CourseUncheckedUpdateWithoutModulesInput>;
};
export type CourseUpdateWithoutModulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutCoursesNestedInput;
    classes?: Prisma.CourseClassUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutCourseNestedInput;
};
export type CourseUncheckedUpdateWithoutModulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: Prisma.CourseClassUncheckedUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUncheckedUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutCourseNestedInput;
};
export type CourseCreateWithoutClassesInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutCoursesInput;
    instructors?: Prisma.CourseInstructorCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutCourseInput;
};
export type CourseUncheckedCreateWithoutClassesInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    categoryId: string;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    instructors?: Prisma.CourseInstructorUncheckedCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleUncheckedCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutCourseInput;
};
export type CourseCreateOrConnectWithoutClassesInput = {
    where: Prisma.CourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseCreateWithoutClassesInput, Prisma.CourseUncheckedCreateWithoutClassesInput>;
};
export type CourseUpsertWithoutClassesInput = {
    update: Prisma.XOR<Prisma.CourseUpdateWithoutClassesInput, Prisma.CourseUncheckedUpdateWithoutClassesInput>;
    create: Prisma.XOR<Prisma.CourseCreateWithoutClassesInput, Prisma.CourseUncheckedCreateWithoutClassesInput>;
    where?: Prisma.CourseWhereInput;
};
export type CourseUpdateToOneWithWhereWithoutClassesInput = {
    where?: Prisma.CourseWhereInput;
    data: Prisma.XOR<Prisma.CourseUpdateWithoutClassesInput, Prisma.CourseUncheckedUpdateWithoutClassesInput>;
};
export type CourseUpdateWithoutClassesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutCoursesNestedInput;
    instructors?: Prisma.CourseInstructorUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutCourseNestedInput;
};
export type CourseUncheckedUpdateWithoutClassesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    instructors?: Prisma.CourseInstructorUncheckedUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUncheckedUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutCourseNestedInput;
};
export type CourseCreateWithoutEnrollmentsInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutCoursesInput;
    classes?: Prisma.CourseClassCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutCourseInput;
};
export type CourseUncheckedCreateWithoutEnrollmentsInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    categoryId: string;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: Prisma.CourseClassUncheckedCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorUncheckedCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleUncheckedCreateNestedManyWithoutCourseInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutCourseInput;
};
export type CourseCreateOrConnectWithoutEnrollmentsInput = {
    where: Prisma.CourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseCreateWithoutEnrollmentsInput, Prisma.CourseUncheckedCreateWithoutEnrollmentsInput>;
};
export type CourseUpsertWithoutEnrollmentsInput = {
    update: Prisma.XOR<Prisma.CourseUpdateWithoutEnrollmentsInput, Prisma.CourseUncheckedUpdateWithoutEnrollmentsInput>;
    create: Prisma.XOR<Prisma.CourseCreateWithoutEnrollmentsInput, Prisma.CourseUncheckedCreateWithoutEnrollmentsInput>;
    where?: Prisma.CourseWhereInput;
};
export type CourseUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: Prisma.CourseWhereInput;
    data: Prisma.XOR<Prisma.CourseUpdateWithoutEnrollmentsInput, Prisma.CourseUncheckedUpdateWithoutEnrollmentsInput>;
};
export type CourseUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutCoursesNestedInput;
    classes?: Prisma.CourseClassUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutCourseNestedInput;
};
export type CourseUncheckedUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: Prisma.CourseClassUncheckedUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUncheckedUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUncheckedUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutCourseNestedInput;
};
export type CourseCreateWithoutPaymentsInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutCoursesInput;
    classes?: Prisma.CourseClassCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleCreateNestedManyWithoutCourseInput;
};
export type CourseUncheckedCreateWithoutPaymentsInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    categoryId: string;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: Prisma.CourseClassUncheckedCreateNestedManyWithoutCourseInput;
    instructors?: Prisma.CourseInstructorUncheckedCreateNestedManyWithoutCourseInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutCourseInput;
    modules?: Prisma.ModuleUncheckedCreateNestedManyWithoutCourseInput;
};
export type CourseCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.CourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseCreateWithoutPaymentsInput, Prisma.CourseUncheckedCreateWithoutPaymentsInput>;
};
export type CourseUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.CourseUpdateWithoutPaymentsInput, Prisma.CourseUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.CourseCreateWithoutPaymentsInput, Prisma.CourseUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.CourseWhereInput;
};
export type CourseUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.CourseWhereInput;
    data: Prisma.XOR<Prisma.CourseUpdateWithoutPaymentsInput, Prisma.CourseUncheckedUpdateWithoutPaymentsInput>;
};
export type CourseUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutCoursesNestedInput;
    classes?: Prisma.CourseClassUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUpdateManyWithoutCourseNestedInput;
};
export type CourseUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: Prisma.CourseClassUncheckedUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUncheckedUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUncheckedUpdateManyWithoutCourseNestedInput;
};
export type CourseCreateManyCategoryInput = {
    id: string;
    title: string;
    description: string;
    thumbnail?: string | null;
    level?: $Enums.CourseLevel;
    type?: $Enums.CourseType;
    status?: $Enums.CourseStatus;
    objectives?: Prisma.CourseCreateobjectivesInput | string[];
    targetAudience?: Prisma.CourseCreatetargetAudienceInput | string[];
    requirements?: Prisma.CourseCreaterequirementsInput | string[];
    rating?: number;
    reviewCount?: number;
    studentsCount?: number;
    duration?: string | null;
    locationDefault?: string | null;
    price: number;
    discountPrice?: number | null;
    longDescription?: string | null;
    objective?: string | null;
    skills?: Prisma.CourseCreateskillsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CourseUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: Prisma.CourseClassUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutCourseNestedInput;
};
export type CourseUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: Prisma.CourseClassUncheckedUpdateManyWithoutCourseNestedInput;
    instructors?: Prisma.CourseInstructorUncheckedUpdateManyWithoutCourseNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutCourseNestedInput;
    modules?: Prisma.ModuleUncheckedUpdateManyWithoutCourseNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutCourseNestedInput;
};
export type CourseUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    thumbnail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    level?: Prisma.EnumCourseLevelFieldUpdateOperationsInput | $Enums.CourseLevel;
    type?: Prisma.EnumCourseTypeFieldUpdateOperationsInput | $Enums.CourseType;
    status?: Prisma.EnumCourseStatusFieldUpdateOperationsInput | $Enums.CourseStatus;
    objectives?: Prisma.CourseUpdateobjectivesInput | string[];
    targetAudience?: Prisma.CourseUpdatetargetAudienceInput | string[];
    requirements?: Prisma.CourseUpdaterequirementsInput | string[];
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    studentsCount?: Prisma.IntFieldUpdateOperationsInput | number;
    duration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationDefault?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    objective?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    skills?: Prisma.CourseUpdateskillsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type CourseCountOutputType
 */
export type CourseCountOutputType = {
    classes: number;
    instructors: number;
    enrollments: number;
    modules: number;
    payments: number;
};
export type CourseCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    classes?: boolean | CourseCountOutputTypeCountClassesArgs;
    instructors?: boolean | CourseCountOutputTypeCountInstructorsArgs;
    enrollments?: boolean | CourseCountOutputTypeCountEnrollmentsArgs;
    modules?: boolean | CourseCountOutputTypeCountModulesArgs;
    payments?: boolean | CourseCountOutputTypeCountPaymentsArgs;
};
/**
 * CourseCountOutputType without action
 */
export type CourseCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: Prisma.CourseCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * CourseCountOutputType without action
 */
export type CourseCountOutputTypeCountClassesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseClassWhereInput;
};
/**
 * CourseCountOutputType without action
 */
export type CourseCountOutputTypeCountInstructorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseInstructorWhereInput;
};
/**
 * CourseCountOutputType without action
 */
export type CourseCountOutputTypeCountEnrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EnrollmentWhereInput;
};
/**
 * CourseCountOutputType without action
 */
export type CourseCountOutputTypeCountModulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModuleWhereInput;
};
/**
 * CourseCountOutputType without action
 */
export type CourseCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
export type CourseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    thumbnail?: boolean;
    categoryId?: boolean;
    level?: boolean;
    type?: boolean;
    status?: boolean;
    objectives?: boolean;
    targetAudience?: boolean;
    requirements?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    studentsCount?: boolean;
    duration?: boolean;
    locationDefault?: boolean;
    price?: boolean;
    discountPrice?: boolean;
    longDescription?: boolean;
    objective?: boolean;
    skills?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    classes?: boolean | Prisma.Course$classesArgs<ExtArgs>;
    instructors?: boolean | Prisma.Course$instructorsArgs<ExtArgs>;
    enrollments?: boolean | Prisma.Course$enrollmentsArgs<ExtArgs>;
    modules?: boolean | Prisma.Course$modulesArgs<ExtArgs>;
    payments?: boolean | Prisma.Course$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.CourseCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["course"]>;
export type CourseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    thumbnail?: boolean;
    categoryId?: boolean;
    level?: boolean;
    type?: boolean;
    status?: boolean;
    objectives?: boolean;
    targetAudience?: boolean;
    requirements?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    studentsCount?: boolean;
    duration?: boolean;
    locationDefault?: boolean;
    price?: boolean;
    discountPrice?: boolean;
    longDescription?: boolean;
    objective?: boolean;
    skills?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["course"]>;
export type CourseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    thumbnail?: boolean;
    categoryId?: boolean;
    level?: boolean;
    type?: boolean;
    status?: boolean;
    objectives?: boolean;
    targetAudience?: boolean;
    requirements?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    studentsCount?: boolean;
    duration?: boolean;
    locationDefault?: boolean;
    price?: boolean;
    discountPrice?: boolean;
    longDescription?: boolean;
    objective?: boolean;
    skills?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["course"]>;
export type CourseSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    thumbnail?: boolean;
    categoryId?: boolean;
    level?: boolean;
    type?: boolean;
    status?: boolean;
    objectives?: boolean;
    targetAudience?: boolean;
    requirements?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    studentsCount?: boolean;
    duration?: boolean;
    locationDefault?: boolean;
    price?: boolean;
    discountPrice?: boolean;
    longDescription?: boolean;
    objective?: boolean;
    skills?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CourseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "thumbnail" | "categoryId" | "level" | "type" | "status" | "objectives" | "targetAudience" | "requirements" | "rating" | "reviewCount" | "studentsCount" | "duration" | "locationDefault" | "price" | "discountPrice" | "longDescription" | "objective" | "skills" | "createdAt" | "updatedAt", ExtArgs["result"]["course"]>;
export type CourseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    classes?: boolean | Prisma.Course$classesArgs<ExtArgs>;
    instructors?: boolean | Prisma.Course$instructorsArgs<ExtArgs>;
    enrollments?: boolean | Prisma.Course$enrollmentsArgs<ExtArgs>;
    modules?: boolean | Prisma.Course$modulesArgs<ExtArgs>;
    payments?: boolean | Prisma.Course$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.CourseCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CourseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type CourseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $CoursePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Course";
    objects: {
        category: Prisma.$CategoryPayload<ExtArgs>;
        classes: Prisma.$CourseClassPayload<ExtArgs>[];
        instructors: Prisma.$CourseInstructorPayload<ExtArgs>[];
        enrollments: Prisma.$EnrollmentPayload<ExtArgs>[];
        modules: Prisma.$ModulePayload<ExtArgs>[];
        payments: Prisma.$PaymentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        description: string;
        thumbnail: string | null;
        categoryId: string;
        level: $Enums.CourseLevel;
        type: $Enums.CourseType;
        status: $Enums.CourseStatus;
        objectives: string[];
        targetAudience: string[];
        requirements: string[];
        rating: number;
        reviewCount: number;
        studentsCount: number;
        duration: string | null;
        locationDefault: string | null;
        price: number;
        discountPrice: number | null;
        longDescription: string | null;
        objective: string | null;
        skills: string[];
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["course"]>;
    composites: {};
};
export type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CoursePayload, S>;
export type CourseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CourseCountAggregateInputType | true;
};
export interface CourseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Course'];
        meta: {
            name: 'Course';
        };
    };
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: Prisma.SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: Prisma.SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     *
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CourseFindManyArgs>(args?: Prisma.SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     *
     */
    create<T extends CourseCreateArgs>(args: Prisma.SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CourseCreateManyArgs>(args?: Prisma.SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     *
     */
    delete<T extends CourseDeleteArgs>(args: Prisma.SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CourseUpdateArgs>(args: Prisma.SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: Prisma.SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CourseUpdateManyArgs>(args: Prisma.SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: Prisma.SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(args?: Prisma.Subset<T, CourseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CourseCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Prisma.Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>;
    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends CourseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CourseGroupByArgs['orderBy'];
    } : {
        orderBy?: CourseGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Course model
     */
    readonly fields: CourseFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Course.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CourseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    classes<T extends Prisma.Course$classesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Course$classesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    instructors<T extends Prisma.Course$instructorsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Course$instructorsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseInstructorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    enrollments<T extends Prisma.Course$enrollmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Course$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    modules<T extends Prisma.Course$modulesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Course$modulesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    payments<T extends Prisma.Course$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Course$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Course model
 */
export interface CourseFieldRefs {
    readonly id: Prisma.FieldRef<"Course", 'String'>;
    readonly title: Prisma.FieldRef<"Course", 'String'>;
    readonly description: Prisma.FieldRef<"Course", 'String'>;
    readonly thumbnail: Prisma.FieldRef<"Course", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Course", 'String'>;
    readonly level: Prisma.FieldRef<"Course", 'CourseLevel'>;
    readonly type: Prisma.FieldRef<"Course", 'CourseType'>;
    readonly status: Prisma.FieldRef<"Course", 'CourseStatus'>;
    readonly objectives: Prisma.FieldRef<"Course", 'String[]'>;
    readonly targetAudience: Prisma.FieldRef<"Course", 'String[]'>;
    readonly requirements: Prisma.FieldRef<"Course", 'String[]'>;
    readonly rating: Prisma.FieldRef<"Course", 'Float'>;
    readonly reviewCount: Prisma.FieldRef<"Course", 'Int'>;
    readonly studentsCount: Prisma.FieldRef<"Course", 'Int'>;
    readonly duration: Prisma.FieldRef<"Course", 'String'>;
    readonly locationDefault: Prisma.FieldRef<"Course", 'String'>;
    readonly price: Prisma.FieldRef<"Course", 'Float'>;
    readonly discountPrice: Prisma.FieldRef<"Course", 'Float'>;
    readonly longDescription: Prisma.FieldRef<"Course", 'String'>;
    readonly objective: Prisma.FieldRef<"Course", 'String'>;
    readonly skills: Prisma.FieldRef<"Course", 'String[]'>;
    readonly createdAt: Prisma.FieldRef<"Course", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Course", 'DateTime'>;
}
/**
 * Course findUnique
 */
export type CourseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Course to fetch.
     */
    where: Prisma.CourseWhereUniqueInput;
};
/**
 * Course findUniqueOrThrow
 */
export type CourseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Course to fetch.
     */
    where: Prisma.CourseWhereUniqueInput;
};
/**
 * Course findFirst
 */
export type CourseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Course to fetch.
     */
    where?: Prisma.CourseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Courses to fetch.
     */
    orderBy?: Prisma.CourseOrderByWithRelationInput | Prisma.CourseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Courses.
     */
    cursor?: Prisma.CourseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Courses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Courses.
     */
    distinct?: Prisma.CourseScalarFieldEnum | Prisma.CourseScalarFieldEnum[];
};
/**
 * Course findFirstOrThrow
 */
export type CourseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Course to fetch.
     */
    where?: Prisma.CourseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Courses to fetch.
     */
    orderBy?: Prisma.CourseOrderByWithRelationInput | Prisma.CourseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Courses.
     */
    cursor?: Prisma.CourseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Courses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Courses.
     */
    distinct?: Prisma.CourseScalarFieldEnum | Prisma.CourseScalarFieldEnum[];
};
/**
 * Course findMany
 */
export type CourseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    /**
     * Filter, which Courses to fetch.
     */
    where?: Prisma.CourseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Courses to fetch.
     */
    orderBy?: Prisma.CourseOrderByWithRelationInput | Prisma.CourseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Courses.
     */
    cursor?: Prisma.CourseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Courses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Courses.
     */
    distinct?: Prisma.CourseScalarFieldEnum | Prisma.CourseScalarFieldEnum[];
};
/**
 * Course create
 */
export type CourseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    /**
     * The data needed to create a Course.
     */
    data: Prisma.XOR<Prisma.CourseCreateInput, Prisma.CourseUncheckedCreateInput>;
};
/**
 * Course createMany
 */
export type CourseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: Prisma.CourseCreateManyInput | Prisma.CourseCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Course createManyAndReturn
 */
export type CourseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * The data used to create many Courses.
     */
    data: Prisma.CourseCreateManyInput | Prisma.CourseCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Course update
 */
export type CourseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    /**
     * The data needed to update a Course.
     */
    data: Prisma.XOR<Prisma.CourseUpdateInput, Prisma.CourseUncheckedUpdateInput>;
    /**
     * Choose, which Course to update.
     */
    where: Prisma.CourseWhereUniqueInput;
};
/**
 * Course updateMany
 */
export type CourseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: Prisma.XOR<Prisma.CourseUpdateManyMutationInput, Prisma.CourseUncheckedUpdateManyInput>;
    /**
     * Filter which Courses to update
     */
    where?: Prisma.CourseWhereInput;
    /**
     * Limit how many Courses to update.
     */
    limit?: number;
};
/**
 * Course updateManyAndReturn
 */
export type CourseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * The data used to update Courses.
     */
    data: Prisma.XOR<Prisma.CourseUpdateManyMutationInput, Prisma.CourseUncheckedUpdateManyInput>;
    /**
     * Filter which Courses to update
     */
    where?: Prisma.CourseWhereInput;
    /**
     * Limit how many Courses to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Course upsert
 */
export type CourseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: Prisma.CourseWhereUniqueInput;
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: Prisma.XOR<Prisma.CourseCreateInput, Prisma.CourseUncheckedCreateInput>;
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.CourseUpdateInput, Prisma.CourseUncheckedUpdateInput>;
};
/**
 * Course delete
 */
export type CourseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    /**
     * Filter which Course to delete.
     */
    where: Prisma.CourseWhereUniqueInput;
};
/**
 * Course deleteMany
 */
export type CourseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: Prisma.CourseWhereInput;
    /**
     * Limit how many Courses to delete.
     */
    limit?: number;
};
/**
 * Course.classes
 */
export type Course$classesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseClass
     */
    select?: Prisma.CourseClassSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CourseClass
     */
    omit?: Prisma.CourseClassOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseClassInclude<ExtArgs> | null;
    where?: Prisma.CourseClassWhereInput;
    orderBy?: Prisma.CourseClassOrderByWithRelationInput | Prisma.CourseClassOrderByWithRelationInput[];
    cursor?: Prisma.CourseClassWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CourseClassScalarFieldEnum | Prisma.CourseClassScalarFieldEnum[];
};
/**
 * Course.instructors
 */
export type Course$instructorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseInstructor
     */
    select?: Prisma.CourseInstructorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CourseInstructor
     */
    omit?: Prisma.CourseInstructorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInstructorInclude<ExtArgs> | null;
    where?: Prisma.CourseInstructorWhereInput;
    orderBy?: Prisma.CourseInstructorOrderByWithRelationInput | Prisma.CourseInstructorOrderByWithRelationInput[];
    cursor?: Prisma.CourseInstructorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CourseInstructorScalarFieldEnum | Prisma.CourseInstructorScalarFieldEnum[];
};
/**
 * Course.enrollments
 */
export type Course$enrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: Prisma.EnrollmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: Prisma.EnrollmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EnrollmentInclude<ExtArgs> | null;
    where?: Prisma.EnrollmentWhereInput;
    orderBy?: Prisma.EnrollmentOrderByWithRelationInput | Prisma.EnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.EnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EnrollmentScalarFieldEnum | Prisma.EnrollmentScalarFieldEnum[];
};
/**
 * Course.modules
 */
export type Course$modulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: Prisma.ModuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Module
     */
    omit?: Prisma.ModuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ModuleInclude<ExtArgs> | null;
    where?: Prisma.ModuleWhereInput;
    orderBy?: Prisma.ModuleOrderByWithRelationInput | Prisma.ModuleOrderByWithRelationInput[];
    cursor?: Prisma.ModuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModuleScalarFieldEnum | Prisma.ModuleScalarFieldEnum[];
};
/**
 * Course.payments
 */
export type Course$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
/**
 * Course without action
 */
export type CourseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
};
export {};
