"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function createLesson(courseId: string, moduleId: string, data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${courseId}/modules/${moduleId}/lessons`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao criar aula" };
    }

    const { lesson } = await res.json();
    revalidatePath(`/courses/${courseId}/edit`);
    return { success: true, data: lesson };
  } catch (error: any) {
    console.error("Error creating lesson:", error);
    return { success: false, error: error.message };
  }
}

export async function updateLesson(courseId: string, moduleId: string, lessonId: string, data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao editar aula" };
    }

    const { lesson } = await res.json();
    revalidatePath(`/courses/${courseId}/edit`);
    return { success: true, data: lesson };
  } catch (error: any) {
    console.error(`Error updating lesson ${lessonId}:`, error);
    return { success: false, error: error.message };
  }
}

export async function deleteLesson(courseId: string, moduleId: string, lessonId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao apagar aula" };
    }

    revalidatePath(`/courses/${courseId}/edit`);
    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting lesson ${lessonId}:`, error);
    return { success: false, error: error.message };
  }
}

export async function reorderLessons(courseId: string, moduleId: string, orderedIds: string[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${courseId}/modules/${moduleId}/lessons/reorder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderedIds }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao reordenar aulas" };
    }

    revalidatePath(`/courses/${courseId}/edit`);
    return { success: true };
  } catch (error: any) {
    console.error(`Error reordering lessons in module ${moduleId}:`, error);
    return { success: false, error: error.message };
  }
}
