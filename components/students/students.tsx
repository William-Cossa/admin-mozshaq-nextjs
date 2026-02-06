"use client";

import { useState } from "react";
import { Search, Filter, Download, Plus } from "lucide-react";
import { DataTable } from "../datatable/data-table";
import { columns } from "../columns/students-columns";
import { mockStudents } from "@/students-data";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Students
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage student enrollments, status, and academic records.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-1.5 text-sm font-bold text-white shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95">
          <Plus size={16} />
          <span>Add Student</span>
        </button>
      </div>

      {/* Filters Row */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-2 items-center justify-between">
        <div className="w-full lg:w-96 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name, email, or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select className="rounded-xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary">
            <option>All Courses</option>
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

      {/* Students Table */}
      <div className="flex-1 overflow-hidden">
        <DataTable columns={columns} data={mockStudents} />
      </div>
    </div>
  );
}
