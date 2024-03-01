import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { useFormStatus } from "react-dom";

export default function SubmitProgramButton() {
  const { pending } = useFormStatus();

  return (
    <div className="w-1/2 block m-auto">
      <button className="bg-primary p-2 rounded text-white w-fit block m-auto"
        disabled={pending}>
        {pending ? <><Spinners3DotsScale className="text-white text-[24px] inline-block mr-1" /></> : 'Submit'}
      </button>
    </div>
  )
}