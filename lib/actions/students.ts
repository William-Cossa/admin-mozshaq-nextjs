"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getStudents(params?: Record<string, string>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    console.warn("No token found for fetching students.");
    return { data: [], total: 0, page: 1, limit: 10 };
  }

  const query = params ? "?" + new URLSearchParams(params).toString() : "";

  try {
    const res = await fetch(`${API_URL}/admin/students${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn("Failed to fetch students, status:", res.status);
      return { data: [], total: 0, page: 1, limit: 10 };
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching students from backend:", error);
    return { data: [], total: 0, page: 1, limit: 10 };
  }
}

export async function createStudent(data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "No token" };

  try {
    const res = await fetch(`${API_URL}/admin/students`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao criar estudante" };
    }

    const responseData = await res.json().catch(() => ({}));
    revalidatePath("/students");
    return { success: true, student: responseData.student || responseData };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateStudent(id: string, data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "No token" };

  try {
    const res = await fetch(`${API_URL}/admin/students/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao actualizar estudante" };
    }

    revalidatePath("/students");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteStudent(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "No token" };

  try {
    const res = await fetch(`${API_URL}/admin/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao apagar estudante" };
    }

    revalidatePath("/students");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
