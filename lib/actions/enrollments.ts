"use server";

import { Enrollment } from "@/types/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:3001/api").replace(/\/$/, "");
const API_URL = BASE_URL;

export async function getEnrollments(): Promise<Enrollment[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/admin/enrollments`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "force-cache",
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch enrollments");

    const responseData = await res.json();
    const data = responseData.data || [];

    return data.map((item: any) => ({
      id: item.id,
      studentId: item.studentId,
      studentName: item.student?.name || "Desconhecido",
      studentAvatar: item.student?.avatar || undefined,
      courseId: item.courseId,
      courseName: item.course?.title || "Desconhecido",
      date: new Date(item.createdAt || Date.now()).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      progress: 0,
      status: item.status?.toLowerCase() || "pending",
      contact: item.contact,
    }));
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return [];
  }
}

export async function updateEnrollmentStatus(
  id: string,
  status: string,
): Promise<Enrollment> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Não autenticado");

  const res = await fetch(`${API_URL}/admin/enrollments/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: status.toUpperCase() }),
  });

  if (!res.ok) {
    throw new Error("Failed to update enrollment status");
  }

  revalidatePath("/enrollments");
  const data = await res.json();
  return data.enrollment || data;
}

export async function getEnrollmentMetrics() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { active: 0, pending: 0, completedMonth: 0, droppedMonth: 0 };
  }

  try {
    const res = await fetch(`${API_URL}/admin/enrollments/metrics`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "force-cache",
    });
    if (!res.ok) return { active: 0, pending: 0, completedMonth: 0, droppedMonth: 0 };
    return await res.json();
  } catch (error) {
    console.error("Error fetching enrollment metrics:", error);
    return { active: 0, pending: 0, completedMonth: 0, droppedMonth: 0 };
  }
}

export async function createEnrollment(data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/enrollments`, {
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

    revalidatePath("/enrollments");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating enrollment:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteEnrollment(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  try {
    const res = await fetch(`${API_URL}/admin/enrollments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Erro ao apagar inscrição" };
    }

    revalidatePath("/enrollments");
    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting enrollment ${id}:`, error);
    return { success: false, error: error.message };
  }
}
