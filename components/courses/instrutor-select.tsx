"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Instructor {
  id: string;
  name: string;
  photo?: string;
  specialization?: string;
}

interface InstructorSelectProps {
  instructors: Instructor[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function InstructorSelect({
  instructors,
  selectedIds,
  onToggle,
}: InstructorSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 border-dashed border-2 bg-slate-50/50 dark:bg-slate-800/50 hover:border-primary hover:bg-primary/5 transition-all rounded-xl"
        >
          <span className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-wider">
            <UserPlus className="h-4 w-4 text-primary" />
            Selecionar Formadores
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[300px] p-0" align="start">
        <Command className="rounded-xl border shadow-md">
          <CommandInput placeholder="Pesquisar formador..." className="h-11" />
          <CommandList className="max-h-72">
            <CommandEmpty>Nenhum formador encontrado.</CommandEmpty>
            <CommandGroup heading="Corpo Docente">
              {instructors.map((instructor) => (
                <CommandItem
                  key={instructor.id}
                  value={instructor.name}
                  onSelect={() => {
                    onToggle(instructor.id);
                  }}
                  className="flex items-center gap-3 py-3 px-4 cursor-pointer data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800"
                >
                  <div className={cn(
                    "flex size-5 items-center justify-center rounded-md border-2 transition-colors",
                    selectedIds.includes(instructor.id)
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-slate-200 dark:border-slate-700 bg-transparent"
                  )}>
                    {selectedIds.includes(instructor.id) && <Check className="h-3.5 w-3.5 stroke-3" />}
                  </div>
                  
                  {instructor.photo ? (
                    <img
                      src={instructor.photo}
                      alt={instructor.name}
                      className="size-9 rounded-full object-cover border border-slate-100 dark:border-slate-800 shadow-sm"
                    />
                  ) : (
                    <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                      {instructor.name.charAt(0)}
                    </div>
                  )}
                  
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-bold truncate">
                      {instructor.name}
                    </span>
                    {instructor.specialization && (
                      <span className="text-[10px] text-muted-foreground truncate font-medium">
                        {instructor.specialization}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
