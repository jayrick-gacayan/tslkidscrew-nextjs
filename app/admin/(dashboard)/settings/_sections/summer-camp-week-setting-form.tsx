import { updateSummerCampWeekSettingAction } from "@/actions/program-settings-actions";
import InputCustom from "@/app/_components/input-custom";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import CustomInputDefault from "@/app/_components/react-datepicker/custom-input-default";
import renderCustomHeaderDefault from "@/app/_components/react-datepicker/render-custom-header-default";
import TextareaCustom from "@/app/_components/textarea-custom";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { SummerCampWeekSettingFormStateProps } from "@/types/props/summer-camp-week-setting-form-state-props";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { toast, ToastContentProps } from "react-toastify";
import { pathRevalidate } from "@/actions/common-actions";

export default function SummerCampWeekSettingForm({
  weekData,
}: {
  weekData: SummerCampWeekSetting | undefined;
}) {
  const [startDate, setStartDate] = useState<Date | null>(!!weekData?.start_date ? new Date(weekData.start_date) : null)
  const [dataWeek, setDataWeek] = useState({
    'week-name': weekData?.name ?? '',
    'week-capacity': weekData?.capacity?.toString() ?? '',
    'week-notes': weekData?.notes ?? ''
  });

  const [state, formAction] = useFormState(
    updateSummerCampWeekSettingAction.bind(null, weekData?.id!),
    {
      ['week-name']: fieldInputValue(weekData?.name ?? ''),
      ['week-start-date']: !!startDate ? format(new Date(startDate), `yyyy-MM-dd`) : '',
      ['week-capacity']: fieldInputValue(weekData?.capacity?.toString() ?? ''),
      ['week-notes']: weekData?.notes ?? ''
    } as SummerCampWeekSettingFormStateProps);
  const { pending } = useFormStatus();

  useEffect(() => {
    setDataWeek({
      'week-name': weekData?.name ?? '',
      'week-capacity': weekData?.capacity?.toString() ?? '',
      'week-notes': weekData?.notes ?? ''
    })
  }, [weekData]);

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
        toastId: `update-summer-camp-week-setting-success-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });


      pathToRevalidate();
    }
  }, [state])

  function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    setDataWeek({
      ...dataWeek,
      [name]: value,
    })
  }

  return (
    <form action={formAction} id="summer-camp-week-setting-form" className="space-y-4">
      <div className="block bg-secondary p-4">
        <div className="w-full md:w-8/12 block space-y-4">
          <InputCustom labelText="Name"
            type="text"
            name='week-name'
            id='week-name'
            className="bg-white p-2 px-3"
            placeholder="Week Name:"
            value={dataWeek["week-name"]}
            onChange={handleOnChange}
            errorText={state?.['week-name']?.errorText}
            validationStatus={state?.['week-name']?.validationStatus} />
          <div className="space-y-1 w-full relative ">
            <div className="font-medium">Start Date</div>
            <DatePicker selected={startDate}
              name="week-start-date"
              value={!!startDate ? format(new Date(startDate), `yyyy-MM-dd`) : ''}
              customInput={<CustomInputDefault className='bg-white' />}
              onChange={(date) => { setStartDate(date); }}
              calendarContainer={calendarContainer}
              renderCustomHeader={renderCustomHeaderDefault}
              formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)} />
          </div>
          <InputCustom labelText="Capacity"
            id='week-capacity'
            name='week-capacity'
            type="text"
            className="bg-white p-2 px-3"
            placeholder="Capacity:"
            inputMode="numeric"
            value={dataWeek["week-capacity"]}
            onChange={handleOnChange}
            errorText={state?.['week-capacity']?.errorText}
            validationStatus={state?.['week-capacity']?.validationStatus} />
          <TextareaCustom labelText="Notes"
            id='week-name-notes'
            name='week-notes'
            className="bg-white"
            placeholder='Enter your note/s here:'
            rows={7}
            value={dataWeek["week-notes"]}
            onChange={handleOnChange} />
        </div>
      </div>
      <div className="w-fit ml-auto block">
        <button className="bg-primary text-white p-2 rounded disabled:cursor-not-allowed"
          disabled={pending}>
          {pending ? '...Processing' : 'Update Week Prices'}
        </button>
      </div>
    </form>
  )
}