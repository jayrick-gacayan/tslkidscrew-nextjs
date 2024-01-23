import { ReactNode } from "react"
import ParentHeader from "./_sections/parent-header";

export default function Layout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative h-screen">
      <ParentHeader />
      <div className="p-12 max-w-screen-2xl m-auto block overflow-auto">
        {children}
      </div>
    </div>
  )
}