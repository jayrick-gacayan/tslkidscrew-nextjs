import { useFormStatus } from 'react-dom';
import { Parent } from '@/models/parent';
import Fa6BrandVisa from '@/app/_components/svg/fa6-brand-visa';
import ButtonForPlaid from './button-for-plaid';
import Link from 'next/link';
import { RootState, reduxStore } from '@/react-redux/redux-store';
import { fillInFormReset } from '../_redux/fill-in-form-slice';
import { useEffect, useState } from 'react';
import FillInFormPendingAction from '../_components/pending-actions';
import { useAppSelector } from '@/hooks/redux-hooks';
import { FillInFormState } from '../_redux/fill-in-form-state';

export default function FillInFormButtons({
  program_type,
  step,
  cardDetails,
  bankName,
  hasBankDetails,
}: {
  program_type: string;
  step: string | undefined;
  cardDetails: Partial<Parent> | undefined;
  bankName: string;
  hasBankDetails?: boolean | undefined
}) {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const [buttonPress, setButtonPress] = useState<string>('');
  const { pending } = useFormStatus();

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;

  useEffect(() => {
    if (!fillInFormState.stripeModalOpen && buttonPress === 'stripe') {
      setButtonPress('');
    }
  }, [fillInFormState.stripeModalOpen, buttonPress]);

  return (
    <>
      <div className='space-y-2'>
        {
          cardDetails && (stepInNumber === highestStep) &&
          (<div>Card on File: {<span>{
            cardDetails?.card_brand !== 'Visa' ? cardDetails?.card_brand :
              <Fa6BrandVisa className='align-middle inline-block text-primary text-[32px]' />
          }</span>} ending ************{cardDetails?.card_last_four}</div>)
        }
        {
          bankName !== '' && (stepInNumber === highestStep) &&
          (<div>Bank on File: <span className='font-bold text-[20px]'>{bankName}</span></div>)
        }
      </div>

      <div className='flex items-center justify-center gap-4'>
        <div className='flex-1'>
          <Link href={`/parent/forms/${program_type}`}
            className='cursor-pointer transition-all delay-100 px-4 py-2 text-danger rounded border border-danger hover:bg-danger hover:text-white'
            onClick={() => {
              reduxStore.dispatch(fillInFormReset())
            }}>
            Cancel
          </Link>
        </div>
        <div className='flex-none w-auto'>
          <div className='flex w-fit items-center gap-4'>
            {
              stepInNumber > 1 &&
              (
                <button type='submit'
                  value='back'
                  name='back-button'
                  className='px-4 py-2 disabled:cursor-not-allowed bg-white text-primary rounded border border-primary'
                  disabled={pending}>
                  Back
                </button>
              )
            }
            {
              stepInNumber !== highestStep &&
              (
                <button type='submit'
                  className='px-4 py-2 w-auto bg-primary text-white rounded disabled:cursor-not-allowed'
                  disabled={pending}>
                  {!pending ? 'Next' : (<FillInFormPendingAction />)}
                </button>
              )
            }
          </div>
        </div>
      </div>
      {
        stepInNumber === highestStep &&
        (
          <div className='block space-y-2'>
            <ButtonForPlaid program_type={program_type}
              pending={pending && buttonPress === 'plaid'}
              setButtonPress={setButtonPress}
              hasBankDetails={hasBankDetails}
              buttonPress={buttonPress}
              bankName={bankName} />
            <button name='submit-stripe-button'
              value='submit-stripe-button'
              type='submit'
              className={`px-4 py-2 w-full bg-primary text-white rounded disabled:cursor-not-allowed`}
              disabled={pending && buttonPress === 'stripe'}
              onClick={() => { setButtonPress('stripe') }}>
              {
                pending && buttonPress === 'stripe' ? (<FillInFormPendingAction />) :
                  <>
                    {
                      !cardDetails ? 'Submit and Pay' : 'Submit and Pay with Card on File'
                    }
                  </>
              }
            </button>
          </div>
        )
      }
    </>

  )
}