import Spinners3DotsScale from '@/app/_components/svg/spinners3-dots-scale';
import { useFormStatus } from 'react-dom';

export default function AdminUserFormButtonSubmit({ formReset }: { formReset: () => void; }) {
  const { pending } = useFormStatus();

  return (
    <div className='flex items-center justify-end gap-4'>
      <button type='button'
        className='bg-white text-primary p-2 disabled:cursor-not-allowed'
        disabled={pending}
        onClick={formReset}>Cancel</button>
      <button type='submit'
        className='disabled:cursor-not-allowed bg-primary text-white rounded p-2'
        disabled={pending}>
        {pending ? <Spinners3DotsScale className='text-white text-[24px] inline-block mr-1' /> : 'Save'}
      </button>
    </div>
  );
}