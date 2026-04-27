"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getUsers(params?: Record<string, string>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    console.warn("No token found for fetching users.");
    return { users: [], total: 0 };
  }

  try {
    const res = await fetch(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.warn("Failed to fetch users, status:", res.status);
      return { users: [], total: 0 };
    }
    const data = await res.json();
    return {
      users: data.users || [],
      total: data.total || 0,
    };
  } catch (error) {
    console.error("Error fetching users from backend:", error);
    return { users: [], total: 0 };
  }
}

export async function createUser(data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "No token" };

  try {
    const res = await fetch(`${API_URL}/admin/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.error || "Failed to create user" };
    }

    revalidatePath("/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateUser(id: string, data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "No token" };

  try {
    const res = await fetch(`${API_URL}/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.error || "Failed to update user" };
    }

    revalidatePath("/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteUser(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "No token" };

  try {
    const res = await fetch(`${API_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.error || "Failed to delete user" };
    }

    revalidatePath("/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
