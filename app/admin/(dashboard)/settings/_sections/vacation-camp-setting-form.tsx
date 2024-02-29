import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addYears } from "date-fns";
import InputCustom from "@/app/_components/input-custom";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import { renderCustomHeaderYearOnly } from "@/app/_components/react-datepicker/render-custom-header-year-only";
import { renderMonthContent } from "@/app/_components/react-datepicker/render-month-content";
import DatePicker from "react-datepicker";
import { VacationCampSetting } from "@/models/vacation-camp-setting";
import ListboxIconDropdownTwo from "@/app/_components/listbox-icon-dropdown-two";
import CustomListbox from "@/app/_components/listbox-custom";
import DatepickerMonthYearInputCustom from '@/app/_components/react-datepicker/datepicker-month-year-custom-input';
import { parse, format } from 'date-fns';
import { toFirstUpperCase } from "@/types/helpers/string-helpers";
import { VacationCampSettingFormStateProps } from "@/types/props/vacation-camp-setting-form-state-props";
import { updateVacationCampSettingAction } from "@/actions/program-settings-actions";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import PopoverReactDayPicker from "@/app/_components/react-day-picker/popover-day-picker";
import { pathRevalidate } from "@/actions/common-actions";
import { toast, ToastContentProps } from "react-toastify";

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

  const [daysSelection, setDaysSelection] = useState<Date[] | undefined>(
    arrDays.length === 0 ? [today] :
      arrDays.map((value: any) => {
        return cbParseDate(value.toString(), 'yyyy-MMMM-d')
      })
  );

  const [state, formAction] = useFormState(
    updateVacationCampSettingAction.bind(null, vacationCampData?.id!),
    {
      'vacation-camp-name': fieldInputValue(''),
      'vacation-camp-capacity': fieldInputValue(''),
    } as VacationCampSettingFormStateProps
  )
  const { pending } = useFormStatus();
  const [monthYearDate, setMonthYearDate] = useState<Date | null>(cbParseDate());

  useEffect(() => {
    setDataVacationCamp({
      'vacation-camp-name': vacationCampData?.name ?? '',
      'vacation-camp-capacity': vacationCampData?.capacity?.toString() ?? ''
    })

    setMonthYearDate(cbParseDate());

    setDaysSelection(
      arrDays.length === 0 ? [today] :
        arrDays.map((value: any) => {
          return cbParseDate(value.toString(), 'yyyy-MMMM-d')
        })
    )

  }, [vacationCampData, arrDays, cbParseDate]);

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
        toastId: `update-vacation-setting-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });

      if (success) {
        pathToRevalidate();
      }
    }
  }, [state])

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
                  defaultValue={dataVacationCamp["vacation-camp-name"]}
                  errorText={state["vacation-camp-name"]?.errorText}
                  validationStatus={state["vacation-camp-name"]?.validationStatus} />
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
                  defaultValue={dataVacationCamp["vacation-camp-capacity"]}
                  errorText={state["vacation-camp-capacity"]?.errorText}
                  validationStatus={state["vacation-camp-capacity"]?.validationStatus} />
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
              <div className="w-full lg:flex-1">
                <PopoverReactDayPicker selected={daysSelection}
                  placeholder="Enter date"
                  inputName='vacation-camp-dates'
                  options={{
                    mode: "multiple",
                    defaultMonth: monthYearDate ?? undefined,
                    selected: daysSelection,
                    onSelect: (dates: Date[]) => {
                      console.log('date', dates.sort((a, b) => {
                        return a.getTime() - b.getTime();
                      }))
                      setDaysSelection(dates)
                    }
                  }} />
                {
                  state["vacation-camp-dates"]?.errorText &&
                  <div className="text-danger">You must select at least one date.</div>
                }
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