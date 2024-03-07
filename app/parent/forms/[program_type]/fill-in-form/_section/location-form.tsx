import CustomListbox from "@/app/_components/listbox-custom";
import ListboxIconDropdownOne from "@/app/_components/listbox-icon-dropdown-one";
import { LocationPlace } from "@/models/location";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { useAppSelector } from "@/hooks/redux-hooks";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { locationChanged } from "../_redux/fill-in-form-slice";
import { fieldInputValue } from "@/types/helpers/field-input-value";

export default function LocationForm({
  locations,
}: {
  locations: Partial<LocationPlace>[]
}) {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  return (
    <div className="space-y-4 w-full">
      <div>
        <h1 className="font-medium text-[36px] text-black">Pick A Location</h1>
      </div>
      <div className="w-full relative">
        <CustomListbox value={fillInFormState.fillInForm.location.value ?? ''}
          name='location-place'
          placeholder='Location'
          onChange={(value: any) => { reduxStore.dispatch(locationChanged(fieldInputValue(value))) }}
          items={locations}
          labelText="Location"
          by="id"
          valueClassName={(value: string, placeholder: string) => {
            return `p-2 flex-1 ${value === placeholder ? 'text-secondary-light' : 'text-black'}`
          }}
          listboxDropdownIcon={(open: boolean) => { return (<ListboxIconDropdownOne open={open} />) }}
          keyDescription="registration-form-form-location"
          errorText={fillInFormState.fillInForm.location.errorText}
          validationStatus={fillInFormState.fillInForm.location.validationStatus} />
      </div>
    </div>
  )
}