import StudentsClient from "@/components/students/StudentsPage";
import { getStudents } from "@/lib/actions/students";
import { filterStudents } from "@/lib/filters";
import React from "react";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function StudentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const result = await getStudents();
  const filteredStudents = filterStudents(result.data || [], params);
  
  return (
    <StudentsClient
      students={filteredStudents}
      total={filteredStudents.length}
    />
  );
}
