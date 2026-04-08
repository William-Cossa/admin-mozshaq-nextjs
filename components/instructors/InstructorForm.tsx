"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft, Save, Info, UserRound, Mail as MailIcon, Phone as PhoneIcon, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { createInstructor, updateInstructor } from "@/lib/actions/instructors";
import { uploadImage } from "@/lib/actions/upload";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Heading from "../Heading";
import Image from "next/image";

const instructorSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  specialization: z.string().min(2, "Especialização é obrigatória"),
  yearsExperience: z.coerce.number().int().min(0, "Anos de experiência inválidos"),
  bio: z.string().min(10, "Bio deve ter pelo menos 10 caracteres"),
  education: z.string().min(2, "Formação é obrigatória"),
  professionalEmail: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().min(9, "Contacto de celular inválido").optional().or(z.literal("")),
  status: z.enum(["ACTIVO", "INACTIVO"]),
});

interface InstructorFormProps {
  instructor?: any;
}

export function InstructorForm({ instructor }: InstructorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoUrl, setPhotoUrl] = useState(instructor?.photo || "");

  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Apenas JPEG, PNG ou WebP são permitidos");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "mozshaq/instructors");

      const res = await uploadImage(formData);
      if (res.success && res.url) {
        setPhotoUrl(res.url);
        toast.success("Imagem carregada com sucesso");
      } else {
        toast.error(res.error || "Erro ao fazer upload da imagem");
      }
    } catch (error) {
      toast.error("Erro na comunicação com o servidor");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = instructorSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      toast.error("Por favor, corrija os erros no formulário.");
      return;
    }

    try {
      const finalData = { ...result.data, photo: photoUrl };
      const action = instructor ? updateInstructor(instructor.id, finalData) : createInstructor(finalData);
      const res = await action;

      if (res.success) {
        toast.success(instructor ? "Formador actualizado!" : "Formador criado!");
        router.push("/instructors");
        router.refresh();
      } else {
        toast.error(res.error || "Ocorreu um erro");
      }
    } catch (error) {
      toast.error("Erro na comunicação com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">

          <Heading
            title={instructor ? "Editar Formador" : "Novo Formador"}
            text="Gerencie a equipa de instrutores, especialidades e o impacto nos cursos."
          />

        </div>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* COLUNA PRINCIPAL (2/3) */}
        <div className="lg:col-span-2 space-y-4">

          <Card className="rounded-lg border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle className="text-base font-bold">Informações Profissionais</CardTitle>
              </div>
              <CardDescription>Dados principais do formador na plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nome do Instrutor"
                  defaultValue={instructor?.name}
                  className={cn(
                    "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-1 focus:ring-primary h-11",
                    errors.name && "border-red-500 focus:ring-red-500"
                  )}
                />
                {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Especialização Principal</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    placeholder="Ex: UI/UX Design, React, etc."
                    defaultValue={instructor?.specialization}
                    className={cn(
                      "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 h-11",
                      errors.specialization && "border-red-500"
                    )}
                  />
                  {errors.specialization && <p className="text-[10px] text-red-500 font-bold">{errors.specialization}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsExperience" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Anos de Experiência</Label>
                  <Input
                    id="yearsExperience"
                    name="yearsExperience"
                    type="number"
                    defaultValue={instructor?.yearsExperience || 0}
                    className={cn(
                      "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 h-11",
                      errors.yearsExperience && "border-red-500"
                    )}
                  />
                  {errors.yearsExperience && <p className="text-[10px] text-red-500 font-bold">{errors.yearsExperience}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Formação Académica</Label>
                <Input
                  id="education"
                  name="education"
                  placeholder="Ex: Licenciatura em Engenharia Informática"
                  defaultValue={instructor?.education}
                  className={cn(
                    "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 h-11",
                    errors.education && "border-red-500"
                  )}
                />
                {errors.education && <p className="text-[10px] text-red-500 font-bold">{errors.education}</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <CardHeader >
              <div className="flex items-center gap-2">
                <UserRound className="h-5 w-5 text-primary" />
                <CardTitle className="text-base font-bold">Resumo e Biografia</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sobre o Formador</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Descreva brevemente a experiência e percurso do formador..."
                  defaultValue={instructor?.bio}
                  rows={6}
                  className={cn(
                    "rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-1 focus:ring-primary resize-none p-4",
                    errors.bio && "border-red-500 focus:ring-red-500"
                  )}
                />
                {errors.bio && <p className="text-[10px] text-red-500 font-bold">{errors.bio}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUNA LATERAL (1/3) */}
        <div className="space-y-4 relative">
          <Card className="rounded-lg border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <CardHeader >
              <CardTitle className="text-sm border-b pb-2 font-bold uppercase tracking-wider">Estado e Contactos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status na Plataforma</Label>
                <Select name="status" defaultValue={instructor?.status || "ACTIVO"}>
                  <SelectTrigger className="rounded-lg border-slate-200 dark:border-slate-800 h-11">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVO">Activo</SelectItem>
                    <SelectItem value="INACTIVO">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="professionalEmail" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Directo</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="professionalEmail"
                      name="professionalEmail"
                      type="email"
                      placeholder="email@mozshaq.com"
                      defaultValue={instructor?.professionalEmail || ""}
                      className="pl-10 rounded-lg h-11 focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Telemóvel</Label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+258 8x xxxxxxx"
                      defaultValue={instructor?.phone || ""}
                      className="pl-10 rounded-lg h-11 focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
            <CardHeader >
              <CardTitle className="text-sm border-b pb-2 font-bold uppercase tracking-wider">Fotografia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <ImageIcon className="h-4 w-4 mr-2" />
                    )}
                    {uploadingImage ? "A Carregar..." : "Procurar no Dispositivo"}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="aspect-square w-full rounded-lg bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 overflow-hidden group relative">
                  {photoUrl ? (
                    <Image src={photoUrl} width={200} height={200} className="w-full h-full object-cover" alt="Fotografia" />
                  ) : (
                    <>
                      <ImageIcon className="text-slate-300" size={32} />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">
                        Nenhuma imagem seleccionada
                      </p>
                    </>
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex flex-col items-center justify-center backdrop-blur-sm">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    </div>
                  )}
                </div>

                {photoUrl && (
                  <p className="text-[9px] text-muted-foreground break-all">URL: {photoUrl}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="w-full absolute -top-16 cursor-pointer rounded-lg h-12 font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg active:scale-[0.98] transition-all"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
              {instructor ? "Actualizar Dados" : "Salvar Especialista"}
            </Button>

          </div>
        </div>
      </form>
    </div>
  );
}
