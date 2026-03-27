// app/login/page.tsx
import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login | Portal Admin MozShaq",
  description: "Acesso seguro ao painel administrativo",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <div className="w-full max-w-md">
        {/* Card principal */}
        <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          {/* Decoração de fundo sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent dark:from-primary/10 pointer-events-none" />

          {/* Cabeçalho */}
          <div className="relative p-8 text-center border-b border-slate-100 dark:border-slate-800">
            <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-primary text-white mb-5 shadow-lg shadow-primary/30 ring-4 ring-primary/10">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Portal Admin
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Gerencie sua plataforma com segurança
            </p>
          </div>

          <LoginForm />
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-8">
          © {new Date().getFullYear()} MozShaq. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}