import { ReactNode } from "react";

export default function calendarContainerRange({ children }: { children: ReactNode }) {
  return (
    <div className="-mt-[1px] flex items-stretch sm:flex-row flex-col bg-white rounded border border-secondary-light shadow-lg sm:max-h-fit max-h-[304px] overflow-auto">
      {children}
    </div>
  )
}