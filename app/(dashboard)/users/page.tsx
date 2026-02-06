import { DataTable } from "@/components/datatable/data-table";
import Heading from "@/components/Heading";
import UsersTable from "@/components/tables/UsersTable";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search } from "lucide-react";

import { columns } from "@/components/datatable/columns";
import { tasks } from "@/task/tasks";
async function Users() {
  return (
    <div className="max-w-7xl mx-auto space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between md:items-center gap-2">
        <Heading
          title="Usuários"
          text="Gerencie os acessos, roles e status de todos os usuários da plataforma."
        />
        <Button className="inline-flex items-center justify-center gap-2 text-sm font-bold  shadow-xl shadow-primary/20 transition-all active:scale-95 cursor-pointer">
          <Plus size={16} />
          Adicionar Usuário
        </Button>
      </div>

      <div className="bg-background p-2 rounded-2xl border shadow-sm flex flex-col lg:flex-row gap-2 justify-between items-center">
        <div className="relative w-full lg:w-96 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
            size={16}
          />
          <input
            className="w-full pl-10 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="Search by name, email, or ID"
            type="text"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Filter size={16} className="text-slate-400" />
            <span>Mais filtros</span>
          </button>
        </div>
      </div>
      <UsersTable />
      {/* <DataTable data={tasks} columns={columns} /> */}
    </div>
  );
}

export default Users;
