"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Por favor, preencha todos os campos." };
  }

  try {
    const res = await fetch(`${API_URL}/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { error: data.message || "Credenciais inválidas." };
    }

    // Guardar o token no cookie do Next.js
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60, // 15 minutos (corresponde à expiração da API)
    });

  } catch (error) {
    console.error("Login Server Action Error:", error);
    return { error: "Erro ao conectar com o servidor. Tente mais tarde." };
  }

  // Redirecionamento após o try-catch para evitar conflitos de Next.js
  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  redirect("/login");
}
