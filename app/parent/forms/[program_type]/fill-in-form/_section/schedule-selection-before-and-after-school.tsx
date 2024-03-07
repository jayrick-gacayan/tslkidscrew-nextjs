
import { useCallback, useEffect, useMemo, useState } from "react";
import FormsRadioButton from "../_components/forms-radio-button";
import { PhInfoLight } from "@/app/_components/svg/ph-info-light";
import { ProgramYearCycleSetting } from "@/models/program-year-cycle-setting";
import { getProgramSettingYearCycleForRegRecordAction } from "@/actions/registration-create-action";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { yearCycleChanged } from "../_redux/fill-in-form-slice";
import { fieldInputValue } from "@/types/helpers/field-input-value";

let todayYear = new Date().getFullYear();

export default function ScheduleSelectionBeforeAndAfterSchool() {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  })

  const { value, errorText } = useMemo(() => {
    let { value, errorText, validationStatus } = fillInFormState.fillInForm.yearCycle
    return {
      value,
      errorText,
      validationStatus
    }
  }, [fillInFormState.fillInForm.yearCycle])

  const location = useMemo(() => {
    return fillInFormState.fillInForm.location;
  }, [fillInFormState.fillInForm.location])
  const [programYearCycle, setProgramYearCycle] = useState<ProgramYearCycleSetting & any | undefined>(undefined)

  useEffect(() => {
    if (location) {
      async function getProgamSettingYearCycle() {
        let data = await getProgramSettingYearCycleForRegRecordAction(location.value?.id?.toString() ?? '1');
        setProgramYearCycle(data);
      }

      getProgamSettingYearCycle();
    }
  }, [location])


  function renderRadio(val: string, current: string) {
    return (
      <span className="rounded-full border border-warning h-5 w-5 p-1">
        <span className={`transition-all duration-100 ${val === current ? 'bg-warning' : 'bg-transparent'} h-full w-full block rounded-full`} />
      </span>
    )
  }

  const yearCycleCB = useCallback(
    (todayYear: number, yearCycle?: string) => {
      if (yearCycle) {
        let splitData = yearCycle.split('-');

        return `${splitData[0]} September - ${splitData[1]} June`;
      }

      return `${todayYear - 1} September - ${todayYear} June`;
    }, [programYearCycle]
  );

  function handleChange(val: string) {
    reduxStore.dispatch(yearCycleChanged(fieldInputValue(val)));
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Schedule&#39;s Selection</h1>
        <div className="flex items-center gap-2">
          <div className="flex-none">
            <PhInfoLight className="text-warning text-[24px]" />
          </div>
          <div>Please note that each year cycle has its own set of rates.</div>
        </div>
      </div>
      <div className="space-y-2">
        <FormsRadioButton labelText={yearCycleCB(todayYear, programYearCycle?.current_year_cycle ?? undefined)}
          value={programYearCycle?.year_cycle?.current_year_cycle!}
          name="year-cycle"
          current={value}
          labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
          onChange={handleChange}
          renderRadio={renderRadio} />
        <FormsRadioButton current={value}
          labelText={yearCycleCB(todayYear + 1, programYearCycle?.next_year_cycle ?? undefined)}
          value={programYearCycle?.year_cycle?.next_year_cycle!}
          renderRadio={renderRadio}
          name="year-cycle"
          labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
          onChange={handleChange} />
        {
          errorText !== '' && (<div className="text-danger">{errorText}</div>)
        }
      </div>
    </div>
  )
}