"use client";
import React, { useState } from "react";
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

function ArrayStringField({ label, placeholder, values = [], onChange }: { label: string, placeholder?: string, values: string[], onChange: (v: string[]) => void }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase text-muted-foreground">{label}</Label>
      <div className="flex gap-2">
        <Input 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
          placeholder={placeholder}
          className="h-10"
        />
        <Button type="button" onClick={handleAdd} variant="secondary" className="h-10 px-3">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {values.map((v, i) => (
            <Badge key={i} variant="secondary" className="gap-1 pr-1.5 py-1 text-xs font-normal">
              {v}
              <Button type="button" variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1 hover:bg-transparent" onClick={() => handleRemove(i)}>
                <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export function CourseFormBasic({
  data,
  errors,
  updateField,
  categories = [],
  instructors = [],
}: any) {
  const allInstructors = instructors;
  const selectedInstructors = data.instructorIds || [];

  const toggleInstructor = (id: string) => {
    let updated;
    if (selectedInstructors.includes(id)) {
      updated = selectedInstructors.filter((i: string) => i !== id);
    } else {
      updated = [...selectedInstructors, id];
    }
    updateField("instructorIds", updated);
  };

  const courseType = data.type || "ONLINE";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* COLUNA PRINCIPAL (2/3) */}
      <div className="lg:col-span-2 space-y-4">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle className="">Informações Básicas</CardTitle>
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
                  htmlFor="categoryId"
                  className="text-xs font-semibold uppercase text-muted-foreground"
                >
                  Categoria
                </Label>
                <Select
                  value={data.categoryId || ""}
                  onValueChange={(value) => updateField("categoryId", value)}
                >
                  <SelectTrigger className="h-10 w-full rounded-lg">
                    <SelectValue placeholder="Selecione uma categoria..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-xs text-muted-foreground text-center">
                        Nenhuma categoria encontrada
                      </div>
                    )}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-destructive text-xs font-medium"
                  >
                    {errors.categoryId}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="duration"
                  className="text-xs font-semibold uppercase text-muted-foreground"
                >
                  Duração
                </Label>
                <Input
                  id="duration"
                  value={data.duration || ""}
                  onChange={(e) => updateField("duration", e.target.value)}
                  className="h-10"
                  placeholder="Ex: 40h ou 12 semanas"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-xs font-semibold uppercase text-muted-foreground"
              >
                Descrição Curta
              </Label>
              <Textarea
                id="description"
                value={data.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                placeholder="Descreva o curso brevemente..."
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

        {/* Preços */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-sm uppercase tracking-wider">Preços e Investimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-xs font-semibold uppercase text-muted-foreground"
                >
                  Preço Base (MT)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={data.price || ""}
                  onChange={(e) => updateField("price", e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="h-10"
                />
                {errors.price && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-destructive text-xs font-medium"
                  >
                    {errors.price}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="discountPrice"
                  className="text-xs font-semibold uppercase text-muted-foreground"
                >
                  Preço com Desconto (MT)
                </Label>
                <Input
                  id="discountPrice"
                  type="number"
                  value={data.discountPrice || ""}
                  onChange={(e) => updateField("discountPrice", e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="h-10"
                />
                {errors.discountPrice && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-destructive text-xs font-medium"
                  >
                    {errors.discountPrice}
                  </motion.p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Corpo Docente */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-primary" />
              <CardTitle className="text-base text-sm uppercase tracking-wider">Corpo Docente</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedInstructors.map((id: string) => {
                  const instructor = allInstructors.find((i: any) => i.id === id);
                  return (
                    <Badge
                      key={id}
                      variant="secondary"
                      className="gap-2 pl-1.5 pr-2 py-1.5 h-auto rounded-lg"
                    >
                      {instructor?.photo ? (
                        <img
                          src={instructor.photo}
                          className="size-5 rounded-full object-cover"
                          alt="Formador"
                        />
                      ) : (
                        <div className="size-5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold">
                          {instructor?.name?.charAt(0) || id.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs font-semibold">
                        {instructor?.name || `Formador #${id}`}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => toggleInstructor(id)}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </Badge>
                  );
                })}
              </div>

              <div className="border rounded-lg p-4 bg-slate-50/50 dark:bg-slate-800/50">
                <Label className="text-[10px] font-bold uppercase tracking-wider mb-3 block text-muted-foreground">
                  Adicionar Formadores
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                  {allInstructors.map((inst: any) => (
                    <button
                      key={inst.id}
                      type="button"
                      onClick={() => toggleInstructor(inst.id)}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-lg border text-left transition-all",
                        selectedInstructors.includes(inst.id)
                          ? "bg-primary/10 border-primary"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary/50"
                      )}
                    >
                      {inst.photo ? (
                        <img src={inst.photo} className="size-6 rounded-full object-cover" />
                      ) : (
                        <div className="size-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                          {inst.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold truncate">{inst.name}</span>
                        <span className="text-[10px] text-muted-foreground truncate">{inst.specialization}</span>
                      </div>
                    </button>
                  ))}
                </div>
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

        {/* Informações Adicionais */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <CardTitle className="text-base text-sm uppercase tracking-wider">Informações Adicionais</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ArrayStringField 
              label="Requisitos" 
              placeholder="Ex: Conhecimentos básicos de informática" 
              values={data.requirements || []} 
              onChange={(v) => updateField("requirements", v)} 
            />
            <ArrayStringField 
              label="Objetivos" 
              placeholder="Ex: Compreender os fundamentos da cibersegurança" 
              values={data.objectives || []} 
              onChange={(v) => updateField("objectives", v)} 
            />
            <ArrayStringField 
              label="Público-Alvo" 
              placeholder="Ex: Iniciantes em TI" 
              values={data.targetAudience || []} 
              onChange={(v) => updateField("targetAudience", v)} 
            />
            <ArrayStringField 
              label="Habilidades (Skills)" 
              placeholder="Ex: Segurança de redes" 
              values={data.skills || []} 
              onChange={(v) => updateField("skills", v)} 
            />
          </CardContent>
        </Card>
      </div>

      {/* COLUNA LATERAL (1/3) */}
      <div className="space-y-6">
        {/* Modalidade */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle className="text-base text-sm uppercase tracking-wider">Modalidade</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {(["ONLINE", "PRESENCIAL", "HIBRIDO"] as const).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={courseType === type ? "default" : "outline"}
                  onClick={() => updateField("type", type)}
                  className={cn(
                    "flex items-center justify-start h-auto py-2.5 px-4 gap-3 rounded-lg",
                    courseType === type &&
                    "bg-primary/10 text-primary border-primary hover:bg-primary/20 hover:text-primary"
                  )}
                >
                  {type === "ONLINE" && <Globe className="h-4 w-4" />}
                  {type === "PRESENCIAL" && <MapPin className="h-4 w-4" />}
                  {type === "HIBRIDO" && <Layers className="h-4 w-4" />}
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {type}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Publicação */}
        <Card>
          <CardHeader className="pb-4">
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
                <SelectTrigger id="status" className="h-10 w-full rounded-lg">
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
                <SelectTrigger id="level" className="h-10 w-full rounded-lg">
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

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 block">
            Imagem de Capa (URL)
          </Label>
          <div className="space-y-3">
            <Input
              value={data.thumbnail || ""}
              onChange={(e) => updateField("thumbnail", e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="h-10 rounded-lg"
            />
            <div className="aspect-video w-full rounded-lg bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 overflow-hidden group relative">
              {data.thumbnail ? (
                <img src={data.thumbnail} className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImageIcon className="text-slate-300" size={32} />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">
                    Cole uma URL ou use uma imagem padrão
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Nota de Gestão */}
        <Alert className="bg-slate-900 border-slate-800 text-white rounded-lg">
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
