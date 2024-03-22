import { useFormStatus } from "react-dom";
import PendingAction from "../../forms/[program_type]/fill-in-form/_components/pending-actions";

export default function LoginDetailsButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <div className='w-fit ml-auto block space-x-4'>
      <button className='p-2 text-white border border-primary rounded bg-primary'>
        {!pending ? 'Save Changes' : <PendingAction />}
      </button>
    </div>
  );
}