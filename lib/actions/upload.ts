"use server";

import { cookies } from "next/headers";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:3001/api").replace(/\/$/, "");
const API_URL = BASE_URL;

/**
 * Faz upload de uma imagem para o Cloudinary via backend.
 * Recebe um FormData com o campo "image" (File).
 * Opcionalmente aceita "folder" para organizar no Cloudinary.
 */
export async function uploadImage(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, error: "Não autenticado" };

  const targetUrl = `${API_URL}/admin/upload`;
  console.log(`[UploadAction] Fetching to: ${targetUrl}`);

  try {
    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Não definir Content-Type — o fetch define automaticamente com boundary
      },
      body: formData,
    });

    if (!res.ok) {
      console.warn(`[UploadAction] Error ${res.status}: ${res.statusText}`);
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.message || `Erro ${res.status} ao fazer upload` };
    }

    const data = await res.json();
    return { success: true, url: data.url };
  } catch (error: any) {
    console.error(`[UploadAction] Network error at ${targetUrl}:`, error);
    return { success: false, error: error.message };
  }
}
