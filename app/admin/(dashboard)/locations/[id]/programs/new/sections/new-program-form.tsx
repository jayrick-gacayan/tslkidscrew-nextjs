'use client';

import { addLocationProgramAction } from '@/actions/location-program-actions';
import InputCustom from '@/app/_components/input-custom';
import { Admin } from '@/models/admin';
import { fieldInputValue } from '@/types/helpers/field-input-value';
import { LocationProgramFormStateProps } from '@/types/props/location-program-form-state-props';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import CustomListbox from '@/app/_components/listbox-custom';
import { LocationPlace } from '@/models/location-place';
import InputCheckboxCustom from '@/app/_components/input-checkbox-custom';
import { ToastContentProps, toast } from 'react-toastify';
import ListboxIconDropdownOne from '@/app/_components/listbox-icon-dropdown-one';
import { redirectToPath } from '@/actions/common-actions';
import SubmitProgramButton from '../../_components/submit-program-button';
import { PROGRAM_TYPES } from '@/types/constants/program-type';

export default function NewProgramForm({
  activeAdmins,
  locationPlace,
}: {
  activeAdmins: Pick<Admin, 'id' | 'email'>[]
  locationPlace: LocationPlace
}) {
  const [state, formAction] = useFormState(
    addLocationProgramAction.bind(null, locationPlace.id!),
    {
      name: fieldInputValue(''),
      ['name-suffix']: fieldInputValue(''),
      capacity: fieldInputValue(''),
    } as LocationProgramFormStateProps
  );
  const [director, setDirector] = useState<Partial<Admin> | undefined>(undefined);
  const [program, setProgram] = useState<string>('');

  useEffect(() => {
    async function pathToBeRedirected(locationPlaceId: number, id: number) {
      await redirectToPath(`/admin/locations/${locationPlaceId}/programs/${id}`);
    }
    if (state?.success !== undefined) {
      let { message, success, data } = state;

      toast((props: ToastContentProps<unknown>) => {
        return (<div className='text-black'>{message}</div>);
      }, {
        toastId: `create-location-program-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });

      if (success && data) {
        pathToBeRedirected(data.location_id, data.id!);
      }
    }
  }, [state]);

  function listboxClassName(value: string, placeholder: string) {
    return `p-2 flex-1 ${value === placeholder ? 'text-secondary-light' : 'text-black'}`;
  }

  function listboxDDIcon(open: boolean) {
    return (<ListboxIconDropdownOne open={open} />);
  }

  return (
    <form action={formAction} className='space-y-4' id='new-location-program'>
      <div className='space-y-4'>
        <InputCustom labelText='Location'
          id='location-name'
          type='text'
          className='bg-secondary border-transparent p-2 px-3'
          placeholder='Location:'
          defaultValue={locationPlace.name! ?? ''}
          disabled />
        <CustomListbox value={program}
          name='name'
          placeholder='Program'
          onChange={(value: any) => { setProgram(value); }}
          items={PROGRAM_TYPES}
          labelText='Program'
          errorText={state?.name?.errorText}
          valueClassName={listboxClassName}
          listboxDropdownIcon={listboxDDIcon}
          validationStatus={state?.name?.validationStatus}
          keyDescription='new-program-form-name' />
        <InputCustom labelText='Name'
          id='location-program-name-suffix'
          name='name-suffix'
          type='text'
          className='bg-secondary border-transparent p-2 px-3'
          placeholder='Program Name Suffix:'
          errorText={state?.['name-suffix']?.errorText}
          validationStatus={state?.['name-suffix']?.validationStatus} />
        <CustomListbox value={director ?? ''}
          name='director'
          placeholder='Director'
          onChange={(value: any) => { setDirector(value); }}
          items={activeAdmins}
          labelText='Director'
          by='id'
          listboxDropdownIcon={listboxDDIcon}
          errorText={state?.['director[id]']?.errorText}
          validationStatus={state?.['director[id]']?.validationStatus}
          keyDescription='new-program-form-director'
          valueClassName={listboxClassName} />
        <div className='flex items-center gap-2 w-full'>
          <div className='w-full'>
            <InputCustom labelText='Capacity'
              id='location-program-capacity'
              name='capacity'
              type='text'
              inputMode='numeric'
              className='bg-secondary border-transparent p-2 px-3'
              placeholder='Capacity:'
              errorText={state?.capacity?.errorText}
              validationStatus={state?.capacity?.validationStatus} />
          </div>
          <div className='w-full'>
            {/* <InputCustom labelText='Price'
              id='location-program-price'
              name='price'
              type='text'
              inputMode='numeric'
              className='bg-secondary border-transparent p-2 px-3'
              placeholder='Price:' /> */}
          </div>
        </div>
        <InputCheckboxCustom labelText='Promo Package Enabled'
          id='location-program-new-promo-package'
          name='promo-package' />
        <InputCheckboxCustom labelText='Active'
          id='location-program-new-active'
          name='active' />
      </div>
      <SubmitProgramButton />
    </form>
  );
}