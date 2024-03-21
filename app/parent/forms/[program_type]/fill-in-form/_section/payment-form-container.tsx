import StripeFormContainer from "./credit-card-info-container";
import { PhShoppingCartBold } from "@/app/_components/svg/ph-shopping-cart-bold";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { ChangeEvent, useCallback, useMemo } from "react";
import ModalCardInfoForStripe from "./modal-card-info-for-stripe";
import { ChildInfoType } from "@/types/input-types/child-info-type";
import { BEFORE_OR_AFTER_SCHOOL_TOS } from "@/types/constants/before-or-after-school-tos";
import { SUMMER_CAMP_SCHOOL_TOS } from "@/types/constants/summer-camp-tos";
import { VACATION_CAMP_TOS } from "@/types/constants/vacation-camp-tos";
import { TOSInfos } from "@/types/props/tos-infos";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { tosConditionChanged } from "../_redux/fill-in-form-slice";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { currencyFormat } from "@/types/helpers/currency-format";

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
}: {
  program_type: string;
  childrenArr: ChildInfoType[]
}) {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const errorText = useMemo(() => {
    return fillInFormState.fillInForm.TOSCondition.errorText;
  }, [fillInFormState.fillInForm.TOSCondition.errorText]);

  const vacationCamps = useMemo(() => {
    return fillInFormState.fillInForm.vacationCamps.value;
  }, [fillInFormState.fillInForm.vacationCamps.value]);

  const tosCondition = useMemo(() => {
    let { value } = fillInFormState.fillInForm.TOSCondition;

    return value
  }, [fillInFormState.fillInForm.TOSCondition])

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
    <div className="relative">
      <div className="space-y-8">
        <div className="space-y-2 text-black">
          <h1 className="font-bold text-[36px]">Payment</h1>
          <p className="italic font-medium text-[18px]">The TOS is your binding CONTRACT with TSL. Please take time to read it before proceeding.</p>
          {
            errorText !== '' &&
            <div className="rounded bg-danger-light text-white p-2 text-[24px]">{errorText} </div>
          }
        </div>
        <div className="space-y-2">
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
                          value={`${program_type}-TOS-${num}`}
                          checked={tosCondition.includes(`${program_type}-TOS-${num}`)}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            let { value } = e.target;
                            reduxStore.dispatch(
                              tosConditionChanged(
                                fieldInputValue(
                                  !tosCondition.includes(value) ? [...tosCondition, value] :
                                    tosCondition.filter((val: any) => { return val !== value; })
                                )
                              )
                            )
                          }}
                        />
                      )
                    })
                  }
                </>
              )
          }
        </div>
        <div className="rounded border shadow-lg overflow-hidden flex items-center lg:flex-row flex-col gap-4 w-full">
          <div className="flex-none w-full lg:w-[192px] text-primary lg:p-0 p-4 border-b lg:border-b-0">
            <PhShoppingCartBold height={72} width={192} className="m-auto block" />
          </div>
          <div className="flex-1 w-full divide-y divide-y-secondary-light">
            <div className='px-4 py-2 flex justify-between items-center'>
              <div>Deposit Fee:</div>
              <div>{
                currencyFormat('en-US',
                  { style: "currency", currency: 'USD' },
                  program_type === 'summer-camp' ? 200 :
                    program_type === 'before-or-after-school' ? 0 :
                      vacationCampPrice(vacationCamps.length, childrenArr.length)
                )
              }</div>
            </div>
            <div className='px-4 py-2 flex justify-between items-center'>
              <div>Registration Fee:</div>
              <div>{currencyFormat('en-US', { style: "currency", currency: 'USD', }, 25)}</div>
            </div>
            <div className='px-4 py-2 flex justify-between items-center'>
              <div>Annual Package Fee:</div>
              <div>{currencyFormat('en-US', { style: "currency", currency: 'USD' }, 0.00)}</div>
            </div>
            <div className='px-4 py-2 flex justify-between items-center'>
              <div>Total Amount Due:</div>
              <div>{currencyFormat('en-US', { style: "currency", currency: 'USD', }, totalPrice())}</div>
            </div>
          </div>
        </div>
        <StripeFormContainer />
      </div>
      <ModalCardInfoForStripe program_type={program_type} />
    </div>
  )
}