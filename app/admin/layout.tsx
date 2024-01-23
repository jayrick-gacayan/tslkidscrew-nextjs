import { ReactNode } from "react";
import Sidebar from "./_sections/sidebar";
import AdminHeader from "./_sections/admin-header";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle hidden" />
      <div className="drawer-content flex flex-col h-screen overflow-auto relative">
        <AdminHeader />
        <div className="relative">
          <div className="p-12">
            {children}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}