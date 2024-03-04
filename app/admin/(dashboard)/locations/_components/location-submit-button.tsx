import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { useFormStatus } from "react-dom";

export default function LocationSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="bg-primary p-2 rounded text-white w-32 block m-auto disabled:cursor-not-allowed"
      disabled={pending}>
      {pending ? <><Spinners3DotsScale className="text-white text-[24px] inline-block mr-1" /></> : 'Submit'}
    </button>
  )
}