import { ReactNode } from "react";

export default function AdminInfoContainer({
  label,
  data
}: {
  label: string;
  data: string | ReactNode;
}) {
  return (
    <div className="flex w-full mb-8">
      <div className="w-full font-semibold">{label}</div>
      <div className="w-full">{data}</div>
    </div>
  )
}