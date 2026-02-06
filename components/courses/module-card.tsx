"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LessonItem } from "./lesson-item";

export function ModuleCard({ index, data, updateModule, removeModule }: any) {
  function update(field: string, value: any) {
    updateModule(index, { ...data, [field]: value });
  }

  function addLesson() {
    update("lessons", [...data.lessons, { title: "" }]);
  }

  return (
    <div className="border rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Módulo {index + 1}</h3>
        <Button variant="destructive" onClick={() => removeModule(index)}>
          Remover
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Título do módulo</Label>
        <Input
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Lições</Label>
        {data.lessons.map((l: any, i: number) => (
          <LessonItem
            key={i}
            moduleIndex={index}
            index={i}
            data={l}
            update={(val: any) => {
              const next = [...data.lessons];
              next[i] = val;
              update("lessons", next);
            }}
            remove={() => {
              update(
                "lessons",
                data.lessons.filter((_: any, idx: number) => idx !== i)
              );
            }}
          />
        ))}
        <Button onClick={addLesson}>Adicionar Lição</Button>
      </div>
    </div>
  );
}
