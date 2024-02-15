'use client';

import { ReactNode, useState } from "react";
import AdminHeader from "./admin-header";
import Sidebar from "./sidebar";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";

export default function DrawerRoot({
  admin,
  authLogout,
  children
}: {
  admin: Session<Admin> | null;
  authLogout: () => Promise<void>;
  children: ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="relative h-screen overflow-auto">
      <AdminHeader admin={admin}
        authLogout={authLogout}
        onDrawerOpen={() => { setDrawerOpen(true); }} />
      <Sidebar drawerOpen={drawerOpen}
        authLogout={authLogout}
        onDrawerOpen={(open: boolean) => { setDrawerOpen(open) }} />
      <div className="w-full lg:ps-64 pt-12 overflow-auto h-full relative">
        <div className="p-12 relative">
          {children}
        </div>
      </div>
    </div>
  )
}