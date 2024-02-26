import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addYears } from "date-fns";
import InputCustom from "@/app/_components/input-custom";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import calendarContainerRange from "@/app/_components/react-datepicker/calendar-container-range";
import renderCustomHeaderRange from "@/app/_components/react-datepicker/render-custom-header-range";
import { renderCustomHeaderYearOnly } from "@/app/_components/react-datepicker/render-custom-header-year-only";
import renderDayContents from "@/app/_components/react-datepicker/render-day-contents";
import { renderMonthContent } from "@/app/_components/react-datepicker/render-month-content";
import DatePicker from "react-datepicker";
import { VacationCampSetting } from "@/models/vacation-camp-setting";
import ListboxIconDropdownTwo from "@/app/_components/listbox-icon-dropdown-two";
import CustomListbox from "@/app/_components/listbox-custom";
import DatepickerCustomInput from "@/app/_components/react-datepicker/datepicker-custom-input-range";
import DatepickerMonthYearInputCustom from '@/app/_components/react-datepicker/datepicker-month-year-custom-input';
import { parse, format } from 'date-fns';
import { toFirstUpperCase } from "@/types/helpers/string-helpers";
import { VacationCampSettingFormStateProps } from "@/types/props/vacation-camp-setting-form-state-props";
import { updateVacationCampSettingAction } from "@/actions/program-settings-actions";
import { fieldInputValue } from "@/types/helpers/field-input-value";

const today = new Date();
const maxDate = addYears(today, 1);

export default function VacationCampSettingForm({
  vacationCamp,
  setVacationCamp,
  partialVCSettings,
  vacationCampData,
  arrDays,
}: {
  vacationCamp: Partial<VacationCampSetting> | undefined;
  setVacationCamp: Dispatch<SetStateAction<Partial<VacationCampSetting> | undefined>>;
  partialVCSettings: Partial<VacationCampSetting>[];
  vacationCampData: VacationCampSetting | undefined;
  arrDays: any[];
}) {
  const [dataVacationCamp, setDataVacationCamp] = useState({
    'vacation-camp-name': vacationCampData?.name ?? '',
    'vacation-camp-capacity': vacationCampData?.capacity?.toString() ?? ''
  });

  const cbParseDate = useCallback((dateStr?: string, formatParse: string = 'yyyy-MMMM') => {
    let strDate = `${vacationCampData?.year?.toString()}-${toFirstUpperCase(vacationCampData?.month ?? '')}`;

    if (dateStr) {
      strDate += `-${dateStr}`
    }

    return parse(strDate, formatParse, new Date());
  }, [
    vacationCampData
  ])
  const [state, formAction] = useFormState(
    updateVacationCampSettingAction.bind(null, vacationCampData?.id!),
    {
      'vacation-camp-name': fieldInputValue(''),
      'vacation-camp-capacity': fieldInputValue(''),
    } as VacationCampSettingFormStateProps
  )
  const { pending } = useFormStatus();
  const [monthYearDate, setMonthYearDate] = useState<Date | null>(cbParseDate());
  const [rangeDate, setRangeDate] = useState<[Date | null, Date | null]>([
    arrDays.length === 0 ? today : cbParseDate(arrDays[0]?.toString(), 'yyyy-MMMM-d'),
    arrDays.length === 0 ? today : cbParseDate(arrDays[arrDays.length - 1]?.toString(), 'yyyy-MMMM-d'),
  ]);

  useEffect(() => {
    setDataVacationCamp({
      'vacation-camp-name': vacationCampData?.name ?? '',
      'vacation-camp-capacity': vacationCampData?.capacity?.toString() ?? ''
    })

    setMonthYearDate(cbParseDate());

    setRangeDate([
      arrDays.length === 0 ? today : cbParseDate(arrDays[0]?.toString(), 'yyyy-MMMM-d'),
      arrDays.length === 0 ? today : cbParseDate(arrDays[arrDays.length - 1]?.toString(), 'yyyy-MMMM-d'),
    ])
  }, [vacationCampData]);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setDataVacationCamp({
      ...dataVacationCamp,
      [name]: value,
    })
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Schedules</h1>
        </div>
        <div className="flex-none sm:w-56 w-full">
          <CustomListbox value={vacationCamp}
            onChange={(value: any) => { setVacationCamp(value); }}
            items={partialVCSettings}
            by="id"
            listButtonClassName="bg-primary rounded text-white flex items-center p-0 w-full justify-between"
            valueClassName={(value: string, placeholder: string) => { return `p-2` }}
            listboxDropdownIcon={(open: boolean) => { return (<ListboxIconDropdownTwo open={open} />) }}
            keyDescription="vacation-camp-settings" />
        </div>
      </div>
      <form action={formAction} className="space-y-4">
        <div className="block bg-secondary p-4">
          <div className="w-full xxl:w-5/12 block space-y-4">
            <div className="flex sm:flex-row flex-col items-start sm:items-center gap-2 w-full">
              <div className="basis-full sm:basis-5/12">
                <p className="font-semibold text-black">Name</p>
              </div>
              <div className="w-full sm:flex-1">
                <InputCustom id='schedule-name'
                  name='vacation-camp-name'
                  type="text"
                  className="bg-white p-2 px-3"
                  placeholder="Name:"
                  value={dataVacationCamp["vacation-camp-name"]}
                  onChange={handleOnChange} />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-start sm:items-center gap-2">
              <div className="basis-full sm:basis-5/12">
                <p className="font-semibold text-black">Capacity</p>
              </div>
              <div className="w-full sm:flex-1">
                <InputCustom id='schedule-capacity'
                  name='vacation-camp-capacity'
                  type="text"
                  inputMode="numeric"
                  className="bg-white p-2 px-3"
                  placeholder="Capacity:"
                  value={dataVacationCamp["vacation-camp-capacity"]}
                  onChange={handleOnChange} />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-start sm:items-center gap-2">
              <div className="basis-full sm:basis-5/12">
                <p className="font-semibold text-black">Month and Year</p>
              </div>
              <div className="w-full sm:flex-1">
                <DatePicker selected={monthYearDate}
                  name='vacation-camp-month-year-date'
                  value={!!monthYearDate ? format(new Date(monthYearDate), 'MMMM yyyy') : ''}
                  customInput={<DatepickerMonthYearInputCustom />}
                  onChange={(date) => { setMonthYearDate(date) }}
                  maxDate={maxDate}
                  popperClassName="z-50"
                  calendarContainer={calendarContainer}
                  renderCustomHeader={renderCustomHeaderYearOnly}
                  renderMonthContent={renderMonthContent}
                  formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
                  showMonthYearPicker />
              </div>
            </div>
            <div className="flex lg:flex-row flex-col items-start lg:items-center gap-2">
              <div className="basis-full lg:basis-5/12">
                <p className="font-semibold text-black">Date</p>
              </div>
              <div className="w-full lg:flex-1 relative">
                <DatePicker selected={rangeDate[0]}
                  name='vacation-camp-date-range'
                  selectsRange
                  monthsShown={2}
                  customInput={<DatepickerCustomInput />}
                  onChange={(date) => { setRangeDate(date) }}
                  startDate={rangeDate[0]}
                  endDate={rangeDate[1]}
                  calendarContainer={calendarContainerRange}
                  showPreviousMonths
                  formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
                  renderDayContents={renderDayContents}
                  renderCustomHeader={renderCustomHeaderRange} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-fit ml-auto block">
          <button className="bg-primary text-white p-2 rounded disabled:cursor-not-allowed"
            disabled={pending}>
            {pending ? '...Processing' : 'Update Schedule'}
          </button>
        </div>
      </form>
    </div>
  )
}