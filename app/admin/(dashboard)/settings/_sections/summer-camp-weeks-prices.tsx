import InputCustom from "@/app/_components/input-custom";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import CustomInputDefault from "@/app/_components/react-datepicker/custom-input-default";
import renderCustomHeaderDefault from "@/app/_components/react-datepicker/render-custom-header-default";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import TextareaCustom from "@/app/_components/textarea-custom";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { AdminSettingsState } from "../_redux/admin-settings-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import {
  summerCampWeekSettingCapacityChanged,
  summerCampWeekSettingEnabledSet,
  summerCampWeekSettingFormSubmit,
  summerCampWeekSettingNameChanged,
  summerCampWeekSettingNotesSet,
  summerCampWeekSettingRequestStatusSet,
  summerCampWeekSettingStartDateSet,
  summerCampWeekSettingWeekChanged
} from "../_redux/admin-settings-slice";
import { RequestStatus } from "@/types/enums/request-status";
import { format } from "date-fns";
import CustomListbox from "@/app/_components/listbox-custom";

import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { useFormState, useFormStatus } from "react-dom";
import { updateSummerCampWeekSetting } from "@/actions/program-settings-actions";

export default function SummerCampWeekPrices({
  summerCampWeekSettings
}: {
  summerCampWeekSettings: SummerCampWeekSetting[];
}) {
  const [weekStr, setWeekStr] = useState('week-1');
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(updateSummerCampWeekSetting, {} as any);

  const weekDataMemo = useMemo(() => {
    let weekNumberSplit = weekStr.split('-')[1];
    let weekNumber = parseInt(weekNumberSplit) ?? 1;

    return summerCampWeekSettings.find((value: SummerCampWeekSetting) => {
      return value.week_number === weekNumber
    });
  }, [
    weekStr,
    summerCampWeekSettings
  ])

  const [startDate, setStartDate] = useState<Date | null>(!!weekDataMemo?.start_date ? new Date(weekDataMemo.start_date) : null)

  // const adminSettingsState: AdminSettingsState = useAppSelector((state: RootState) => {
  //   return state.adminSettings;
  // });

  // const {
  //   name,
  //   capacity,
  //   week,
  //   notes,
  //   startDate,
  //   enabled,
  //   requestStatus,
  // } = useMemo(() => {
  //   return adminSettingsState.summerCampWeekSetting
  // }, [adminSettingsState.summerCampWeekSetting]);

  // const pending = useMemo(() => {
  //   return requestStatus === RequestStatus.WAITING || requestStatus === RequestStatus.IN_PROGRESS;
  // }, [requestStatus]);

  // useEffect(() => {
  //   switch (requestStatus) {
  //     case RequestStatus.WAITING:
  //       reduxStore.dispatch(summerCampWeekSettingFormSubmit());
  //       break;
  //   }
  // }, [
  //   requestStatus
  // ])

  return (
    <div className="space-y-4 pt-4">
      <div className="flex sm:flex-row flex-col items-start gap-2 sm:items-center w-full">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Weeks</h1>
        </div>
        <div className="flex-none sm:w-auto w-full">
          <div className="flex w-full sm:w-72 items-center gap-2">
            <div className="w-full">
              {/* <InputCheckboxCustom labelText="Enabled"
                id={`${weekStr}-is-enabled`}
                checked={weekDataMemo?.enabled ?? false}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  reduxStore.dispatch(summerCampWeekSettingEnabledSet(enabled ? false : true))
                }} /> */}
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
      <form action={formAction}>
        <div className="block bg-secondary p-4">
          <div className="w-full md:w-8/12 block space-y-4">
            <InputCustom labelText="Name"
              id='week-name'
              name='week-name'
              type="text"
              className="bg-white p-2 px-3"
              placeholder="Week Name:"
              defaultValue={weekDataMemo?.name ?? ''} />
            <div className="space-y-1 w-full relative ">
              <div className="font-medium">Start Date</div>
              <DatePicker selected={startDate}
                name="start-date"
                value={!!startDate ? format(new Date(startDate), 'yyyy-MM-dd') : ''}
                customInput={<CustomInputDefault className='bg-white' />}
                onChange={(date) => {
                  setStartDate(date);
                }}
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
              defaultValue={weekDataMemo?.capacity ?? ''} />
            <TextareaCustom labelText="Notes"
              id='week-name-notes'
              name='notes'
              className="bg-white"
              placeholder='Enter your note/s here:'
              rows={7}
              defaultValue={weekDataMemo?.notes ?? ''} />
          </div>
        </div>
        <div className="w-fit ml-auto block">
          <button className="bg-primary text-white p-2 rounded disabled:cursor-not-allowed"
            disabled={pending}
            onClick={() => {
              reduxStore.dispatch(summerCampWeekSettingRequestStatusSet(RequestStatus.WAITING));
            }}>
            {pending ? '...Processing' : 'Update Week Prices'}
          </button>
        </div>
      </form>
    </div>
  )
}