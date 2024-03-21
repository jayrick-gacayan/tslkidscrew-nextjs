import InputCustom from "@/app/_components/input-custom";
import { ChangeEvent, useMemo } from "react";
import PopoverReactDayPicker from "@/app/_components/react-day-picker/popover-day-picker";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { ChildInfoType } from "@/types/input-types/child-info-type";
import {
  childrenAdded,
  childrenFieldUpdated,
  childrenRemoved
} from "../_redux/fill-in-form-slice";

export default function ChildrenForm() {
  const fillInFormState = useAppSelector((state: RootState) => { return state.fillInForm; });

  const arrChildren = useMemo(() => {
    return fillInFormState.fillInForm.childrenArr
  }, [fillInFormState.fillInForm.childrenArr])

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-bold text-[36px]">Child&#47;ren&#39;s Information</h1>
        <p>Accepting children {fillInFormState.fillInForm.location.value?.minimum_age} years old and up at this location.</p>
      </div>
      <div className="w-full h-auto space-y-6">

        {
          arrChildren.map((value: ChildInfoType, idx: number) => {
            return (
              <div key={`children-form-${idx}`} className="space-y-6 w-full h-auto">
                <div className="p-4 relative rounded border border-secondary-light ">
                  {
                    arrChildren.length > 1 &&
                    (
                      <div className="absolute -top-4 -right-3 cursor-pointer bg-danger hover:bg-danger-light h-8 w-8 text-white rounded-full"
                        onClick={() => { reduxStore.dispatch(childrenRemoved(idx)) }}>
                        <span className="translate-x-3 translate-y-1 block">x</span>
                      </div>
                    )
                  }
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <InputCustom labelText="First Name"
                        id={`children-firstname-${idx}`}
                        name={`children[][firstname]`}
                        type="text"
                        className="bg-secondary p-4 border-transparent"
                        placeholder="Firstname:"
                        value={value.first_name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          reduxStore.dispatch(childrenFieldUpdated({
                            index: idx,
                            key: "first_name",
                            value: e.target.value
                          }))
                        }} />
                      <InputCustom labelText="Last Name"
                        name='children[][lastname]'
                        type="text"
                        className="bg-secondary p-4 border-transparent"
                        placeholder="Lastname:"
                        value={value.last_name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          reduxStore.dispatch(childrenFieldUpdated({
                            index: idx,
                            key: "last_name",
                            value: e.target.value
                          }))
                        }} />
                    </div>
                    <div className="relative w-full">
                      <div className="relative space-y-1">
                        <div className="font-medium">Start Date</div>
                        <div className="relative w-full">
                          <PopoverReactDayPicker placeholder="Enter date"
                            selected={value.birthdate ? new Date(value.birthdate) : undefined}
                            inputName='children[][birthdate]'
                            options={{
                              mode: "single",
                              selected: value.birthdate ? new Date(value.birthdate) : undefined,
                              onSelect: (value: any) => {
                                reduxStore.dispatch(childrenFieldUpdated({
                                  index: idx,
                                  key: "birthdate",
                                  value: value.toISOString()
                                }))
                              },
                              today: value.birthdate ? new Date(value.birthdate) : undefined,
                            }} />
                        </div>
                      </div>
                    </div>
                    <InputCustom labelText="School Attending"
                      id={`children-school-attending-${idx}`}
                      name='children[][school-attending]'
                      type="text"
                      className="bg-secondary p-4 border-transparent"
                      placeholder="School Attending:"
                      value={value.school_attending}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        reduxStore.dispatch(childrenFieldUpdated({
                          index: idx,
                          key: "school_attending",
                          value: e.target.value
                        }))
                      }} />
                  </div>
                </div>
                {
                  idx + 1 === arrChildren.length &&
                  (
                    <div onClick={() => { reduxStore.dispatch(childrenAdded()) }}>
                      <button type='button'
                        className="p-3 text-white w-full rounded bg-primary">Add Child</button>
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}