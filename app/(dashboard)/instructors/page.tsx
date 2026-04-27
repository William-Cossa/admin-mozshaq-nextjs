import InstructorsClient from "@/components/instructors/InstructorsPage";
import { getInstructors } from "@/lib/actions/instructors";
import { filterInstructors } from "@/lib/filters";
import React from "react";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function InstructorsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const result = await getInstructors();
  const filteredInstructors = filterInstructors(result.data || [], params);

  return (
    <InstructorsClient
      instructors={filteredInstructors}
      total={filteredInstructors.length}
    />
  );
}
