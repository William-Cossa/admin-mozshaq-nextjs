// app/login/login-form.tsx
"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader2 } from "lucide-react";

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, null);

    return (
        <form action={formAction} className="p-8 space-y-6">
            {/* Mensagem de erro */}
            {state?.error && (
                <div className="p-3 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-xl animate-in slide-in-from-top-1 fade-in duration-200">
                    {state.error}
                </div>
            )}

            <div className="space-y-5">
                {/* Campo Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">
                        Email
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="admin@mozshaq.com"
                            required
                            className="pl-10 rounded-xl border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                </div>

                {/* Campo Senha */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">
                            Palavra-passe
                        </Label>
                        <button
                            type="button"
                            className="text-xs text-primary hover:underline focus:outline-none"
                            onClick={() => {/* lógica para recuperar senha */ }}
                        >
                            Esqueceu a senha?
                        </button>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="pl-10 rounded-xl border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
            </div>

            {/* Botão de ação */}
            <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl py-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <Loader2 className="animate-spin size-5 mr-2" />
                ) : (
                    "Iniciar Sessão"
                )}
            </Button>
        </form>
    );
}