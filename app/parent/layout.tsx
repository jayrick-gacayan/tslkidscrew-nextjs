import { ReactNode } from "react"
import ParentHeader from "./_sections/parent-header";
import ParentBreadcrumbs from "./_sections/parent-breadcrumbs";
import { headers } from "next/headers";

export default function Layout({
  children
}: {
  children: ReactNode;
}) {

  let headersList = headers();

  headersList.forEach((value, key) => {
    console.log(`${key} ==> ${value}`);
  });

  return (
    <div className="relative">
      <ParentHeader />
      <div className="p-12 max-w-screen-2xl m-auto block overflow-auto space-y-8">
        <ParentBreadcrumbs />
        {children}
      </div>
    </div>
  )
}