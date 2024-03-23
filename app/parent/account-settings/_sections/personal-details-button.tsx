import Spinners3DotsScale from '@/app/_components/svg/spinners3-dots-scale';
import { useFormStatus } from 'react-dom';

export default function PersonalDetailsButtons() {
  const { pending } = useFormStatus();

  return (
    <div className='w-fit ml-auto block space-x-4'>
      <button type='button'
        disabled={pending}
        className='disabled:cursor-not-allowed p-2 text-danger border border-danger rounded'>
        Cancel my account
      </button>
      <button disabled={pending}
        className='disabled:cursor-not-allowed p-2 text-white border border-primary rounded bg-primary'>
        {
          !pending ? 'Update' :
            (
              <>
                <Spinners3DotsScale className='inline-block mr-1' />
                <span>Checking</span>
              </>
            )
        }
      </button>
    </div>
  )
}