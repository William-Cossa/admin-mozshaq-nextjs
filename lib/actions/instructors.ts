"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getInstructors(params?: Record<string, string>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { data: [], total: 0, page: 1, limit: 10 };

  const query = params ? "?" + new URLSearchParams(params).toString() : "";

  try {
    const res = await fetch(`${API_URL}/admin/instructors${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`getInstructors failed: ${res.status} ${res.statusText}`);
      return { data: [], total: 0, page: 1, limit: 10 };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return { data: [], total: 0, page: 1, limit: 10 };
  }
}

export async function getInstructorById(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/instructors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return { success: false, error: "Formador não encontrado" };
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createInstructor(data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/instructors`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao criar formador" };
    }

    revalidatePath("/instructors");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateInstructor(id: string, data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/instructors/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao actualizar formador" };
    }

    revalidatePath("/instructors");
    revalidatePath(`/instructors/${id}/edit`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteInstructor(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/instructors/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao apagar formador" };
    }

    revalidatePath("/instructors");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
