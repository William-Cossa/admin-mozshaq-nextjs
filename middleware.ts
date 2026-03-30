import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  // Redirecionar a raiz "/" para "/login" (a página inicial não existe)
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se já estiver autenticado e acessar /login, redirecionar para o dashboard
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p)) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Proteger todas as rotas privadas (não públicas)
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  if (!isPublic && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Aplicar o middleware a todas as rotas, exceto assets estáticos e APIs internas
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
