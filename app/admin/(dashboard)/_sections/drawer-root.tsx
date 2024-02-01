'use client';

import { ReactNode, useState } from "react";
import AdminHeader from "./admin-header";
import Sidebar from "./sidebar";

export default function DrawerRoot({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="relative h-screen overflow-auto">
      <AdminHeader onDrawerOpen={() => { setDrawerOpen(true); }} />
      <Sidebar drawerOpen={drawerOpen} onDrawerOpen={(open: boolean) => { setDrawerOpen(open) }} />
      <div className="w-full lg:ps-64 pt-12 overflow-auto h-full relative">
        <div className="p-12">
          {children}
        </div>
      </div>
    </div>
  )
}