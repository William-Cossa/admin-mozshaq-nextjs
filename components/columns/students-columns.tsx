"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Student } from "@/types/types";
import Image from "next/image";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Student Name",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <div className="flex items-center gap-2">
          <div className="size-8 relative rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            {student.avatar ? (
              <Image
                fill
                src={student.avatar}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                {student.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              {student.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {student.email}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: "Student ID",
    cell: ({ getValue }) => (
      <span className="text-slate-500 font-mono text-xs">
        {getValue() as string}
      </span>
    ),
  },

  {
    accessorKey: "course",
    header: "Enrolled Course",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-primary" />
        <span>{getValue() as string}</span>
      </div>
    ),
  },

  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ getValue }) => (
      <span className="text-slate-500">{getValue() as string}</span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border",
            status === "active"
              ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
              : status === "pending"
              ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
              : "bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600/50"
          )}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: () => <p className="text-right pr-2">Actions</p>,
    cell: () => (
      <div className="text-right pr-2">
        <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <MoreVertical size={16} />
        </button>
      </div>
    ),
  },
];
