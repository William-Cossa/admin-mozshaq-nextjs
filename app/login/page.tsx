// app/login/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./login-form";
import logo from "@/public/images/mozshaq-logo.png";

export const metadata: Metadata = {
  title: "Login | Portal Admin MozShaq",
  description: "Acesso seguro ao painel administrativo",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex w-full bg-white dark:bg-slate-950">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
        <div className="w-full max-w-md space-y-10">
          {/* Header with Logo */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Image
                src={logo}
                alt="MozShaq Logo"
                width={300}
                height={110}
                className="h-auto w-auto object-contain"
                priority
              />
            </div>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12">
            © {new Date().getFullYear()} MozShaq. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Right side - Image/Graphic */}
      <div
        className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 mix-blend-multiply" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white w-full h-full bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent">
          <h2 className="text-4xl font-bold mb-4">Consultoria & Serviços</h2>
          <p className="text-lg text-slate-200 max-w-lg">
            Soluções integradas e gestão profissional para otimizar os processos do seu negócio com excelência e segurança.
          </p>
        </div>
      </div>
    </div>
  );
}