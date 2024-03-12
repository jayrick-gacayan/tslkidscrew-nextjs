import PopoverReactDayPicker from "@/app/_components/react-day-picker/popover-day-picker";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { ChangeEvent, useMemo } from "react";
import {
  beforeOrAfterSchoolStartDateChanged,
  beforeOrAfterWeekDaysSet
} from "../_redux/fill-in-form-slice";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { WEEK_DAYS } from "@/types/constants/week-days";

let today = new Date();

export default function RegistrationTypeSelectionBeforeOrAfterSchool() {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm
  })

  const startDate = useMemo(() => {
    return fillInFormState.fillInForm.startDate;
  }, [fillInFormState.fillInForm.startDate]);

  const { beforeSchool, afterSchool, errorText } = useMemo(() => {
    let { errorText, value } = fillInFormState.fillInForm.beforeOrAfterWeekDays
    let { beforeSchool, afterSchool } = value;

    return { beforeSchool, afterSchool, errorText }
  }, [fillInFormState.fillInForm.beforeOrAfterWeekDays]);

  function handleCheckboxChange(key: 'beforeSchool' | 'afterSchool', arrSchool: any[]) {
    return function (e: ChangeEvent<HTMLInputElement>) {
      let val = e.target.value;
      reduxStore.dispatch(
        beforeOrAfterWeekDaysSet({
          key: key,
          value: !arrSchool.includes(val) ? [...arrSchool, val] :
            arrSchool.filter((value: string) => { return value !== val })
        })
      )
    }
  }

  console.log('errorText', errorText)
  return (
    <div className="space-y-8">
      <h1 className="font-medium text-[36px]">Registration Type Selection</h1>
      <div className="space-y-6">
        <div className="relative space-y-1">
          <div className="font-medium">Start Date</div>
          <div className="relative w-full">
            <PopoverReactDayPicker selected={startDate.value ? new Date(startDate.value) : undefined}
              placeholder="Enter date"
              inputName='before-or-after-registration-start-date'
              options={{
                mode: "single",
                selected: startDate.value ? new Date(startDate.value) : undefined,
                onSelect: (date: any) => {
                  reduxStore.dispatch(beforeOrAfterSchoolStartDateChanged(fieldInputValue(date.toISOString())))
                },
                today: today,
              }} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="italic text-danger font-medium">&#42; Select at least 3 Week Days to continue with your registration.</div>
          <div className='block space-y-2'>
            <h4 className="font-medium">Before School:</h4>
            <div className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
              {
                WEEK_DAYS.map((val: string, idx: number) => {
                  return (
                    <InputCheckboxCustom key={`before-school-${val}-${idx}`}
                      labelText={val}
                      id={`before-school-${val.toLowerCase()}`}
                      name='before-school[]'
                      checked={beforeSchool.includes(val)}
                      value={val}
                      onChange={handleCheckboxChange('beforeSchool', beforeSchool)} />
                  )
                })
              }
            </div>
          </div>
          <div className='block space-y-2'>
            <h4 className="font-medium">After School:</h4>
            <div className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
              {
                WEEK_DAYS.map((val: string, idx: number) => {
                  return (
                    <InputCheckboxCustom key={`after-school-${val}-${idx}`}
                      labelText={val}
                      id={`after-school-${val.toLowerCase()}`}
                      name='after-school[]'
                      checked={afterSchool.includes(val)}
                      value={val}
                      onChange={handleCheckboxChange('afterSchool', afterSchool)} />
                  )
                })
              }
            </div>
          </div>
          {
            errorText !== '' && (<div className="text-danger">{errorText}</div>)
          }
        </div>
      </div>
    </div>
  )
}