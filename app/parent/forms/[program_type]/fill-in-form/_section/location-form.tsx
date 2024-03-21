import CustomListbox from "@/app/_components/listbox-custom";
import ListboxIconDropdownOne from "@/app/_components/listbox-icon-dropdown-one";
import { LocationPlace } from "@/models/location-place";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { useAppSelector } from "@/hooks/redux-hooks";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { locationChanged } from "../_redux/fill-in-form-slice";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { useMemo } from "react";

export default function LocationForm({
  locations,
}: {
  locations: Partial<LocationPlace>[]
}) {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const { value, errorText, validationStatus } = useMemo(() => {
    return fillInFormState.fillInForm.location;
  }, [fillInFormState.fillInForm.location])

  return (
    <div className="space-y-4 w-full">
      <h1 className="font-bold text-[36px] text-black">Pick A Location</h1>
      <div className="w-full relative">
        <CustomListbox value={value ?? ''}
          name='location-place'
          placeholder='Location'
          onChange={(val: any) => { reduxStore.dispatch(locationChanged(fieldInputValue(val))) }}
          items={locations}
          labelText="Location"
          by="id"
          valueClassName={(value: string, placeholder: string) => {
            return `p-2 flex-1 ${value === placeholder ? 'text-secondary-light' : 'text-black'}`
          }}
          listboxDropdownIcon={(open: boolean) => { return (<ListboxIconDropdownOne open={open} />) }}
          keyDescription="registration-form-form-location"
          errorText={errorText}
          validationStatus={validationStatus} />
      </div>
    </div>
  )
}