import Heading from "@/components/Heading";
import UsersTable from "@/components/tables/UsersTable";
import { getUsers } from "@/lib/actions/users";
import { UserFormDialog } from "@/components/users/UserFormDialog";
import UsersSearch from "@/components/users/UsersSearch";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

async function Users({ searchParams }: PageProps) {
  const params = await searchParams;
  const { users, total, page, limit } = await getUsers(params);

  return (
    <div className="max-w-7xl mx-auto space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between md:items-center gap-2">
        <Heading
          title="Utilizadores"
          text="Faça a gestão dos acessos, papéis e estados de todos os utilizadores da plataforma."
        />
        <UserFormDialog />
      </div>

      <UsersSearch />

      <UsersTable 
        users={users} 
        total={total}
        page={page}
        limit={limit}
      />
    </div>
  );
}

export default Users;
