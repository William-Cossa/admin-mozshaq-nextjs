"use client";

import { Enrollment } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateEnrollmentStatus } from "@/lib/actions/enrollments";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StatusSelectProps {
  enrollmentId: string;
  currentStatus: Enrollment["status"];
}

export function StatusSelect({ enrollmentId, currentStatus }: StatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    const typedStatus = newStatus as Enrollment["status"];
    setIsUpdating(true);
    try {
      await updateEnrollmentStatus(enrollmentId, typedStatus);
      setStatus(typedStatus);
      toast.success("Estado actualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao actualizar o estado.");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusLabel = (s: string) => {
    switch (s) {
      case "active": return "Activo";
      case "pending": return "Pendente";
      case "completed": return "Concluído";
      case "dropped": return "Cancelado";
      default: return s;
    }
  };

  const getStatusStyles = (s: string) => {
    switch (s) {
      case "active":
        return "bg-green-50 text-green-700 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600/50";
    }
  };

  return (
    <Select
      value={status}
      onValueChange={handleStatusChange}
      disabled={isUpdating}
    >
      <SelectTrigger
        size="sm"
        className={cn(
          "h-7 w-fit px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
          getStatusStyles(status)
        )}
      >
        <SelectValue>{getStatusLabel(status)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Activo</SelectItem>
        <SelectItem value="pending">Pendente</SelectItem>
        <SelectItem value="completed">Concluído</SelectItem>
        <SelectItem value="dropped">Cancelado</SelectItem>
      </SelectContent>
    </Select>
  );
}
