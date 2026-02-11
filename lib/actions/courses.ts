"use server";

import { Course } from "@/types/types";
import { revalidatePath } from "next/cache";

const API_URL =
  (process.env.API_COURSES_URL as string) ||
  (process.env.NEXT_PUBLIC_API_COURSES_URL as string);

export async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch courses");
    return res.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch course");
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    return null;
  }
}

export async function createCourse(
  data: Omit<Course, "id"> | Course,
): Promise<Course> {
  const { id, ...rest } = data as Course; // Remove ID to let json-server generate it if needed, or if it's empty string

  // If id is present and not empty, we might want to keep it, but usually for creation we drop it.
  // json-server generates a string id.

  const payload = {
    ...rest,
    updatedAt: new Date().toISOString(),
    studentsCount: 0,
    rating: 0,
    reviewCount: 0,
    modules: rest.modules || [],
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create course");
  }

  revalidatePath("/courses");
  return res.json();
}

export async function updateCourse(
  id: string,
  data: Partial<Course>,
): Promise<Course> {
  const payload = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update course");
  }

  revalidatePath("/courses");
  revalidatePath(`/courses/${id}`);
  revalidatePath(`/courses/${id}/edit`);

  return res.json();
}
