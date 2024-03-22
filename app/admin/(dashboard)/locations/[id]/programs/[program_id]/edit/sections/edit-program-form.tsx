'use client';

import CustomListbox from '@/app/_components/listbox-custom';
import InputCustom from '@/app/_components/input-custom';
import { Admin } from '@/models/admin';
import { LocationProgram } from '@/models/location-program';
import { useEffect, useState } from 'react';
import { editLocationProgramAction } from '@/actions/location-program-actions';
import { useFormState } from 'react-dom';
import { LocationProgramFormStateProps } from '@/types/props/location-program-form-state-props';
import { fieldInputValue } from '@/types/helpers/field-input-value';
import InputCheckboxCustom from '@/app/_components/input-checkbox-custom';
import ListboxIconDropdownOne from '@/app/_components/listbox-icon-dropdown-one';
import { toast, ToastContentProps } from 'react-toastify';
import { redirectToPath } from '@/actions/common-actions';
import SubmitProgramButton from '../../../_components/submit-program-button';
import { PROGRAM_TYPES } from '@/types/constants/program-type';

export default function EditProgramForm({
  locationProgram,
  activeAdmins,
}: {
  locationProgram: LocationProgram;
  activeAdmins: Pick<Admin, 'id' | 'email'>[]
}) {
  const [state, formAction] = useFormState(
    editLocationProgramAction.bind(null, locationProgram.id!, locationProgram.location_id!),
    {
      name: fieldInputValue(locationProgram.name! ?? ''),
      capacity: fieldInputValue(locationProgram.capacity?.toString()!),
      ['name-suffix']: fieldInputValue(locationProgram.name_suffix! ?? ''),
    } as LocationProgramFormStateProps
  );

  const [director, setDirector] = useState<Partial<Admin> | undefined>(
    locationProgram.director ?? undefined
  );
  const [program, setProgram] = useState<string>(locationProgram?.name ?? '');

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
    <form action={formAction} className='space-y-4' id='edit-location-program'>
      <div className='space-y-4'>
        <InputCustom labelText='Location'
          id='location-name'
          type='text'
          className='bg-secondary border-transparent p-2 px-3'
          placeholder='Location:'
          defaultValue={locationProgram.locationPlace.name! ?? ''}
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
          keyDescription='edit-program-form-name' />
        <InputCustom labelText='Program Suffix'
          id='location-program-name-suffix'
          name='name-suffix'
          type='text'
          className='bg-secondary border-transparent p-2 px-3'
          placeholder='Program Name Suffix:'
          defaultValue={locationProgram?.name_suffix ?? ''}
          errorText={state['name-suffix']?.errorText}
          validationStatus={state['name-suffix']?.validationStatus} />
        <CustomListbox value={director}
          name='director'
          placeholder='Director'
          onChange={(value: any) => { setDirector(value); }}
          items={activeAdmins}
          labelText='Director'
          by='id'
          errorText={state?.['director[id]']?.errorText}
          valueClassName={listboxClassName}
          listboxDropdownIcon={listboxDDIcon}
          validationStatus={state?.['director[id]']?.validationStatus}
          keyDescription='edit-program-form-director' />
        <div className='flex items-center gap-2 w-full'>
          <div className='w-full'>
            <InputCustom labelText='Capacity'
              id='location-program-capacity'
              name='capacity'
              type='text'
              inputMode='numeric'
              className='bg-secondary border-transparent p-2 px-3'
              placeholder='Capacity:'
              defaultValue={locationProgram.capacity ?? 1}
              errorText={state.capacity?.errorText}
              validationStatus={state.capacity?.validationStatus} />
          </div>
        </div>
        <InputCheckboxCustom labelText='Promo Package Enabled'
          id={`location-program-new-promo-package`}
          defaultChecked={locationProgram.is_package_active ?? false}
          name='promo-package' />
        <InputCheckboxCustom labelText='Active'
          id={`location-program-new-active`}
          defaultChecked={locationProgram.active ?? false}
          name='active' />
      </div>
      <SubmitProgramButton />
    </form>
  );
}