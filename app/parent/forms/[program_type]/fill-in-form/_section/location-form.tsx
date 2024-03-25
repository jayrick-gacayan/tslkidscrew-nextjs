import CustomListbox from '@/app/_components/listbox-custom';
import ListboxIconDropdownOne from '@/app/_components/listbox-icon-dropdown-one';
import { LocationPlace } from '@/models/location-place';
import { InputProps } from '@/types/props/input-props';

export default function LocationForm({
  locations,
  locationValue,
  onChange,
}: {
  locations: Partial<LocationPlace>[];
  locationValue: InputProps<Partial<LocationPlace> | undefined>;
  onChange: (val: any) => void;
}) {

  return (
    <div className='space-y-4 flex-1 w-full'>
      <h1 className='font-bold text-[36px] text-black'>Pick A Location</h1>
      <div className='w-full relative'>
        <CustomListbox value={locationValue.value ?? ''}
          name='location-place'
          placeholder=''
          onChange={onChange}
          items={locations}
          labelText='Location'
          by='id'
          valueClassName={(value: string, placeholder: string) => {
            return `p-2 flex-1 ${value === placeholder ? 'text-secondary-light' : 'text-black'}`
          }}
          listboxDropdownIcon={(open: boolean) => { return (<ListboxIconDropdownOne open={open} />) }}
          keyDescription='registration-form-form-location'
          errorText={locationValue.errorText}
          validationStatus={locationValue.validationStatus} />
      </div>
    </div>
  )
}