import CustomListbox from "@/app/_components/listbox-custom";
import ListboxIconDropdownOne from "@/app/_components/listbox-icon-dropdown-one";
import { useFillInFormHook } from "../_context/use-fill-in-form-hook";
import { LocationPlace } from "@/models/location";
import { ValidationType } from "@/types/enums/validation-type";

export default function LocationForm({
  locations,
}: {
  locations: Partial<LocationPlace>[]
}) {
  const { state, setLocation } = useFillInFormHook();

  return (
    <div className="space-y-4 w-full">
      <div>
        <h1 className="font-medium text-[36px] text-black">Pick A Location</h1>
      </div>
      <div className="w-full relative">
        <CustomListbox value={state?.fillInForm?.location?.value}
          name='location-place'
          placeholder='Location'
          onChange={(value: any) => {
            setLocation({ value: value, errorText: '', validationStatus: ValidationType.NONE });
          }}
          items={locations}
          labelText="Location"
          by="id"
          valueClassName={(value: string, placeholder: string) => {
            return `p-2 flex-1 ${value === placeholder ? 'text-secondary-light' : 'text-black'}`
          }}
          listboxDropdownIcon={(open: boolean) => { return (<ListboxIconDropdownOne open={open} />) }}
          keyDescription="registration-form-form-location"
          errorText={state?.fillInForm?.location?.errorText}
          validationStatus={state?.fillInForm?.location?.validationStatus} />
      </div>
    </div>
  )
}