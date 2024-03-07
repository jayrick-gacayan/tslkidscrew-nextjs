import InputCustom from "@/app/_components/input-custom";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import CustomInputDefault from "@/app/_components/react-datepicker/custom-input-default";
import renderCustomHeaderDefault from "@/app/_components/react-datepicker/render-custom-header-default";
import { ChangeEvent, Fragment, useMemo } from "react";
import { useFillInFormHook } from "../_context/use-fill-in-form-hook";
import PopoverReactDayPicker from "@/app/_components/react-day-picker/popover-day-picker";
import { initChildren } from "../_context/fill-in-form-provider";

let today = new Date();
let defaultDate = new Date(new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()))

export default function ChildrenForm() {
  const {
    state,
    changeFirstname,
    changeLastname,
    changeSchoolAttending,
    addChildren,
    removeChildren,
    changeBirthdate
  } = useFillInFormHook();


  const children = useMemo(() => { return state.fillInForm.children ?? [{ ...initChildren }] }, [state?.fillInForm.children])

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Child&#47;ren&#39;s Information</h1>
        <p>Accepting children {state?.fillInForm?.location?.minimum_age} years old and up at this location.</p>
      </div>
      <div className="w-full space-y-6 h-auto">
        {
          state?.fillInForm?.children.map((val: any, idx: number) => {
            return (
              <Fragment key={`children-form-${idx}`}>
                <div className="p-4 relative rounded border border-secondary-light ">
                  {
                    children.length > 1 &&
                    (
                      <div className="absolute -top-4 -right-3 cursor-pointer bg-danger hover:bg-danger-light h-8 w-8 text-white rounded-full"
                        onClick={() => {
                          removeChildren(idx)
                        }}>
                        <span className="translate-x-3 translate-y-1 block">x</span>
                      </div>
                    )
                  }
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <InputCustom labelText="Firstname"
                        id='children-firstname'
                        name='children[][firstname]'
                        value={val.first_name}
                        type="text"
                        className="bg-secondary p-4 border-transparent"
                        placeholder="Firstname:"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          changeFirstname(idx, event.target.value);
                        }} />
                      <InputCustom labelText="Lastname"
                        id='children-lastname'
                        value={val.last_name}
                        name='children[][lastname]'
                        type="text"
                        className="bg-secondary p-4 border-transparent"
                        placeholder="Lastname:"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          changeLastname(idx, event.target.value);
                        }} />
                    </div>
                    <div className="relative w-full">
                      <div className="relative space-y-1">
                        <div className="font-medium">Start Date</div>
                        <div className="relative w-full">
                          <PopoverReactDayPicker selected={val.birthdate}
                            placeholder="Enter date"
                            inputName='children[][birthdate]'
                            options={{
                              mode: "single",
                              selected: val.birthdate,
                              onSelect: (value: any) => {
                                changeBirthdate(idx, value);
                              },
                              today: val.birthdate,
                            }} />
                        </div>
                      </div>
                    </div>
                    <InputCustom labelText="School Attending"
                      id='children-school-attending'
                      defaultValue={val.school_attending}
                      name='children[][school-attending]'
                      type="text"
                      className="bg-secondary p-4 border-transparent"
                      placeholder="School Attending:"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        changeSchoolAttending(idx, event.target.value);
                      }} />
                  </div>
                </div>
                {
                  idx + 1 === children.length &&
                  (
                    <div onClick={() => {
                      addChildren();
                    }}>
                      <button type='button'
                        className="p-3 text-white w-full rounded bg-primary">Add Child</button>
                    </div>
                  )
                }
              </Fragment>
            )
          })
        }

      </div>
    </div>
  )
}