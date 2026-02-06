import { z } from "zod";
import { courseSchema } from "./schemas/course-schema";

export type Course = z.infer<typeof courseSchema> & { id: string };

const LOCAL_STORAGE_KEY = "courses";

export const getCourses = (): Course[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const coursesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return coursesJson ? JSON.parse(coursesJson) : [];
};

export const getCourseById = (id: string): Course | undefined => {
  const courses = getCourses();
  return courses.find((course) => course.id === id);
};

export const saveCourse = (course: Course): void => {
  if (typeof window === "undefined") {
    return;
  }
  const courses = getCourses();
  const existingIndex = courses.findIndex((c) => c.id === course.id);

  if (existingIndex > -1) {
    // Update existing course
    courses[existingIndex] = course;
  } else {
    // Add new course
    courses.push(course);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
};

export const deleteCourse = (id: string): void => {
  if (typeof window === "undefined") {
    return;
  }
  let courses = getCourses();
  courses = courses.filter((course) => course.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
};
