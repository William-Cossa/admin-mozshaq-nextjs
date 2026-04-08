"use server";

import { Payment } from "@/types/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:3001/api").replace(/\/$/, "");
const API_URL = BASE_URL;

export async function getPayments(): Promise<Payment[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/admin/payments`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch payments");
    
    const responseData = await res.json();
    const data = responseData.data || [];
    
    return data.map((item: any) => ({
      id: item.id,
      studentName: item.student?.name || item.studentName || "Desconhecido",
      courseName: item.course?.title || item.courseName || "Desconhecido",
      amount: item.amount,
      paymentProof: item.paymentProof,
      status: item.status?.toLowerCase() || "pending",
      rejectionReason: item.rejectionReason,
      createdAt: item.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
}

export async function approvePayment(id: string): Promise<Payment> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Não autenticado");

  const res = await fetch(`${API_URL}/admin/payments/${id}/review`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ status: "APPROVED" }),
  });

  if (!res.ok) throw new Error("Failed to approve payment");

  revalidatePath("/payments");
  const data = await res.json();
  return data.payment || data;
}

export async function rejectPayment(
  id: string,
  rejectionReason: string,
): Promise<Payment> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Não autenticado");

  const res = await fetch(`${API_URL}/admin/payments/${id}/review`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ status: "REJECTED", rejectionReason }),
  });

  if (!res.ok) throw new Error("Failed to reject payment");

  revalidatePath("/payments");
  const data = await res.json();
  return data.payment || data;
}
