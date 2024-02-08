import { ReactNode } from "react";

export default function calendarContainer({ children }: { children: ReactNode }) {
  return (
    <div className="-mt-[1px] w-full bg-white rounded border border-secondary-light shadow-lg">
      {children}
    </div>
  )
}