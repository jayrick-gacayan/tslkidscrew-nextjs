import { useFormStatus } from 'react-dom';
import Fa6SolidSquareCheck from '@/app/_components/svg/fa6-solid-square-check';
import Spinners3DotsScale from '@/app/_components/svg/spinners3-dots-scale';

export default function SummerCampSwimButtonSubmit() {
  const { pending } = useFormStatus();
  const PendingIcon = pending ? Spinners3DotsScale : Fa6SolidSquareCheck;

  return (
    <button type="submit"
      disabled={pending}
      className="cursor-pointer disabled:cursor-not-allowed">
      <PendingIcon className='text-success text-[32px]' />
    </button>
  )
}