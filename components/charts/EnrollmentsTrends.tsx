"use client";
import { MoreHorizontal } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "../ui/chart";
import { enrollmentsTrendsData, performanceData } from "@/data";

function EnrollmentsTrends() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
      <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Enrollment Trends
          </h3>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={enrollmentsTrendsData}>
              <defs>
                <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2b2bee" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2b2bee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis hide />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="enrollments"
                stroke="#2b2bee"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorEnroll)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-background rounded-2xl border  shadow-sm p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Performance
          </h3>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "bold" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Average Grade</span>
              <span className="font-black text-slate-900 dark:text-white text-lg">
                B+ (84%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentsTrends;
