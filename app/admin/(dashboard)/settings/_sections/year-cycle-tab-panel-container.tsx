'use client';

import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { ProgramYearCycleSetting } from "@/models/program-year-cycle-setting";
import { addYears, subYears } from "date-fns";
import YearToYearDatePicker from "../_components/year-to-year-datepicker";
import { useFormState, useFormStatus } from "react-dom";
import { updateProgramYearCycleSettingAction } from "@/actions/program-settings-actions";
import { pathRevalidate } from "@/actions/common-actions";
import { toast, ToastContentProps } from "react-toastify";

let today = new Date();
let minDate = subYears(today, 1);
let maxDate = addYears(today, 1);

export default function YearCycleTabPanelContainer({
  programYearCycleSetting
}: {
  programYearCycleSetting: ProgramYearCycleSetting;
}) {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(
    updateProgramYearCycleSettingAction.bind(null, programYearCycleSetting.id!),
    {} as any
  );
  const cbNextYear = useMemo(() => {
    let { current_year_cycle, next_year_cycle } = programYearCycleSetting;
    let splitCurrent = current_year_cycle?.split('-');
    let splitNext = next_year_cycle?.split('-');

    return {
      currentYear: new Date(`${splitCurrent?.[0]}-1-1`),
      nextYear: new Date(`${splitNext?.[0]}-1-1`),
    }
  }, [programYearCycleSetting])

  const [currentYearCycle, setCurrentYearCycle] = useState<Date | null>(cbNextYear.currentYear);
  const [nextYearCycle, setNextYearCycle] = useState<Date | null>(cbNextYear.nextYear);

  useEffect(() => {
    async function pathToRevalidate() {
      await pathRevalidate('/admin/settings')
    }

    if (state.success !== undefined) {
      let { message, success } = state;
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{message}</div>
        )
      }, {
        toastId: `update-program-setting-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });

      if (success) {
        pathToRevalidate();
      }
    }
  }, [state])

  return (
    <Tab.Panel as='div' id="year-cycle-panel">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="font-medium text-[24px] text-black">Update Year Cycle</h1>
          <form action={formAction} className="space-y-4">
            <div className="rounded bg-secondary p-4">
              <div className="space-y-4 w-[576px]">
                <YearToYearDatePicker headerText="Current Year"
                  minDate={minDate}
                  maxDate={maxDate}
                  name="current-year"
                  selected={currentYearCycle}
                  setYearCycle={setCurrentYearCycle} />
                <YearToYearDatePicker headerText="Next Year"
                  selected={nextYearCycle}
                  name="next-year"
                  minDate={minDate}
                  maxDate={maxDate}
                  setYearCycle={setNextYearCycle} />
              </div>
            </div>
            <button className="p-2 bg-primary w-auto ml-auto block rounded text-white">
              Update Year Cycle
            </button>
          </form>
        </div>
      </div>
    </Tab.Panel>
  )
}

