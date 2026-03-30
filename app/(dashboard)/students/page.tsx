import StudentsClient from "@/components/students/StudentsPage";
import { getStudents } from "@/lib/actions/students";
import React from "react";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function StudentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const result = await getStudents(params);
  
  return (
    <StudentsClient
      students={result.data || []}
      total={result.total || 0}
      page={result.page || 1}
      limit={result.limit || 10}
    />
  );
}
