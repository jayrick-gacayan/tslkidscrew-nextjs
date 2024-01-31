import { ReactNode } from "react"
import ParentHeader from "./_sections/parent-header";
import ParentBreadcrumbs from "./_sections/parent-breadcrumbs";

export default function Layout({
  children
}: {
  children: ReactNode;
}) {

  return (
    <div className="relative w-screen h-screen">
      <ParentHeader />
      <div className="h-[calc(100vh-96px)] overflow-auto">
        <div className="container mx-auto block space-y-8 h-full lg:px-0 px-4">
          <ParentBreadcrumbs />
          {children}
        </div>
      </div>
    </div>
  )
}