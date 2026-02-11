"use server";

import { Enrollment } from "@/types/types";
import { revalidatePath } from "next/cache";

const URL =
  (process.env.API_ENROLLMENTS_URL as string) ||
  (process.env.NEXT_PUBLIC_API_ENROLLMENTS_URL as string);

export async function getEnrollments(): Promise<Enrollment[]> {
  try {
    const res = await fetch(URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch enrollments");
    return res.json();
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return [];
  }
}

export async function updateEnrollmentStatus(
  id: string,
  status: Enrollment["status"],
): Promise<Enrollment> {
  const res = await fetch(`${URL}/${id}`, {
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
