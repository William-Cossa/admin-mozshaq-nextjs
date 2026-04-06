"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CourseFormBasic } from "./course-form-basic";
import { CourseFormCurriculum } from "./course-form-curriculum";
import { motion, AnimatePresence } from "framer-motion";
import { Course, Module } from "@/types/types";
import { courseSchema } from "@/lib/schemas/course-schema";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface CourseEditorProps {
  initialData?: Partial<Course>;
  onSubmit: (data: Course) => Promise<void>;
  categories: any[];
  instructors: any[];
}

export function CourseEditor({
  initialData,
  onSubmit,
  categories,
  instructors,
}: CourseEditorProps) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    const parsed = courseSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: any = {};
      parsed.error.issues.forEach((i) => {
        fieldErrors[i.path[0]] = i.message;
      });
      setErrors(fieldErrors);
      const firstError = parsed.error.issues[0];
      toast.error(`Verifique os erros: ${firstError.message} (${firstError.path.join(".")})`);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData as Course);
      toast.success("Curso salvo com sucesso!");
    } catch (error: any) {
      // Don't show error toast if it's a redirect error (though it shouldn't reach here if handled correctly)
      if (error.message !== "NEXT_REDIRECT") {
        toast.error(error.message || "Erro ao salvar o curso.");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Salvar Curso
        </Button>
      </div>

      <Tabs
        defaultValue="basic"
        className="w-full flex flex-col gap-6"
      >
        <TabsList className="grid grid-cols-2 w-full gap-4">
          <TabsTrigger className="h-10" value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger className="h-10" value="curriculum">Programa</TabsTrigger>
        </TabsList>

        {/* --- BASIC TAB --- */}
        <TabsContent value="basic">
          <AnimatePresence mode="wait">
            <motion.div
              key="tab-basic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
            >
              <CourseFormBasic
                data={formData}
                errors={errors}
                updateField={updateField}
                categories={categories}
                instructors={instructors}
              />
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* --- CURRICULUM TAB --- */}
        <TabsContent value="curriculum">
          <AnimatePresence mode="wait">
            <motion.div
              key="tab-curriculum"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
            >
              {formData.id ? (
                <CourseFormCurriculum
                  courseId={formData.id}
                  modules={formData.modules || []}
                  setModules={(modules: Module[]) =>
                    updateField("modules", modules)
                  }
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Save className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Salve o curso primeiro</h3>
                  <p className="text-slate-500 max-w-sm">
                    Para adicionar os módulos e estruturar o currículo, é necessário primeiro guardar as informações básicas do curso.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
