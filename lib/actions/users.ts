"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    console.warn("No token found for fetching users.");
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("Failed to fetch users, status:", res.status);
      return [];
    }
    const data = await res.json();
    return data.users || [];
  } catch (error) {
    console.error("Error fetching users from backend:", error);
    return [];
  }
}
