import CustomListbox from "@/app/_components/listbox-custom";
import ListboxIconDropdownOne from "@/app/_components/listbox-icon-dropdown-one";
import { useFillInFormHook } from "../_context/use-fill-in-form-hook";

let locationItems = [
  {
    id: 1,
    name: 'Albany Daycare'
  },
  {
    id: 2,
    name: 'Clifton Park'
  },
  {
    id: 3,
    name: 'Delmar'
  },
  {
    id: 4,
    name: 'East Greenbush-FUMC',
  },
  {
    id: 5,
    name: 'Gardner Dickinson',
  },
]

export default function LocationForm({ locationState }: { locationState: any }) {
  const { state, setLocation } = useFillInFormHook();

  return (
    <div className="space-y-4 w-full">
      <div>
        <h1 className="font-medium text-[36px] text-black">Pick A Location</h1>
      </div>
      <div className="w-full relative">
        <CustomListbox value={state?.fillInForm?.location}
          name='location-place'
          placeholder='Location'
          onChange={(value: any) => {
            setLocation(value);
          }}
          items={locationItems}
          labelText="Location"
          by="id"
          valueClassName={(value: string, placeholder: string) => {
            return `p-2 flex-1 ${value === placeholder ? 'text-secondary-light' : 'text-black'}`
          }}
          listboxDropdownIcon={(open: boolean) => { return (<ListboxIconDropdownOne open={open} />) }}
          keyDescription="registration-form-form-location"
          errorText={locationState?.errorText}
          validationStatus={locationState?.validationStatus} />
      </div>
    </div>
  )
}