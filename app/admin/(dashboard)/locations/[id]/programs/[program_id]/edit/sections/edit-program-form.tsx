'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";
import CustomListbox from "@/app/_components/listbox-custom";
import InputCustom from "@/app/_components/input-custom";
import { Admin } from "@/models/admin";
import { LocationProgram } from "@/models/location-program";
import { useState } from "react";
import { editLocationProgramAction } from "@/actions/location-program-actions";
import { useFormState, useFormStatus } from "react-dom";
import { LocationProgramFormStateProps } from "@/types/props/location-program-form-state-props";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import ListboxIconDropdownOne from "@/app/_components/listbox-icon-dropdown-one";

let programTypes = ['After School', 'Summer Camp', 'Vacation Camp']

export default function EditProgramForm({
  locationProgram,
  activeAdmins,
}: {
  locationProgram: LocationProgram;
  activeAdmins: Partial<Admin>[]
}) {
  const { pending } = useFormStatus();
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
  const [programType, setProgramType] = useState<string>('');

  return (
    <>
      <div className="space-y-4">
        <InputCustom labelText="Location"
          id='location-name'
          type="text"
          className="bg-secondary border-transparent p-2 px-3"
          placeholder="Location:"
          defaultValue={locationProgram.locationPlace.name! ?? ''}
          disabled />
        <InputCustom labelText="Program Name"
          id='location-program-name'
          name='name'
          type="text"
          className="bg-secondary border-transparent p-2 px-3"
          placeholder="Program Name:"
          defaultValue={locationProgram.name! ?? ''} />
        <InputCustom labelText="Program Suffix"
          id='location-program-name-suffix'
          name='name-suffix'
          type="text"
          className="bg-secondary border-transparent p-2 px-3"
          placeholder="Program Name Suffix:"
          defaultValue={locationProgram?.name_suffix ?? ''}
          errorText={state["name-suffix"]?.errorText}
          validationStatus={state["name-suffix"]?.validationStatus} />
        <CustomListbox value={director}
          name='director'
          placeholder='Director'
          onChange={(value: any) => { setDirector(value); }}
          items={activeAdmins}
          labelText="Director"
          by="id"
          errorText={state?.['director[id]']?.errorText}
          valueClassName={(value: string, placeholder: string) => {
            return `p-2 flex-1 ${value === placeholder ? 'text-secondary-light' : 'text-black'}`
          }}
          listboxDropdownIcon={(open: boolean) => { return (<ListboxIconDropdownOne open={open} />) }}
          validationStatus={state?.['director[id]']?.validationStatus}
          keyDescription="edit-program-form-director" />
        <div className="flex items-center gap-2 w-full">
          <div className="w-full">
            <InputCustom labelText="Capacity"
              id='location-program-capacity'
              name='capacity'
              type="text"
              inputMode="numeric"
              className="bg-secondary border-transparent p-2 px-3"
              placeholder="Capacity:"
              defaultValue={locationProgram.capacity ?? 1}
              errorText={state.capacity?.errorText}
              validationStatus={state.capacity?.validationStatus} />
          </div>
          <div className="w-full">

          </div>
        </div>
        <InputCheckboxCustom labelText="Promo Package Enabled"
          id={`location-program-new-promo-package`}
          defaultChecked={locationProgram.is_package_active ?? false}
          name="promo-package" />
        <InputCheckboxCustom labelText="Active"
          id={`location-program-new-active`}
          defaultChecked={locationProgram.active ?? false}
          name="active" />
      </div>
      <div className="w-1/2 block m-auto">
        <button className="bg-primary p-2 rounded text-white w-fit block m-auto"
          disabled={pending}>
          {pending ? '...Checking' : 'Submit'}
        </button>
      </div>
    </>
  )
}