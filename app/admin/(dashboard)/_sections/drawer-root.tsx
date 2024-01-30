'use client';

import { ReactNode, useState } from "react";
import AdminHeader from "./admin-header";
import Sidebar from "./sidebar";

export default function DrawerRoot({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="relative h-screen">
      <AdminHeader onDrawerOpen={() => { setDrawerOpen(true); }} />
      <Sidebar drawerOpen={drawerOpen} onDrawerOpen={(open: boolean) => { setDrawerOpen(open) }} />
      <div className="w-full lg:ps-64 overflow-auto pt-12">
        <div className="p-12">
          {children}
        </div>
      </div>
    </div>
  )
}