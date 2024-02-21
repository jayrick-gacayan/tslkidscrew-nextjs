import { updateSummerCampWeekSettingAction } from "@/actions/program-settings-actions";
import InputCustom from "@/app/_components/input-custom";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import CustomInputDefault from "@/app/_components/react-datepicker/custom-input-default";
import renderCustomHeaderDefault from "@/app/_components/react-datepicker/render-custom-header-default";
import TextareaCustom from "@/app/_components/textarea-custom";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { SummerCampWeekSettingFormStateProps } from "@/types/props/summer-camp-week-setting-form-state-props";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { toast, ToastContentProps } from "react-toastify";
import { pathRevalidate } from "@/actions/common-actions";

export default function SummerCampWeekSettingForm({
  weekData,
  weekStr,
  setWeekStr,
}: {
  weekData: SummerCampWeekSetting | undefined;
  weekStr: string;
  setWeekStr: Dispatch<SetStateAction<string>>
}) {
  const [startDate, setStartDate] = useState<Date | null>(!!weekData?.start_date ? new Date(weekData.start_date) : null)
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(
    updateSummerCampWeekSettingAction.bind(null, weekData?.id!), {
      ['week-name']: fieldInputValue(weekData?.name ?? ''),
      ['week-start-date']: !!startDate ? format(new Date(startDate), `yyyy-MM-dd`) : '',
      ['week-capacity']: fieldInputValue(weekData?.capacity?.toString() ?? ''),
      ['week-notes']: weekData?.notes ?? ''
    } as SummerCampWeekSettingFormStateProps);

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


      if (success) {
        pathToRevalidate();
      }
    }
  }, [
    state?.message,
    state?.success
  ])

  return (
    <>
      <div className="flex sm:flex-row flex-col items-start gap-2 sm:items-center w-full">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Weeks</h1>
        </div>
        <div className="flex-none sm:w-auto w-full">
          <div className="flex w-full sm:w-72 items-center gap-2">
            <div className="w-full">
              <InputCheckboxCustom labelText="Enabled"
                id={`${weekStr}-summer-camp-week-setting`}
                name="week-enabled"
                form="summer-camp-week-setting-form"
                defaultChecked={weekData?.enabled ?? false}
              />
            </div>
            <div className="relative w-full">
              {/* <CustomListbox value={weekStr}
                name='week_number'
                placeholder='Week Number'
                items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((numVal) => { return 'week-' + numVal; })}
                onChange={(value: any) => { setWeekStr(value); }}
                listButtonClassName="bg-primary text-white p-2" /> */}
              <Listbox value={weekStr} onChange={(value: string) => { setWeekStr(value) }}>
                <Listbox.Button
                  as="div"
                  className="bg-primary rounded text-white flex items-center w-full justify-between">
                  {
                    ({ open }) => {
                      return (
                        <>
                          <div className="px-3 py-2">{capitalCase(noCase(weekStr))}</div>
                          <div className="px-3 py-2">
                            <Fa6SolidChevronDown className={`fill-white transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                          </div>
                        </>
                      )
                    }
                  }
                </Listbox.Button>
                <Transition enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0">
                  <Listbox.Options as='div'
                    className="absolute top-[105%] left-0 w-full bg-white rounded drop-shadow overflow-hidden">
                    {
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((numVal) => { return 'week-' + numVal; })
                        .map((value: any, index: any) => (
                          <Listbox.Option
                            as='div'
                            key={`show-week-rates-summer-camps-${value}${index}`}
                            className={({ selected, active }) => {
                              return `px-3 py-2 hover:cursor-pointer hover:bg-primary hover:text-white ${selected ? 'bg-primary text-white' : 'bg-white text-black'}`
                            }}
                            value={value}>
                            {capitalCase(noCase(value))}
                          </Listbox.Option>
                        ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
      <form action={formAction} id="summer-camp-week-setting-form" className="space-y-4">
        <div className="block bg-secondary p-4">
          <div className="w-full md:w-8/12 block space-y-4">
            <InputCustom labelText="Name"
              id='week-name'
              name='week-name'
              type="text"
              className="bg-white p-2 px-3"
              placeholder="Week Name:"
              defaultValue={weekData?.name ?? ''}
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
              defaultValue={weekData?.capacity ?? ''}
              errorText={state?.['week-capacity']?.errorText}
              validationStatus={state?.['week-capacity']?.validationStatus} />
            <TextareaCustom labelText="Notes"
              id='week-name-notes'
              name='week-notes'
              className="bg-white"
              placeholder='Enter your note/s here:'
              rows={7}
              defaultValue={weekData?.notes ?? ''} />
          </div>
        </div>
        <div className="w-fit ml-auto block">
          <button className="bg-primary text-white p-2 rounded disabled:cursor-not-allowed"
            disabled={pending}>
            {pending ? '...Processing' : 'Update Week Prices'}
          </button>
        </div>
      </form>
    </>

  )
}