import { SearchParamsProps } from '@/types/props/search-params-props';
import ForgotPasswordFormContainer from './_sections/form-container';

export default function ForgotPassword({ searchParams }: { searchParams: SearchParamsProps }) {

  return (
    <div className='flex items-center justify-center'>
      <div className='w-auto m-auto block bg-white rounded p-8 shadow-lg space-y-6'>
        <ForgotPasswordFormContainer searchParams={searchParams} />
      </div>
    </div>
  );
}