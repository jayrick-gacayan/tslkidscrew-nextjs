import { VacationCampSetting } from "@/models/vacation-camp-setting"
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { ChangeEvent, useMemo } from "react";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { vacationCampsSet } from "../_redux/fill-in-form-slice";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { getDayNumArr, parseDates } from "@/types/helpers/date-helpers";
import { format } from 'date-fns';

export default function AttendanceScheduleVacationCamp({
  vacationCamps,
}: {
  vacationCamps: Partial<VacationCampSetting>[];
}) {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const vacationCampsMemo = useMemo(() => {
    return fillInFormState.fillInForm.vacationCamps;
  }, [fillInFormState.fillInForm.vacationCamps])

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-bold text-[36px]">Attendance Schedule</h1>
        <div className="italic space-x-0.5">
          <span className="inline align-top">&#42;</span>
          <span className="inline">Select Attendance Schedule for Vacation Camp</span>
        </div>
        <div className="space-y-4">
          {
            vacationCamps.map((val: Partial<VacationCampSetting>, idx: number) => {
              return (
                <label key={`${val.id}=${idx}`}
                  htmlFor={`vacation-camp-${val.name}`}
                  className={`space-y-2 p-2 block rounded border border-secondary-light
                  ${vacationCampsMemo.value.find((value: Partial<VacationCampSetting>) => {
                    return val.id === value.id
                  }) ? 'bg-primary text-white' : 'bg-secondary-light'}`}>
                  <div className="block">
                    <InputCheckboxCustom labelText={val.name}
                      id={`vacation-camp-${val.name}`}
                      name='vacation-camp[]'
                      className="checked:border-white"
                      checked={
                        vacationCampsMemo.value.find((value: Partial<VacationCampSetting>) => {
                          return val.id === value.id
                        }) ? true : false
                      }
                      value={val.id}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        let id = parseInt(event.target.value)
                        reduxStore.dispatch(
                          vacationCampsSet(
                            fieldInputValue(
                              !vacationCampsMemo.value.find(
                                (vacCamp: Partial<VacationCampSetting>) => {
                                  return vacCamp.id === id
                                }
                              ) ? [...vacationCampsMemo.value, val] :
                                vacationCampsMemo.value.filter(
                                  (vacCamp: Partial<VacationCampSetting>) => {
                                    return vacCamp.id !== id
                                  }
                                )
                            )
                          )
                        )
                      }} />
                  </div>

                  <div className='block space-x-2'>
                    <span className="p-2">Dates: </span>
                    <span className="">
                      {
                        getDayNumArr(val).map((value: any) => {
                          return (
                            parseDates(value.toString(), val, 'yyyy-MMMM-d')
                          )
                        }).map((dateVal: Date) => {
                          return format(dateVal, 'LLL. d, yyyy')
                        }).join(', ')
                      }
                    </span>
                  </div>
                </label>
              )
            })
          }
        </div>
        {
          vacationCampsMemo.errorText !== '' && (<div className="text-danger">{vacationCampsMemo.errorText}</div>)
        }
      </div>

    </div>
  )
}