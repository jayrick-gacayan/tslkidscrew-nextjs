import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SettingFormSubmit({ text }: { text: string | ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <div className="w-fit ml-auto block">
      <button className="bg-primary text-white p-2 rounded disabled:cursor-not-allowed w-48 text-center"
        disabled={pending}>
        {pending ? <><Spinners3DotsScale className="text-white text-[24px] inline-block mr-1" />Checking</> : text}
      </button>
    </div>
  )
}