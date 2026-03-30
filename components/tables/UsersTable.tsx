"use client";

import { cn } from "@/lib/utils";
import { BadgeInfo, Mail, ShieldCheck, UsersIcon, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { UserFormDialog } from "@/components/users/UserFormDialog";
import { DeleteUserDialog } from "@/components/users/DeleteUserDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string | null;
  lastLogin: string | null;
};

interface UsersTableProps {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

function UsersTable({ users = [], total, page, limit }: UsersTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(total / limit);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-background rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-primary/5 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-slate-500 font-black">
                <th className="px-4 py-2">Usuário</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Último Acesso</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                    Nenhum utilizador encontrado.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-primary/3 transition-colors"
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="size-8 relative rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
                          {user.avatar ? (
                            <Image
                              fill
                              src={user.avatar}
                              alt={user.name}
                              className="size-full object-cover"
                              unoptimized
                            />
                          ) : (
                            <UsersIcon size={16} className="text-slate-400" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-xs">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium tracking-tight">
                        {user.role === "ADMIN" ? (
                          <ShieldCheck size={14} className="text-primary" />
                        ) : (
                          <UsersIcon size={14} className="text-slate-400" />
                        )}
                        {user.role}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                          user.status === "ACTIVE"
                            ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                            : user.status === "PENDING"
                            ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                            : "bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600/50"
                        )}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-slate-500 font-medium">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString("pt-PT") : "Nunca"}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1 text-slate-400 hover:text-primary transition-colors" title="Message">
                          <Mail size={14} />
                        </button>
                        <UserFormDialog
                          user={user}
                          trigger={
                            <button className="p-1 text-slate-400 hover:text-blue-500 transition-colors" title="Edit">
                              <Edit2 size={14} />
                            </button>
                          }
                        />
                        <DeleteUserDialog userId={user.id} userName={user.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {total === 0
              ? "Nenhum resultado"
              : `Mostrando ${from} a ${to} de ${total} utilizadores`}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                disabled={page <= 1 || isPending}
                onClick={() => handlePageChange(page - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    disabled={isPending}
                    onClick={() => handlePageChange(p)}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm transition-colors",
                      p === page
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "hover:bg-white dark:hover:bg-slate-800 text-slate-500"
                    )}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                disabled={page >= totalPages || isPending}
                onClick={() => handlePageChange(page + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
