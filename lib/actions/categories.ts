"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getCategories() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/admin/categories`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
