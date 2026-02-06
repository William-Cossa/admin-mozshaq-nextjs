"use client";
import { motion } from "framer-motion";
import {
  Info,
  Globe,
  MapPin,
  Layers,
  UserRound,
  X,
  Plus,
  AlertCircle,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function CourseFormBasic({ data, errors, updateField }: any) {
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>(
    data.instructorIds || ["1"]
  );

  const removeInstructor = (idToRemove: string) => {
    const updated = selectedInstructors.filter((id) => id !== idToRemove);
    setSelectedInstructors(updated);
    updateField("instructorIds", updated);
  };

  const courseType = data.type || "ONLINE";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* COLUNA PRINCIPAL (2/3) */}
      <div className="lg:col-span-2 space-y-4">
        {/* Informações Básicas */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Informações Básicas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-xs font-semibold uppercase text-muted-foreground"
              >
                Título do Curso
              </Label>
              <Input
                id="title"
                value={data.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                className={cn(
                  "h-10",
                  errors.title &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                placeholder="Ex: Formação Full Stack Senior"
              />
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-destructive text-xs font-medium"
                >
                  {errors.title}
                </motion.p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="slug"
                  className="text-xs font-semibold uppercase text-muted-foreground"
                >
                  Slug (URL)
                </Label>
                <Input
                  id="slug"
                  value={data.slug || ""}
                  onChange={(e) => updateField("slug", e.target.value)}
                  className="h-10"
                  placeholder="formacao-full-stack"
                />
                {errors.slug && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-destructive text-xs font-medium"
                  >
                    {errors.slug}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-xs font-semibold uppercase text-muted-foreground"
                >
                  Categoria
                </Label>
                <Select
                  value={data.category || ""}
                  onValueChange={(value) => updateField("category", value)}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Desenvolvimento</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="negocios">Negócios</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-destructive text-xs font-medium"
                  >
                    {errors.category}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-xs font-semibold uppercase text-muted-foreground"
              >
                Descrição
              </Label>
              <Textarea
                id="description"
                value={data.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                placeholder="Descreva o curso..."
              />
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-destructive text-xs font-medium"
                >
                  {errors.description}
                </motion.p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Corpo Docente */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Corpo Docente</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {selectedInstructors.map((id) => (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="gap-2 pl-1.5 pr-2 py-1.5 h-auto rounded-lg"
                  >
                    <img
                      src={`https://i.pravatar.cc/150?u=${id}`}
                      className="size-5 rounded-full"
                      alt="Formador"
                    />
                    <span className="text-xs font-semibold">
                      Formador #{id}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeInstructor(id)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </Badge>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-auto py-1.5 border-dashed border-primary text-xs font-semibold"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Adicionar Formador
                </Button>
              </div>
              {errors.instructorIds && (
                <motion.p
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-destructive text-xs font-medium"
                >
                  {errors.instructorIds}
                </motion.p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modalidade */}
        <Card>
          <CardHeader className="">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Modalidade</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {(["ONLINE", "PRESENCIAL", "HIBRIDO"] as const).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={courseType === type ? "default" : "outline"}
                  onClick={() => updateField("type", type)}
                  className={cn(
                    "flex flex-col h-auto py-3 gap-1.5",
                    courseType === type &&
                      "bg-primary/10 text-primary border-primary hover:bg-primary/20 hover:text-primary"
                  )}
                >
                  {type === "ONLINE" && <Globe className="h-5 w-5" />}
                  {type === "PRESENCIAL" && <MapPin className="h-5 w-5" />}
                  {type === "HIBRIDO" && <Layers className="h-5 w-5" />}
                  <span className="text-[10px] font-bold uppercase">
                    {type}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* COLUNA LATERAL (1/3) */}
      <div className="space-y-6">
        {/* Publicação */}
        <Card>
          <CardHeader className="">
            <CardTitle className="text-sm uppercase tracking-wider">
              Publicação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-[10px] font-bold uppercase text-muted-foreground"
              >
                Estado
              </Label>
              <Select
                value={data.status || "RASCUNHO"}
                onValueChange={(value) => updateField("status", value)}
              >
                <SelectTrigger id="status" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RASCUNHO">Rascunho</SelectItem>
                  <SelectItem value="PUBLICADO">Publicado</SelectItem>
                  <SelectItem value="ENCERRADO">Encerrado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="level"
                className="text-[10px] font-bold uppercase text-muted-foreground"
              >
                Nível
              </Label>
              <Select
                value={data.level || "INICIANTE"}
                onValueChange={(value) => updateField("level", value)}
              >
                <SelectTrigger id="level" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INICIANTE">Iniciante</SelectItem>
                  <SelectItem value="INTERMEDIARIO">Intermediário</SelectItem>
                  <SelectItem value="AVANCADO">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 block">
            Imagem de Capa
          </label>
          <div className="aspect-video w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 overflow-hidden group relative">
            {data?.image ? (
              <>
                <img src={data.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="p-2 bg-white rounded-lg text-red-500 shadow-xl font-bold text-xs uppercase">
                    Alterar Imagem
                  </button>
                </div>
              </>
            ) : (
              <>
                <ImageIcon className="text-gray-300" size={32} />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Carregar Imagem
                </p>
              </>
            )}
          </div>
        </div>

        {/* Nota de Gestão */}
        <Alert className="bg-slate-900 border-slate-800 text-white">
          <AlertCircle className="h-4 w-4 text-white" />
          <AlertDescription className="text-xs leading-relaxed opacity-90 mt-2">
            <strong className="block font-semibold mb-1">Nota de Gestão</strong>
            Certifique-se de que os formadores vinculados têm as especializações
            necessárias para o conteúdo programático deste curso.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
