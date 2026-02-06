"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CourseFormBasic } from "./course-form-basic";
import { CourseFormCurriculum } from "./course-form-curriculum";
import { motion, AnimatePresence } from "framer-motion";
import { Course, Module } from "@/types/types";
import { courseSchema } from "@/lib/schemas/course-schema";

interface CourseEditorProps {
  initialData?: Partial<Course>;
  onSubmit: (data: Course) => Promise<void>;
}

export function CourseEditor({ initialData, onSubmit }: CourseEditorProps) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  function validateInline(partial: any) {
    const merged = { ...formData, ...partial };
    const parsed = courseSchema.safeParse(merged);

    if (!parsed.success) {
      const fieldErrors: any = {};
      parsed.error.issues.forEach((i) => {
        fieldErrors[i.path[0]] = i.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }

  function updateField(field: string, value: any) {
    const next = { ...formData, [field]: value };
    setFormData(next);
    validateInline({ [field]: value });
  }

  return (
    <Tabs
      defaultValue="basic"
      className="w-full max-w-7xl mx-auto flex flex-col gap-6"
    >
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
        <TabsTrigger value="curriculum">Conteúdo do Curso</TabsTrigger>
      </TabsList>

      {/* --- BASIC TAB --- */}
      <TabsContent value="basic">
        <AnimatePresence mode="wait">
          <motion.div
            key="tab-basic" // ← agora é único
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            <CourseFormBasic
              data={formData}
              errors={errors}
              updateField={updateField}
            />
          </motion.div>
        </AnimatePresence>
      </TabsContent>

      {/* --- CURRICULUM TAB --- */}
      <TabsContent value="curriculum">
        <AnimatePresence mode="wait">
          <motion.div
            key="tab-curriculum" // ← agora é único
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            <CourseFormCurriculum
              modules={formData.modules || []}
              setModules={(modules: Module[]) =>
                updateField("modules", modules)
              }
            />
          </motion.div>
        </AnimatePresence>
      </TabsContent>
    </Tabs>
  );
}
