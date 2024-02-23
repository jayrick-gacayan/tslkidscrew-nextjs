'use client';

import { addLocationProgramAction } from "@/actions/location-program-actions";
import InputCustom from "@/app/_components/input-custom";
import { Admin } from "@/models/admin";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { LocationProgramFormStateProps } from "@/types/props/location-program-form-state-props";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import CustomListbox from "@/app/_components/listbox-custom";
import { LocationPlace } from "@/models/location";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { ToastContentProps, toast } from "react-toastify";

let programTypes = [
  'After School',
  'Summer Camp',
  'Vacation Camp'
]

export default function NewProgramForm({
  activeAdmins,
  locationPlace,
}: {
  activeAdmins: Partial<Admin>[]
  locationPlace: LocationPlace
}) {
  const { pending } = useFormStatus();
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
    let { message, success } = state;
    if (success !== undefined) {
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{message}</div>
        )
      }, {
        toastId: `create-location-program-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      })
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-4" id='new-location-program'>
      <div className="space-y-4">
        <InputCustom labelText="Location"
          id='location-name'
          type="text"
          className="bg-secondary border-transparent p-2 px-3"
          placeholder="Location:"
          defaultValue={locationPlace.name! ?? ''}
          disabled />
        <CustomListbox value={program}
          name='name'
          placeholder='Program'
          onChange={(value: any) => { setProgram(value); }}
          items={programTypes}
          labelText="Program"
          errorText={state?.name?.errorText}
          validationStatus={state?.name?.validationStatus} />
        <InputCustom labelText="Name"
          id='location-program-name-suffix'
          name='name-suffix'
          type="text"
          className="bg-secondary border-transparent p-2 px-3"
          placeholder="Program Name Suffix:"
          errorText={state?.["name-suffix"]?.errorText}
          validationStatus={state?.["name-suffix"]?.validationStatus} />
        <CustomListbox value={director}
          name='director'
          placeholder='Director'
          onChange={(value: any) => { setDirector(value); }}
          items={activeAdmins}
          labelText="Director"
          by="id"
          errorText={state?.['director[id]']?.errorText}
          validationStatus={state?.['director[id]']?.validationStatus} />
        <div className="flex items-center gap-2 w-full">
          <div className="w-full">
            <InputCustom labelText="Capacity"
              id='location-program-capacity'
              name='capacity'
              type="text"
              inputMode="numeric"
              className="bg-secondary border-transparent p-2 px-3"
              placeholder="Capacity:"
              errorText={state?.capacity?.errorText}
              validationStatus={state?.capacity?.validationStatus} />
          </div>
          <div className="w-full">
            {/* <InputCustom labelText="Price"
              id='location-program-price'
              name='price'
              type="text"
              inputMode="numeric"
              className="bg-secondary border-transparent p-2 px-3"
              placeholder="Price:" /> */}
          </div>
        </div>
        <InputCheckboxCustom labelText="Promo Package Enabled"
          id={`location-program-new-promo-package`}
          name="promo-package"
        />
        <InputCheckboxCustom labelText="Active"
          id={`location-program-new-active`}
          name="active"
        />
      </div>
      <div className="w-1/2 block m-auto">
        <button className="bg-primary p-2 rounded text-white w-fit block m-auto"
          disabled={pending}>
          {pending ? '...Checking' : 'Submit'}
        </button>
      </div>
    </form>
  )
}