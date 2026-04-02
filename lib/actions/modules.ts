"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function createModule(courseId: string, data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${courseId}/modules`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao criar módulo" };
    }

    const { module } = await res.json();
    revalidatePath(`/courses/${courseId}/edit`);
    return { success: true, data: module };
  } catch (error: any) {
    console.error("Error creating module:", error);
    return { success: false, error: error.message };
  }
}

export async function updateModule(courseId: string, moduleId: string, data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${courseId}/modules/${moduleId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao editar módulo" };
    }

    const { module } = await res.json();
    revalidatePath(`/courses/${courseId}/edit`);
    return { success: true, data: module };
  } catch (error: any) {
    console.error(`Error updating module ${moduleId}:`, error);
    return { success: false, error: error.message };
  }
}

export async function deleteModule(courseId: string, moduleId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${courseId}/modules/${moduleId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao apagar módulo" };
    }

    revalidatePath(`/courses/${courseId}/edit`);
    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting module ${moduleId}:`, error);
    return { success: false, error: error.message };
  }
}

export async function reorderModules(courseId: string, orderedIds: string[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/courses/${courseId}/modules/reorder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderedIds }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao reordenar módulos" };
    }

    revalidatePath(`/courses/${courseId}/edit`);
    return { success: true };
  } catch (error: any) {
    console.error(`Error reordering modules in course ${courseId}:`, error);
    return { success: false, error: error.message };
  }
}
