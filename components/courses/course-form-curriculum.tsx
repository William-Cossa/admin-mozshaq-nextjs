"use client";

import { useState } from "react";
import {
  Plus,
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Edit3,
  BookOpen,
  MoreVertical,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Module, Lesson } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface CourseFormCurriculumProps {
  modules: Module[];
  setModules: (modules: Module[]) => void;
}

export function CourseFormCurriculum({
  modules,
  setModules,
}: CourseFormCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >({});
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);
  const [editingDuration, setEditingDuration] = useState<string | null>(null);
  const [tempModuleTitle, setTempModuleTitle] = useState("");
  const [tempLessonTitle, setTempLessonTitle] = useState("");
  const [tempLessonDuration, setTempLessonDuration] = useState("");

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  const addModule = () => {
    const newModule: Module = {
      id: Math.random().toString(36).substr(2, 9),
      title: `Módulo ${modules.length + 1}: Novo Módulo`,
      order: modules.length,
      status: "draft",
      lessons: [],
    };
    setModules([...modules, newModule]);
    setExpandedModules((prev) => ({ ...prev, [newModule.id]: true }));
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setModules(
      modules.map((m) => (m.id === moduleId ? { ...m, ...updates } : m))
    );
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m.id !== moduleId));
  };

  const startEditingModule = (module: Module) => {
    setEditingModule(module.id);
    setTempModuleTitle(module.title);
  };

  const saveModuleTitle = (moduleId: string) => {
    if (tempModuleTitle.trim())
      updateModule(moduleId, { title: tempModuleTitle });
    setEditingModule(null);
  };

  const cancelEditingModule = () => {
    setEditingModule(null);
    setTempModuleTitle("");
  };

  const addLesson = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    const moduleIndex = modules.findIndex((m) => m.id === moduleId);
    const lessonNumber = (module?.lessons?.length || 0) + 1;

    const newLesson: Lesson = {
      id: Math.random().toString(36).substr(2, 9),
      title: `${moduleIndex + 1}.${lessonNumber} New Lesson`,
      content: "",
      order: module?.lessons?.length || 0,
      duration: "15min",
    };

    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: [...(m.lessons || []), newLesson] }
          : m
      )
    );
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    updates: Partial<Lesson>
  ) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: m.lessons?.map((l) =>
                l.id === lessonId ? { ...l, ...updates } : l
              ),
            }
          : m
      )
    );
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons?.filter((l) => l.id !== lessonId) }
          : m
      )
    );
  };

  const startEditingLesson = (lesson: Lesson) => {
    setEditingLesson(lesson.id);
    setTempLessonTitle(lesson.title);
  };

  const saveLessonTitle = (moduleId: string, lessonId: string) => {
    if (tempLessonTitle.trim())
      updateLesson(moduleId, lessonId, { title: tempLessonTitle });
    setEditingLesson(null);
  };

  const cancelEditingLesson = () => {
    setEditingLesson(null);
    setTempLessonTitle("");
  };

  const startEditingDuration = (lesson: Lesson) => {
    setEditingDuration(lesson.id);
    setTempLessonDuration(lesson.duration || "12:30");
  };

  const saveLessonDuration = (moduleId: string, lessonId: string) => {
    updateLesson(moduleId, lessonId, { duration: tempLessonDuration });
    setEditingDuration(null);
  };

  const getTotalLessons = (module: Module) => module.lessons?.length || 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest">Módulos</h3>
        <Button
          variant="link"
          size="sm"
          onClick={collapseAll}
          className="text-primary hover:underline h-auto p-0 text-sm font-semibold"
        >
          Esconder todos
        </Button>
      </div>

      {/* Module List */}
      <div className="space-y-3">
        {modules.length === 0 ? (
          <Card className="border-dashed">
            <div className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-10 w-10 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-500 mb-3">
                Nenhum módulo adicionado ainda. Comece adicionando um módulo
                para criar o currículo do curso.
              </p>
              <Button onClick={addModule} size="sm">
                <Plus className="h-4 w-4 mr-1.5" />
                Adicionar Módulo
              </Button>
            </div>
          </Card>
        ) : (
          modules.map((module, mIdx) => (
            <Card
              key={module.id}
              className={cn(
                "overflow-hidden transition-all",
                expandedModules[module.id]
                  ? "border-primary/50 shadow-md"
                  : "border-slate-200 dark:border-slate-800 shadow-sm"
              )}
            >
              {/* Module Header */}
              <div className="p-3 flex items-center gap-2.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-grab active:cursor-grabbing h-5 w-5 text-slate-300 hover:text-slate-400 shrink-0 p-0"
                >
                  <GripVertical className="h-4 w-4" />
                </Button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {editingModule === module.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={tempModuleTitle}
                          onChange={(e) => setTempModuleTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveModuleTitle(module.id);
                            if (e.key === "Escape") cancelEditingModule();
                          }}
                          className="h-7 text-base font-bold"
                          autoFocus
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => saveModuleTitle(module.id)}
                          className="h-6 w-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={cancelEditingModule}
                          className="h-6 w-6 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <h4
                        onClick={() => startEditingModule(module)}
                        className="font-bold text-base text-slate-900 dark:text-white truncate cursor-pointer hover:text-primary transition-colors"
                      >
                        {module.title}
                      </h4>
                    )}
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 h-5 cursor-pointer",
                        module.status === "published"
                          ? "bg-emerald-100 text-emerald-700 border-0 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-600 border-0 dark:bg-slate-800 dark:text-slate-400"
                      )}
                      onClick={() =>
                        updateModule(module.id, {
                          status:
                            module.status === "published"
                              ? "draft"
                              : "published",
                        })
                      }
                    >
                      {module.status === "published" ? "PUBLISHED" : "DRAFT"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <FileText className="h-3 w-3" />
                      <span>{getTotalLessons(module)} Lessons</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEditingModule(module)}
                    className="h-7 w-7 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteModule(module.id)}
                    className="h-7 w-7 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleModule(module.id)}
                    className={cn(
                      "h-7 w-7 rounded-lg",
                      expandedModules[module.id]
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {expandedModules[module.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Module Expanded Content */}
              {expandedModules[module.id] && (
                <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                  <div className="p-4 space-y-2">
                    {/* Lessons */}
                    {module.lessons?.map((lesson, lIdx) => (
                      <div
                        key={lesson.id}
                        className="group/lesson flex items-start gap-2.5 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-grab active:cursor-grabbing h-5 w-5 mt-0.5 text-slate-300 group-hover/lesson:text-slate-400 shrink-0 p-0"
                        >
                          <GripVertical className="h-3.5 w-3.5" />
                        </Button>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          {/* Title */}
                          {editingLesson === lesson.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={tempLessonTitle}
                                onChange={(e) =>
                                  setTempLessonTitle(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    saveLessonTitle(module.id, lesson.id);
                                  if (e.key === "Escape") cancelEditingLesson();
                                }}
                                className="h-7 text-sm font-semibold"
                                autoFocus
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  saveLessonTitle(module.id, lesson.id)
                                }
                                className="h-5 w-5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 shrink-0"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={cancelEditingLesson}
                                className="h-5 w-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <p
                              onClick={() => startEditingLesson(lesson)}
                              className="font-semibold text-sm text-slate-900 dark:text-white cursor-pointer hover:text-primary transition-colors"
                            >
                              {lesson.title}
                            </p>
                          )}

                          {/* Duration */}
                          {editingDuration === lesson.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={tempLessonDuration}
                                onChange={(e) =>
                                  setTempLessonDuration(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    saveLessonDuration(module.id, lesson.id);
                                  if (e.key === "Escape")
                                    setEditingDuration(null);
                                }}
                                className="h-6 text-xs font-medium"
                                placeholder="00:00"
                                autoFocus
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  saveLessonDuration(module.id, lesson.id)
                                }
                                className="h-5 w-5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 shrink-0"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingDuration(null)}
                                className="h-5 w-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <p
                              onClick={() => startEditingDuration(lesson)}
                              className="flex items-center gap-1 text-[11px] font-medium text-slate-500  tracking-wide cursor-pointer hover:text-primary"
                            >
                              <Clock className="h-3 w-3" />
                              Duração:
                              <span>{lesson.duration || "12m:30s"}</span>
                            </p>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteLesson(module.id, lesson.id)}
                          className="h-5 w-5 opacity-0 group-hover/lesson:opacity-100 text-slate-400 hover:text-destructive shrink-0 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}

                    {/* Add Lesson */}
                    <Button
                      variant="outline"
                      onClick={() => addLesson(module.id)}
                      className="w-full border-dashed border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-600 hover:border-slate-400 h-9 text-sm font-medium"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      Adicionar Aula
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Add Module Button */}
      {modules.length > 0 && (
        <Button
          onClick={addModule}
          variant="outline"
          className="w-full border-dashed border-primary/70 h-10 text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Módulo
        </Button>
      )}
    </div>
  );
}
