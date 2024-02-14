import { ReactNode } from "react";
import DrawerRoot from "./_sections/drawer-root";
import { auth, signOut } from "@/auth";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  let admin: Session<Admin> | null = await auth();

  async function adminLogout() {
    'use server';
    await signOut({ redirect: true, redirectTo: '/admin/login' });
  }

  return (
    <DrawerRoot admin={admin}
      authLogout={adminLogout}>
      {children}
    </DrawerRoot>
  );
}