import Link from "next/link";
import { Bell, Menu, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b">
      <div className="flex items-center gap-4">
        <button className="lg:hidden">
          <Menu />
        </button>

        <div className="hidden lg:flex relative w-96">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            className="w-full h-10 pl-10 rounded-full bg-slate-50 dark:bg-slate-800"
            placeholder="Search students, courses..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="relative p-2">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        <Link href="/enrollments" className="hidden sm:flex cursor-pointer">
          <Button className="cursor-pointer">
            <Plus size={18} />
            Nova inscrição
          </Button>
        </Link>
      </div>
    </header>
  );
}
