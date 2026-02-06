"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Student } from "@/types/types";
import Heading from "../Heading";
import { Button } from "../ui/button";
import Image from "next/image";

const mockStudents: Student[] = [
  {
    id: "STU-001",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    course: "Computer Science 101",
    joinDate: "Oct 24, 2023",
    status: "active",
    progress: 75,
    avatar: "https://picsum.photos/id/1/100/100",
  },
  {
    id: "STU-002",
    name: "Maria Rodriguez",
    email: "maria.r@example.com",
    course: "Advanced Mathematics",
    joinDate: "Oct 22, 2023",
    status: "pending",
    progress: 0,
  },
  {
    id: "STU-003",
    name: "Sarah Smith",
    email: "sarah.s@example.com",
    course: "Creative Writing",
    joinDate: "Oct 20, 2023",
    status: "active",
    progress: 45,
    avatar: "https://picsum.photos/id/2/100/100",
  },
  {
    id: "STU-004",
    name: "James Wilson",
    email: "j.wilson@example.com",
    course: "Physics 101",
    joinDate: "Oct 18, 2023",
    status: "inactive",
    progress: 10,
  },
  {
    id: "STU-005",
    name: "Elena Larson",
    email: "emily.l@example.com",
    course: "UI/UX Design",
    joinDate: "Oct 15, 2023",
    status: "active",
    progress: 92,
    avatar: "https://picsum.photos/id/3/100/100",
  },
];

const StudentsClient: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-3 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Heading
          title="Estudantes"
          text="Gerencie os roles e status de todos os estudantes da plataforma."
        />
        <Button className="inline-flex items-center justify-center gap-2 text-sm font-bold  shadow-xl shadow-primary/20 transition-all active:scale-95 cursor-pointer">
          <Plus size={16} />
          Adicionar Estudante
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-2 items-center justify-between">
        <div className="w-full lg:w-96 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Procurar pelo nome,email ou pelo curso"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select className="rounded-xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary">
            <option>Todos cursos</option>
          </select>
          <select className="rounded-xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary">
            <option>All Statuses</option>
          </select>
          <button className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-500 hover:text-primary transition-colors">
            <Filter size={16} />
          </button>
          <button className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-500 hover:text-primary transition-colors">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-4 py-1.5 font-bold text-slate-900 dark:text-white">
                  Student Name
                </th>
                <th className="px-4 py-1.5 font-bold text-slate-900 dark:text-white">
                  Student ID
                </th>
                <th className="px-4 py-1.5 font-bold text-slate-900 dark:text-white">
                  Enrolled Course
                </th>
                <th className="px-4 py-1.5 font-bold text-slate-900 dark:text-white">
                  Join Date
                </th>
                <th className="px-4 py-1.5 font-bold text-slate-900 dark:text-white">
                  Status
                </th>
                <th className="px-4 py-1.5 font-bold text-slate-900 dark:text-white text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="px-4 py-1.5">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                        {student.avatar ? (
                          <Image
                            width={200}
                            height={200}
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
                  </td>
                  <td className="px-4 py-1.5 text-slate-500 font-mono text-xs">
                    {student.id}
                  </td>
                  <td className="px-4 py-1.5 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-primary" />
                      {student.course}
                    </div>
                  </td>
                  <td className="px-4 py-1.5 text-slate-500">
                    {student.joinDate}
                  </td>
                  <td className="px-4 py-1.5">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border",
                        student.status === "active"
                          ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                          : student.status === "pending"
                          ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                          : "bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600/50"
                      )}
                    >
                      {student.status.charAt(0).toUpperCase() +
                        student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-1.5 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-auto p-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing 1 to 5 of 97 results
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-bold">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-bold">
                3
              </button>
            </div>
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export default StudentsClient;
