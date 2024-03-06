'use client';

import { ReactNode, useState } from "react";
import AdminHeader from "./admin-header";
import Sidebar from "./sidebar";
import { Admin } from "@/models/admin";

export default function DrawerRoot({
  admin,
  children
}: {
  admin: Admin;
  children: ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="relative h-screen overflow-auto">
      <AdminHeader admin={admin} onDrawerOpen={() => { setDrawerOpen(true); }} />
      <Sidebar drawerOpen={drawerOpen} onDrawerOpen={(open: boolean) => { setDrawerOpen(open) }} />
      <div className="w-full lg:ps-64 pt-12 overflow-auto h-full relative">
        <div className="p-12 relative h-full">
          {children}
        </div>
      </div>
    </div>
  )
}