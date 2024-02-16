import { ReactNode } from "react";
import DrawerRoot from "./_sections/drawer-root";
import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";

export default async function Layout({ children }: { children: ReactNode }) {
  let admin: Session<Admin> | null = await auth();

  return (<DrawerRoot admin={admin}>{children}</DrawerRoot>);
}