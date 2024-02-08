import { ReactNode } from "react";

export default function calendarContainerRange({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-stretch w-full bg-white rounded border border-secondary-light shadow-lg">
      {children}
    </div>
  )
}