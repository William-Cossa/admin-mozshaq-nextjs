"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function LessonItem({ data, update, remove }: any) {
  return (
    <div className="border p-3 rounded-xl space-y-2">
      <Label>Título da lição</Label>
      <Input
        value={data.title}
        onChange={(e) => update({ ...data, title: e.target.value })}
      />
      <Button variant="destructive" onClick={remove}>
        Remover
      </Button>
    </div>
  );
}
