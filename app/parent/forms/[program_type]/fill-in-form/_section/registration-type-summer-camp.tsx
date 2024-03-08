import { useMemo, useState } from "react";
import FormsRadioButton from "../_components/forms-radio-button";
import Link from "next/link";
import CustomCheckbox from "@/app/_components/custom-checkbox";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { summerCampPackageRegChanged } from "../_redux/fill-in-form-slice";

export default function RegistrationTypeSummerCamp() {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const summerCampPackageReg = useMemo(() => {
    return fillInFormState.fillInForm.summerCampPackageReg;
  }, [fillInFormState.fillInForm.summerCampPackageReg])

  const [promoWeek, setPromoWeek] = useState('');
  const [weekEvents, setWeekEvents] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])

  function renderRegTypeRadio(value: string, current: string) {
    return (
      <span className="rounded-full border border-warning h-5 w-5 p-1">
        <span className={`transition-all duration-100 ${value === current ? 'bg-warning' : 'bg-transparent'} h-full w-full block rounded-full`} />
      </span>
    )
  }

  function renderWeekPromoRadio(value: string, current: string) {
    return (
      <span className={`inline-block align-middle h-5 w-5 p-1 rounded-full border ${value === current ? 'border-primary' : 'border-secondary-light'}`}>
        <span className={`transition-all duration-100 ${value === current ? 'bg-primary' : 'bg-transparent'} h-full w-full block rounded-full`} />
      </span>
    )
  }

  function replaceValue(val: boolean, idx: number) {
    setWeekEvents(weekEvents.map((value: boolean, index: number) => {
      return index === idx ? val : value;
    }))
  }

  function summerCampRegHandleChanged(value: string) {
    reduxStore.dispatch(summerCampPackageRegChanged(fieldInputValue(value)))
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Choose your registration type</h1>
      </div>
      <div className="space-y-2">
        <div className="space-y-2">
          <FormsRadioButton name="reg-type-summer-camp"
            labelText='The Kids Crew Summer Specials: Pay for summer upfront SAVE 10%, and no registration fee.'
            value='special'
            current={summerCampPackageReg.value}
            renderRadio={renderRegTypeRadio}
            labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
            onChange={summerCampRegHandleChanged} />
          <FormsRadioButton labelText='Regular Registration'
            value='regular'
            name="reg-type-summer-camp"
            current={summerCampPackageReg.value}
            renderRadio={renderRegTypeRadio}
            labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
            onChange={summerCampRegHandleChanged} />
        </div>
      </div>
      {
        summerCampPackageReg.value !== '' &&
        (
          <div className="block">
            {
              summerCampPackageReg.value === 'regular' ?
                (
                  <div className="font-medium text-[18px]">
                    If a week is not shown, it means that it is at the capacity. Contact
                    <Link href='mailto:tsladventures@gmail.com'
                      className="text-primary hover:underline mx-1">
                      tsladventures@gmail.com
                    </Link>
                    to request being added to any closed week. Your request may or may not be accommodated.
                  </div>
                ) :
                (
                  <div className="space-y-4 bg-secondary rounded p-4">
                    <h1 className="text-[24px]">Promo Package registration</h1>
                    <div>Number of Children: 1</div>
                    <div className="flex items-center gap-4">
                      <div className="font-medium">Week Promos</div>
                      <div className="flex-1 space-x-2">
                        {/* <FormsRadioButton labelText='6 weeks $1404'
                          value={`6-weeks`}
                          current={promoWeek}
                          renderRadio={renderWeekPromoRadio}
                          labelClassName="inline-block space-x-2 cursor-pointer"
                          onChange={(value: string) => { setPromoWeek(value); }} />
                        <FormsRadioButton labelText='7 weeks $1638'
                          value='7-weeks'
                          current={promoWeek}
                          renderRadio={renderWeekPromoRadio}
                          labelClassName="inline-block space-x-2 cursor-pointer"
                          onChange={(value: string) => { setPromoWeek(value); }} />
                        <FormsRadioButton labelText='8 weeks $1872'
                          value='8-weeks'
                          current={promoWeek}
                          renderRadio={renderWeekPromoRadio}
                          labelClassName="inline-block space-x-2 cursor-pointer"
                          onChange={(value: string) => { setPromoWeek(value); }} />
                        <FormsRadioButton labelText='9 weeks $2106'
                          value='9-weeks'
                          current={promoWeek}
                          renderRadio={renderWeekPromoRadio}
                          labelClassName="inline-block space-x-2 cursor-pointer"
                          onChange={(value: string) => { setPromoWeek(value); }} /> */}
                      </div>
                    </div>
                    {
                      promoWeek !== '' &&
                      (
                        <div className="space-y-4">
                          <CustomCheckbox value={weekEvents[0]}
                            text='Week 1: July 1-5: Welcome to the crew.'
                            onChange={(value: boolean) => { replaceValue(value, 0) }} />
                          <CustomCheckbox value={weekEvents[1]}
                            text='Week 2: July 8-12 Medieval Times.'
                            onChange={(value: boolean) => { replaceValue(value, 1) }} />
                          <CustomCheckbox value={weekEvents[2]}
                            text='Week 3: July 15-19: Alien Invasion.'
                            onChange={(value: boolean) => { replaceValue(value, 2) }} />
                          <CustomCheckbox value={weekEvents[3]}
                            text='Week 4: July 22-26: Amazing Race.'
                            onChange={(value: boolean) => { replaceValue(value, 3) }} />
                          <CustomCheckbox value={weekEvents[4]}
                            text="Week 5: July 29-August 2: TSL' s Got Talent."
                            onChange={(value: boolean) => { replaceValue(value, 4) }} />
                          <CustomCheckbox value={weekEvents[5]}
                            text='Week 6: Aug 5-Aug 9: Unspoiled Sports.'
                            onChange={(value: boolean) => { replaceValue(value, 5) }} />
                          <CustomCheckbox value={weekEvents[6]}
                            text='Week 7: August 12-16 Roy G Biv.'
                            onChange={(value: boolean) => { replaceValue(value, 6) }} />
                          <CustomCheckbox value={weekEvents[7]}
                            text='Week 8: August 19-23 Throwback.'
                            onChange={(value: boolean) => { replaceValue(value, 7) }} />
                          <CustomCheckbox value={weekEvents[8]}
                            text='Week 9: August 26-30: Back in the Saddle.'
                            onChange={(value: boolean) => { replaceValue(value, 8) }} />
                        </div>
                      )
                    }

                  </div>
                )

            }

          </div>
        )
      }
    </div>
  )
}