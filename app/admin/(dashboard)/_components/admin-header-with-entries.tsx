import { ReactNode } from "react";

export default function AdminHeaderWithEntries({
  headerText,
  children
}: {
  headerText: string | ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex sm:flex-row flex-col gap-4 items-start sm:items-center justify-between">
      <div className="flex-1 text-black">
        <h1 className="font-medium text-[24px]">{headerText}</h1>
      </div>
      <div className="flex-none sm:w-auto w-full">
        {children && children}
      </div>
    </div>
  )
}