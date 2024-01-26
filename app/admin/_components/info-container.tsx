import { ReactNode } from "react";

export default function InfoContainer({
  label,
  data
}: {
  label: string;
  data: string | ReactNode;
}) {
  return (
    <div className="flex sm:flex-row flex-col gap-2 w-full mb-8">
      <div className="w-full font-semibold text-black">{label}</div>
      <div className="w-full">{data}</div>
    </div>
  )
}