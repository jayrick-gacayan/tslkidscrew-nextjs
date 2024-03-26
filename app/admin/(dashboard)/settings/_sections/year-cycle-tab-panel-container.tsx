import { Tab } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import { ProgramYearCycleSetting } from '@/models/program-year-cycle-setting';
import { addYears, subYears } from 'date-fns';
import YearToYearDatePicker from '../_components/year-to-year-datepicker';
import { useFormState } from 'react-dom';
import { updateProgramYearCycleSettingAction } from '@/actions/program-settings-actions';
import { tagRevalidate } from '@/actions/common-actions';
import { toast, ToastContentProps } from 'react-toastify';
import { ProgramYearCycleSettingFormStateProps } from '@/types/props/program-year-cycle-setting-form-state-props';
import { fieldInputValue } from '@/types/helpers/field-input-value';
import SettingFormSubmit from '../_components/setting-form-submit';

let today = new Date();
let minDate = subYears(today, 1);
let maxDate = addYears(today, 1);

export default function YearCycleTabPanelContainer({
  programYearCycleSetting
}: {
  programYearCycleSetting: ProgramYearCycleSetting | undefined;
}) {
  const cbNextYear = useMemo(() => {
    let currentYear = today.getFullYear();
    let nextYear = currentYear + 1;
    if (programYearCycleSetting) {
      let { current_year_cycle, next_year_cycle } = programYearCycleSetting;
      let splitCurrent = current_year_cycle?.split('-');
      let splitNext = next_year_cycle?.split('-');

      return {
        currentYear: new Date(`${splitCurrent?.[0]}-1-1`),
        nextYear: new Date(`${splitNext?.[0]}-1-1`),
      };
    }


    return {
      currentYear: new Date(`${currentYear}-1-1`),
      nextYear: new Date(`${nextYear}-1-1`),
    };
  }, [programYearCycleSetting])

  const [currentYearCycle, setCurrentYearCycle] = useState<Date | null>(cbNextYear.currentYear);
  const [nextYearCycle, setNextYearCycle] = useState<Date | null>(cbNextYear.nextYear);

  const [state, formAction] = useFormState(
    updateProgramYearCycleSettingAction.bind(null, programYearCycleSetting?.id!),
    {
      'current-year': fieldInputValue(''),
      'next-year': fieldInputValue(''),
    } as ProgramYearCycleSettingFormStateProps
  );

  useEffect(() => {
    async function tagToRevalidate() {
      await tagRevalidate('program-year-cycle-settings');
    }

    if (state.success !== undefined) {
      let { message, success } = state;
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className='text-black'>{message}</div>
        )
      }, {
        toastId: `update-program-setting-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });

      if (success) {
        tagToRevalidate();
      }
    }
  }, [state])

  return (
    <Tab.Panel as='div' id='year-cycle-panel'>
      <div className='space-y-8'>
        <div className='space-y-4'>
          <h1 className='font-medium text-[24px] text-black'>Update Year Cycle</h1>
          <form action={formAction} className='space-y-4'>
            <div className='rounded bg-secondary p-4'>
              <div className='space-y-4 w-[576px]'>
                <YearToYearDatePicker headerText='Current Year'
                  minDate={minDate}
                  maxDate={maxDate}
                  name='current-year'
                  selected={currentYearCycle}
                  setYearCycle={setCurrentYearCycle} />
                <YearToYearDatePicker headerText='Next Year'
                  selected={nextYearCycle}
                  name='next-year'
                  minDate={minDate}
                  maxDate={maxDate}
                  setYearCycle={setNextYearCycle} />
              </div>
            </div>
            <SettingFormSubmit text='Update Year Cycle' />
          </form>
        </div>
      </div>
    </Tab.Panel>
  );
}
