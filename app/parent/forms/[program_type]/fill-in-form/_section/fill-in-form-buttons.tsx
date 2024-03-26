import { useFormStatus } from 'react-dom';
import { Parent } from '@/models/parent';
import Fa6BrandVisa from '@/app/_components/svg/fa6-brand-visa';
import ButtonForPlaid from './button-for-plaid';
import Link from 'next/link';
import { reduxStore } from '@/react-redux/redux-store';
import { fillInFormReset } from '../_redux/fill-in-form-slice';
import { Dispatch, SetStateAction, useEffect } from 'react';
import PendingAction from '../_components/pending-actions';
import ButtonForStripe from './button-for-stripe';

export default function FillInFormButtons({
  program_type,
  step,
  cardDetails,
  bankDetails,
  buttonPress,
  setButtonPress,
  plaidOpen,
}: {
  program_type: string;
  step: string | undefined;
  cardDetails: Pick<Parent, 'card_brand' | 'card_last_four'> | undefined;
  bankDetails: Pick<Parent, 'bank_name'> | undefined;
  plaidOpen: boolean;
  buttonPress: string;
  setButtonPress: Dispatch<SetStateAction<string>>;
}) {
  const { pending } = useFormStatus();

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-and-after-school' ? 5 : 4;

  return (
    <>
      <div className='space-y-2'>
        {
          ((!!cardDetails &&
            !!cardDetails.card_brand &&
            !!cardDetails.card_last_four) &&
            (stepInNumber === highestStep)) &&
          (
            <div>
              Card on File:
              <span className='mx-1'>
                {
                  cardDetails?.card_brand !== 'Visa' ? cardDetails?.card_brand :
                    (<Fa6BrandVisa className='align-middle inline-block text-primary text-[32px]' />)
                }
              </span>
              ending ************{cardDetails?.card_last_four}
            </div>
          )
        }
        {
          ((!!bankDetails && !!bankDetails.bank_name) &&
            (stepInNumber === highestStep)) &&
          (<div>Bank on File: <span className='font-bold text-[20px]'>{bankDetails.bank_name}</span></div>)
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
                  {!pending ? 'Next' : (<PendingAction />)}
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
              buttonPress={buttonPress}
              bankDetails={bankDetails}
              plaidOpen={plaidOpen} />
            <ButtonForStripe pending={pending && buttonPress === 'stripe'}
              cardDetails={cardDetails}
              setButtonPress={setButtonPress} />
          </div>
        )
      }
    </>
  );
}