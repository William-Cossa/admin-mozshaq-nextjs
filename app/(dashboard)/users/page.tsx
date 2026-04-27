import Heading from "@/components/Heading";
import UsersTable from "@/components/tables/UsersTable";
import { getUsers } from "@/lib/actions/users";
import { filterUsers } from "@/lib/filters";
import { UserFormDialog } from "@/components/users/UserFormDialog";
import UsersSearch from "@/components/users/UsersSearch";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

async function Users({ searchParams }: PageProps) {
  const params = await searchParams;
  const { users: allUsers } = await getUsers();
  const users = filterUsers(allUsers, params);
  const total = users.length;

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
      />
    </div>
  );
}

export default Users;
