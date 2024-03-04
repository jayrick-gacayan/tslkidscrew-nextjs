import { updateSummerCampWeekSettingAction } from "@/actions/program-settings-actions";
import InputCustom from "@/app/_components/input-custom";
import TextareaCustom from "@/app/_components/textarea-custom";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { format } from "date-fns";
import { SummerCampWeekSettingFormStateProps } from "@/types/props/summer-camp-week-setting-form-state-props";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { toast, ToastContentProps } from "react-toastify";
import { pathRevalidate } from "@/actions/common-actions";
import PopoverReactDayPicker from "@/app/_components/react-day-picker/popover-day-picker";
import SettingFormSubmit from "../_components/setting-form-submit";

export default function SummerCampWeekSettingForm({
  weekData,
}: {
  weekData: SummerCampWeekSetting | undefined;
}) {
  const [startDate, setStartDate] = useState<Date | undefined>(!!weekData?.start_date ? new Date(weekData.start_date) : undefined)
  const [dataWeek, setDataWeek] = useState({
    'week-name': weekData?.name ?? '',
    'week-capacity': weekData?.capacity?.toString() ?? '',
    'week-notes': weekData?.notes ?? ''
  });

  const [state, formAction] = useFormState(
    updateSummerCampWeekSettingAction.bind(null, weekData?.id!),
    {
      'week-name': fieldInputValue(weekData?.name ?? ''),
      'week-start-date': !!startDate ? format(new Date(startDate), `yyyy-MM-dd`) : '',
      'week-capacity': fieldInputValue(weekData?.capacity?.toString() ?? ''),
      'week-notes': weekData?.notes ?? ''
    } as SummerCampWeekSettingFormStateProps);

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
          <div className="space-y-1 w-full">
            <div className="font-medium">Start Date</div>
            <div className="relative w-full">
              <PopoverReactDayPicker selected={startDate}
                placeholder="Enter date"
                inputName='week-start-date'
                options={{
                  mode: "single",
                  selected: startDate,
                  onSelect: setStartDate,
                  today: startDate,
                }} />
            </div>
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
      <SettingFormSubmit text='Update Week' />
    </form>
  )
}