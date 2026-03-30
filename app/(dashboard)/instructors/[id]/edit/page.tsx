import { InstructorForm } from "@/components/instructors/InstructorForm";
import { getInstructorById } from "@/lib/actions/instructors";
import { notFound } from "next/navigation";
import React from "react";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditInstructorPage({ params }: EditPageProps) {
  const { id } = await params;
  const result = await getInstructorById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return <InstructorForm instructor={result.data} />;
}
