"use server";

import { Enrollment } from "@/types/types";
import { revalidatePath } from "next/cache";

const API_URL = "https://mozshaqadmin.vercel.app/enrollments";

export async function getEnrollments(): Promise<Enrollment[]> {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch enrollments");
    return res.json();
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return [];
  }
}

export async function updateEnrollmentStatus(
  id: string,
  status: Enrollment["status"]
): Promise<Enrollment> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update enrollment status");
  }

  revalidatePath("/enrollments");
  return res.json();
}
