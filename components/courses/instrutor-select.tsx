import React, { useState, useMemo } from "react";
import { X, Search } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  avatar: string;
}

interface InstructorSelectProps {
  selected: string[];
  onChange: (value: string[]) => void;
}

const MOCK_INSTRUCTORS: Instructor[] = [
  { id: "1", name: "Ana Duarte", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Bruno Silva", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Carla Mendes", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "4", name: "Daniel Rocha", avatar: "https://i.pravatar.cc/150?u=4" },
];

export const InstructorSelect: React.FC<InstructorSelectProps> = ({
  selected,
  onChange,
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_INSTRUCTORS.filter((i) =>
      i.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((i) => i !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-3 py-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center gap-1.5"
      >
        Selecionar Formadores
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">
            <Search size={14} className="text-slate-400" />
            <input
              autoFocus
              className="bg-transparent w-full text-sm focus:outline-none"
              placeholder="Buscar formador..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {filtered.map((inst) => (
              <button
                key={inst.id}
                type="button"
                onClick={() => toggle(inst.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all border ${
                  selected.includes(inst.id)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <img src={inst.avatar} className="size-7 rounded-full" />
                <span className="text-sm font-bold">{inst.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
