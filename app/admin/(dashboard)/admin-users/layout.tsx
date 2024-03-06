import { ReactNode } from "react";
import AdminUserProvider from "./_contexts/admin-user-provider";
import ModalAdminUsersForm from "./_sections/modal-admin-users-form";

export default async function Layout({ children }: { children: ReactNode; }) {

  return (
    <AdminUserProvider>
      {children}
      <ModalAdminUsersForm />
    </AdminUserProvider>
  )
}