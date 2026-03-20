"use server";

import { mockPayments } from "@/data";
import { Payment } from "@/types/types";
import { revalidatePath } from "next/cache";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  `http://localhost:${process.env.PORT || 3003}`;

const URL = `${BASE_URL}/api/payments`;

export async function getPayments(): Promise<Payment[]> {
  try {
    const res = await fetch(URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch payments");

    if (res.ok) return res.json();
    else return mockPayments as Payment[];
  } catch (error) {
    console.error("Error fetching payments:", error);
    return mockPayments as Payment[];
  }
}

export async function approvePayment(id: string): Promise<Payment> {
  const res = await fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "approved" }),
  });

  if (!res.ok) throw new Error("Failed to approve payment");

  revalidatePath("/payments");
  return res.json();
}

export async function rejectPayment(
  id: string,
  rejectionReason: string,
): Promise<Payment> {
  const res = await fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "rejected", rejectionReason }),
  });

  if (!res.ok) throw new Error("Failed to reject payment");

  revalidatePath("/payments");
  return res.json();
}
