
import { useCallback, useEffect, useState } from "react";
import FormsRadioButton from "../_components/forms-radio-button";
import { PhInfoLight } from "@/app/_components/svg/ph-info-light";
import { ProgramYearCycleSetting } from "@/models/program-year-cycle-setting";
import { useFillInFormHook } from "../_context/use-fill-in-form-hook";
import { ValidationType } from "@/types/enums/validation-type";
import { getProgramSettingYearCycleForRegRecordAction } from "@/actions/registration-create-action";

let todayYear = new Date().getFullYear();

export default function ScheduleSelectionBeforeAndAfterSchool() {
  const { state, setYearCycle } = useFillInFormHook();
  const [programYearCycle, setProgramYearCycle] = useState<ProgramYearCycleSetting & any | undefined>(undefined)

  useEffect(() => {
    if (state?.fillInForm?.location) {
      async function getProgamSettingYearCycle() {
        let data = await getProgramSettingYearCycleForRegRecordAction(state?.fillInForm?.location?.id?.toString() ?? 1);

        setProgramYearCycle(data);
      }

      getProgamSettingYearCycle();
    }
  }, [state?.fillInForm.location])


  function renderRadio(value: string, current: string) {
    return (
      <span className="rounded-full border border-warning h-5 w-5 p-1">
        <span className={`transition-all duration-100 ${value === current ? 'bg-warning' : 'bg-transparent'} h-full w-full block rounded-full`} />
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
          current={state?.fillInForm?.yearCycle?.value ?? ''}
          labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
          onChange={(value: string) => {
            setYearCycle({
              value: value,
              errorText: '',
              validationStatus: ValidationType.NONE,
            });
          }}
          renderRadio={renderRadio} />
        <FormsRadioButton labelText={yearCycleCB(todayYear + 1, programYearCycle?.next_year_cycle ?? undefined)}
          value={programYearCycle?.year_cycle?.next_year_cycle!}
          current={state?.fillInForm?.yearCycle?.value ?? ''}
          renderRadio={renderRadio}
          name="year-cycle"
          labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
          onChange={(value: string) => {
            setYearCycle({
              value: value,
              errorText: '',
              validationStatus: ValidationType.NONE,
            });
          }} />
        {
          state?.fillInForm?.yearCycle?.errorText !== '' &&
          (<div className="text-danger">{state?.fillInForm?.yearCycle?.errorText}</div>)
        }
      </div>
    </div>
  )
}