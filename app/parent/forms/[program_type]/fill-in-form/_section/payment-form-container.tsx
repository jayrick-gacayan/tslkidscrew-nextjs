import StripeFormContainer from './credit-card-info-container';
import { PhShoppingCartBold } from '@/app/_components/svg/ph-shopping-cart-bold';
import { ChangeEvent, useCallback } from 'react';
import ModalCardInfoForStripe from './modal-card-info-for-stripe';
import { ChildInfoType } from '@/types/input-types/child-info-type';
import { BEFORE_OR_AFTER_SCHOOL_TOS } from '@/types/constants/before-or-after-school-tos';
import { SUMMER_CAMP_SCHOOL_TOS } from '@/types/constants/summer-camp-tos';
import { VACATION_CAMP_TOS } from '@/types/constants/vacation-camp-tos';
import { TOSInfos } from '@/types/props/tos-infos';
import InputCheckboxCustom from '@/app/_components/input-checkbox-custom';
import { currencyFormat } from '@/types/helpers/currency-format';
import { InputProps } from '@/types/props/input-props';
import { VacationCampSetting } from '@/models/vacation-camp-setting';

function vacationCampPrice(numOfVacCamps: number, numOfChildren: number) {
  switch (numOfChildren) {
    case 1:
      switch (numOfVacCamps) {
        case 0: return 0;
        case 1: return 190;
        case 2: return 315;
        default: return 400;
      }
    case 2:
      switch (numOfVacCamps) {
        case 0: return 0;
        case 1: return 380;
        case 2: return 630;
        default: return 800;
      }
    default:
      switch (numOfVacCamps) {
        case 0: return 0;
        case 1: return 570;
        case 2: return 945;
        default: return 1200;
      }
  }
}

export default function PaymentFormContainer({
  program_type,
  childrenArr,
  tosCondition,
  vacationCamps,
  onCheckboxChange,
}: {
  program_type: string;
  childrenArr: ChildInfoType[];
  tosCondition: InputProps<any[]>;
  vacationCamps: Pick<VacationCampSetting, 'id' | 'name' | 'month' | 'year'>[];
  onCheckboxChange: (value: string) => void;
}) {

  const tosArray = useCallback(() => {
    switch (program_type) {
      case 'before-or-after-school': return BEFORE_OR_AFTER_SCHOOL_TOS;
      case 'summer-camp': return SUMMER_CAMP_SCHOOL_TOS;
      case 'vacation-camp': return VACATION_CAMP_TOS;
      default: return [];
    }
  }, [program_type]);

  const totalPrice = useCallback(() => {
    switch (program_type) {
      case 'before-or-after-school': return 25;
      case 'summer-camp': return 200 + 25;
      case 'vacation-camp':
        return vacationCampPrice(vacationCamps.length, childrenArr.length) + 25;
      default: return 0;
    }
  }, [
    program_type,
    vacationCamps,
    childrenArr
  ]);

  return (
    <div className='relative'>
      <div className='space-y-8'>
        <div className='space-y-4 text-black'>
          <h1 className='font-bold text-[36px]'>Payment</h1>
          <div className='rounded border shadow-lg overflow-hidden flex items-center lg:flex-row flex-col gap-4 w-full'>
            <div className='flex-none w-full lg:w-[192px] text-primary lg:p-0 p-4 border-b lg:border-b-0'>
              <PhShoppingCartBold height={72} width={192} className='m-auto block' />
            </div>
            <div className='flex-1 w-full divide-y divide-y-secondary-light'>
              <div className='px-4 py-2 flex justify-between items-center'>
                <div>Deposit Fee:</div>
                <div>{
                  currencyFormat('en-US',
                    { style: 'currency', currency: 'USD' },
                    program_type === 'summer-camp' ? 200 :
                      program_type === 'before-or-after-school' ? 0 :
                        vacationCampPrice(vacationCamps.length, childrenArr.length)
                  )
                }</div>
              </div>
              <div className='px-4 py-2 flex justify-between items-center'>
                <div>Registration Fee:</div>
                <div>{currencyFormat('en-US', { style: 'currency', currency: 'USD', }, 25)}</div>
              </div>
              <div className='px-4 py-2 flex justify-between items-center'>
                <div>Annual Package Fee:</div>
                <div>{currencyFormat('en-US', { style: 'currency', currency: 'USD' }, 0.00)}</div>
              </div>
              <div className='px-4 py-2 flex justify-between items-center'>
                <div>Total Amount Due:</div>
                <div>{currencyFormat('en-US', { style: 'currency', currency: 'USD', }, totalPrice())}</div>
              </div>
            </div>
          </div>
          <p className='italic font-medium text-[18px]'>The TOS is your binding CONTRACT with TSL. Please take time to read it before proceeding.</p>
          {
            tosCondition.errorText !== '' &&
            <div className='rounded bg-danger-light text-white p-2 text-[24px]'>{tosCondition.errorText} </div>
          }
        </div>
        <div className='space-y-2'>
          {
            tosArray().length === 0 ? null :
              (
                <>
                  {
                    tosArray().map(({ num, text }: TOSInfos) => {
                      return (
                        <InputCheckboxCustom key={`${program_type}-TOS-${num}`}
                          id={`${program_type}-TOS-${num}`}
                          labelText={text}
                          name={`${program_type}-tos[]`}
                          checked={tosCondition.value.includes(`${program_type}-TOS-${num}`)}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => { onCheckboxChange(e.target.value); }}
                          value={`${program_type}-TOS-${num}`} />
                      )
                    })
                  }
                </>
              )
          }
        </div>
        <StripeFormContainer />
      </div>
      <ModalCardInfoForStripe program_type={program_type} />
    </div>
  );
}