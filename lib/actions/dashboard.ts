"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getDashboardOverview(period: string = "30d") {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      cards: {
        instructors: { value: 0, trend: "0%" },
        students: { value: 0, trend: "0%" },
        courses: { value: 0, trend: "0%" },
        enrollments: { value: 0, trend: "0%" },
      },
      enrollmentsTrends: [],
      performanceTrends: [],
    };
  }

  try {
    const res = await fetch(`${API_URL}/admin/dashboard?period=${period}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    
    if (!res.ok) throw new Error("Failed to fetch dashboard metrics");
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard overview:", error);
    return {
      cards: {
        instructors: { value: 0, trend: "0%" },
        students: { value: 0, trend: "0%" },
        courses: { value: 0, trend: "0%" },
        enrollments: { value: 0, trend: "0%" },
      },
      enrollmentsTrends: [],
      performanceTrends: [],
    };
  }
}
