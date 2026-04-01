import InstructorsClient from "@/components/instructors/InstructorsPage";
import { getInstructors } from "@/lib/actions/instructors";
import React from "react";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function InstructorsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const result = await getInstructors(params);

  return (
    <InstructorsClient
      instructors={result.data || []}
      total={result.total || 0}
      page={result.page || 1}
      limit={result.limit || 10}
    />
  );
}
