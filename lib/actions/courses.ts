"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:3001/api").replace(/\/$/, "");
const API_URL = BASE_URL;

export async function getCourses(params?: Record<string, string>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { data: [], total: 0, page: 1, limit: 10 };

  const query = params ? "?" + new URLSearchParams(params).toString() : "";

  try {
    const res = await fetch(`${API_URL}/admin/courses${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "force-cache",
    });

    if (!res.ok) return { data: [], total: 0, page: 1, limit: 10 };
    return await res.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { data: [], total: 0, page: 1, limit: 10 };
  }
}

export async function getCourseById(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "force-cache",
    });

    if (!res.ok) return { success: false, error: "Curso não encontrado" };
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    console.error(`Error fetching course ${id}:`, error);
    return { success: false, error: error.message };
  }
}

export async function createCourse(data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData };
    }

    revalidatePath("/courses");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating course:", error);
    return { success: false, error: error.message };
  }
}

export async function updateCourse(id: string, data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData };
    }

    revalidatePath("/courses");
    revalidatePath(`/courses/${id}/edit`);
    return { success: true };
  } catch (error: any) {
    console.error(`Error updating course ${id}:`, error);
    return { success: false, error: error.message };
  }
}

export async function deleteCourse(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao apagar curso" };
    }

    revalidatePath("/courses");
    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting course ${id}:`, error);
    return { success: false, error: error.message };
  }
}
