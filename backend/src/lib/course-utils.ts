import { prisma } from "./prisma.js";

export async function updateCourseStudentsCount(courseId: string) {
  const count = await prisma.enrollment.count({
    where: {
      courseId,
      status: "ACTIVE"
    }
  });

  await prisma.course.update({
    where: { id: courseId },
    data: { studentsCount: count }
  });
}
