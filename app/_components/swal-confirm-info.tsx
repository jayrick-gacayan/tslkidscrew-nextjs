import { ReactNode } from "react";

export default function SwalConfirmInfo({
  text,
  data,
}: {
  text: string;
  data: any | ReactNode;
}) {
  return (
    <div className="space-y-[4px] text-center font-semibold">
      <div className="text-[20px]">{text}</div>
      <div className="text-[28px]">{data}?</div>
    </div>
  )
}