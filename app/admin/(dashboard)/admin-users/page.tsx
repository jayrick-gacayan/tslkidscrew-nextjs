import AdminUsersHeader from "./_sections/admin-users-header";
import AdminUsersTable from "./_sections/admin-users-table";

export default function Page() {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <AdminUsersHeader />
      <AdminUsersTable />
    </div>
  )
}