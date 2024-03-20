import { updateSummerCampWeekSettingAction } from '@/actions/program-settings-actions';
import InputCustom from '@/app/_components/input-custom';
import TextareaCustom from '@/app/_components/textarea-custom';
import { SummerCampWeekSetting } from '@/models/summer-camp-week-setting';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { format } from 'date-fns';
import { SummerCampWeekSettingFormStateProps } from '@/types/props/summer-camp-week-setting-form-state-props';
import { fieldInputValue } from '@/types/helpers/field-input-value';
import { toast, ToastContentProps } from 'react-toastify';
import { tagRevalidate } from '@/actions/common-actions';
import PopoverReactDayPicker from '@/app/_components/react-day-picker/popover-day-picker';
import SettingFormSubmit from '../_components/setting-form-submit';
import InputCheckboxCustom from '@/app/_components/input-checkbox-custom';
import SettingListboxCustom from '../_components/setting-custom-lisbox';

export default function SummerCampWeekSettingForm({
  weekData,
  weekStr,
  setWeekStr,
}: {
  weekData: SummerCampWeekSetting | undefined;
  weekStr: string;
  setWeekStr: Dispatch<SetStateAction<string>>
}) {
  const [startDate, setStartDate] = useState<Date | undefined>(!!weekData?.start_date ? new Date(weekData.start_date) : undefined)
  const [dataWeek, setDataWeek] = useState({
    'week-name': weekData?.name ?? '',
    'week-capacity': weekData?.capacity?.toString() ?? '',
    'week-notes': weekData?.notes ?? '',
    'week-enabled': weekData?.enabled === undefined ? false : weekData?.enabled
  });

  const [state, formAction] = useFormState(
    updateSummerCampWeekSettingAction.bind(null, weekData?.id!),
    {
      'week-name': fieldInputValue(weekData?.name ?? ''),
      'week-start-date': !!startDate ? format(new Date(startDate), `yyyy-MM-dd`) : '',
      'week-capacity': fieldInputValue(weekData?.capacity?.toString() ?? ''),
      'week-notes': weekData?.notes ?? '',
      'week-enabled': weekData?.enabled === undefined ? false : weekData?.enabled,
    } as SummerCampWeekSettingFormStateProps);

  useEffect(() => {
    setDataWeek({
      'week-name': weekData?.name ?? '',
      'week-capacity': weekData?.capacity?.toString() ?? '',
      'week-notes': weekData?.notes ?? '',
      'week-enabled': weekData?.enabled === undefined ? false : weekData?.enabled,
    })
  }, [weekData]);

  useEffect(() => {
    async function tagToRevalidate() {
      await tagRevalidate('summer-camp-week-settings')
    }

    if (state.success !== undefined) {
      let { message, success } = state;
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className='text-black'>{message}</div>
        )
      }, {
        toastId: `update-summer-camp-week-setting-success-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });


      tagToRevalidate();
    }
  }, [state])

  function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    console.log('event')
    if (name !== 'week-enabled') {
      setDataWeek({
        ...dataWeek,
        [name]: value,
      })
    }
    else {
      setDataWeek({
        ...dataWeek,
        'week-enabled': (event.target as HTMLInputElement).checked,
      })
    }
  }

  return (
    <>
      <div className='flex sm:flex-row flex-col items-start gap-2 sm:items-center w-full'>
        <div className='flex-1'>
          <h1 className='font-medium text-[24px] text-black'>Update Weeks</h1>
        </div>
        <div className='flex-none sm:w-auto w-full'>
          <div className='flex w-full sm:w-72 items-center gap-2'>
            <div className='w-full'>
              <InputCheckboxCustom labelText='Enabled'
                id={`${weekStr}-summer-camp-week-setting`}
                name='week-enabled'
                checked={dataWeek['week-enabled']}
                onChange={handleOnChange}
                form='summer-camp-week-setting-form' />
            </div>
            <SettingListboxCustom listboxData={weekStr}
              onChangeListbox={(value: any) => { setWeekStr(value) }}
              items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((numVal) => { return 'week-' + numVal; })}
              keyDescription='show-week-rates-summer-camps' />
          </div>
        </div>
      </div>
      <form action={formAction} id='summer-camp-week-setting-form' className='space-y-4'>
        <div className='block bg-secondary p-4'>
          <div className='w-full md:w-8/12 block space-y-4'>
            <InputCustom labelText='Name'
              type='text'
              name='week-name'
              id='week-name'
              className='bg-white p-2 px-3'
              placeholder='Week Name:'
              value={dataWeek['week-name']}
              onChange={handleOnChange}
              errorText={state?.['week-name']?.errorText}
              validationStatus={state?.['week-name']?.validationStatus} />
            <div className='space-y-1 w-full'>
              <div className='font-medium'>Start Date</div>
              <div className='relative w-full'>
                <PopoverReactDayPicker selected={startDate}
                  placeholder='Enter date'
                  inputName='week-start-date'
                  options={{
                    mode: 'single',
                    selected: startDate,
                    onSelect: setStartDate,
                    today: startDate,
                  }} />
              </div>
            </div>
            <InputCustom labelText='Capacity'
              id='week-capacity'
              name='week-capacity'
              type='text'
              className='bg-white p-2 px-3'
              placeholder='Capacity:'
              inputMode='numeric'
              value={dataWeek['week-capacity']}
              onChange={handleOnChange}
              errorText={state?.['week-capacity']?.errorText}
              validationStatus={state?.['week-capacity']?.validationStatus} />
            <TextareaCustom labelText='Notes'
              id='week-name-notes'
              name='week-notes'
              className='bg-white'
              placeholder='Enter your note/s here:'
              rows={7}
              value={dataWeek['week-notes']}
              onChange={handleOnChange} />
          </div>
        </div>
        <SettingFormSubmit text='Update Week' />
      </form>
    </>
  )
}