import PopoverReactDayPicker from "@/app/_components/react-day-picker/popover-day-picker";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { useFillInFormHook } from "../_context/use-fill-in-form-hook";
import { ValidationType } from "@/types/enums/validation-type";

let today = new Date();

export default function RegistrationTypeSelectionBeforeOrAfterSchool() {
  const { state, setWeekDayBOAS, setStartDate } = useFillInFormHook();

  return (
    <div className="space-y-8">
      <h1 className="font-medium text-[36px]">Registration Type Selection</h1>
      <div className="space-y-6">
        <div className="relative space-y-1">
          <div className="font-medium">Start Date</div>
          <div className="relative w-full">
            <PopoverReactDayPicker selected={state?.fillInForm?.startDate?.value ?? undefined}
              placeholder="Enter date"
              inputName='before-or-after-registration-start-date'
              options={{
                mode: "single",
                selected: state?.fillInForm?.startDate?.value ?? undefined,
                onSelect: (date: any) => {
                  setStartDate({ value: date, errorText: '', validationStatus: ValidationType.NONE });
                },
                today: today,
              }} />
          </div>
        </div>
        <div className="space-y-6">
          <div className='block space-y-2'>
            <h4 className="font-medium">Before School:</h4>
            <div className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
              <InputCheckboxCustom labelText="Monday"
                id='before-school-monday'
                name='before-school[]'
                checked={state?.fillInForm?.beforeOrAfterWeekDays?.value?.beforeSchool?.includes('Monday') ?? false}
                value='Monday'
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'beforeSchool',
                    value: e.target.value
                  })
                }}
              />
              <InputCheckboxCustom labelText="Tuesday"
                id='before-school-tuesday'
                name='before-school[]'
                value='Tuesday'
                checked={state?.fillInForm?.beforeOrAfterWeekDays?.value?.beforeSchool?.includes('Tuesday') ?? false}
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'beforeSchool',
                    value: e.target.value
                  })
                }}
              />
              <InputCheckboxCustom labelText="Wednesday"
                id='before-school-wednesday'
                name='before-school[]'
                value='Wednesday'
                checked={state?.fillInForm?.beforeOrAfterWeekDays?.value?.beforeSchool?.includes('Wednesday') ?? false}
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'beforeSchool',
                    value: e.target.value
                  })
                }} />
              <InputCheckboxCustom labelText="Thursday"
                id='before-school-thursday'
                name='before-school[]'
                value='Thursday'
                checked={state?.fillInForm?.beforeOrAfterWeekDays?.value?.beforeSchool?.includes('Thursday') ?? false}
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'beforeSchool',
                    value: e.target.value
                  })
                }} />
              <InputCheckboxCustom labelText="Friday"
                id='before-school-friday'
                name='before-school[]'
                value='Friday'
                checked={state?.fillInForm?.beforeOrAfterWeekDays?.value?.beforeSchool?.includes('Friday') ?? false}
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'beforeSchool',
                    value: e.target.value
                  })
                }} />
            </div>

          </div>
          <div className='block space-y-2'>
            <h4 className="font-medium">After School:</h4>
            <div className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
              <InputCheckboxCustom labelText="Monday"
                id='after-school-monday'
                name='after-school[]'
                checked={state?.fillInForm?.afterSchool?.includes('Monday') ?? false}
                value='Monday'
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'afterSchool',
                    value: e.target.value
                  })
                }}
              />
              <InputCheckboxCustom labelText="Tuesday"
                id='after-school-tuesday'
                name='after-school[]'
                value='Tuesday'
                checked={state?.fillInForm?.afterSchool?.includes('Tuesday') ?? false}
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'afterSchool',
                    value: e.target.value
                  })
                }}
              />
              <InputCheckboxCustom labelText="Wednesday"
                id='after-school-wednesday'
                name='after-school[]'
                value='Wednesday'
                checked={state?.fillInForm?.afterSchool?.includes('Wednesday') ?? false}
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'afterSchool',
                    value: e.target.value
                  })
                }} />
              <InputCheckboxCustom labelText="Thursday"
                id='after-school-thursday'
                name='after-school[]'
                value='Thursday'
                checked={state?.fillInForm?.afterSchool?.includes('Thursday') ?? false}
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'afterSchool',
                    value: e.target.value
                  })
                }} />
              <InputCheckboxCustom labelText="Friday"
                id='after-school-friday'
                name='after-school[]'
                value='Friday'
                checked={state?.fillInForm?.afterSchool?.includes('Friday') ?? false}
                onChange={(e) => {
                  setWeekDayBOAS({
                    type: 'afterSchool',
                    value: e.target.value
                  })
                }} />
            </div>
          </div>

          {
            state?.fillInForm?.beforeOrAfterWeekDays?.errorText !== '' &&
            (<div className="text-danger">
              {state?.fillInForm?.beforeOrAfterWeekDays?.errorText}
            </div>)
          }
        </div>
      </div>
    </div>
  )
}