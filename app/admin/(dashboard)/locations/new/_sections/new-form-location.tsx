'use client';

import { redirectToPath } from "@/actions/common-actions";
import { addLocationPlace } from "@/actions/location-actions";
import InputCustom from "@/app/_components/input-custom";
import CustomListbox from "@/app/_components/listbox-custom";
import ListboxIconDropdownOne from "@/app/_components/listbox-icon-dropdown-one";
import { Admin } from "@/models/admin";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { LocationPlaceFormStateProps } from "@/types/props/location-place-from-state-props";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContentProps, toast } from "react-toastify";
import LocationSubmitButton from "../../_components/location-submit-button";

export function NewFormLocation({ admins }: { admins: Pick<Admin, 'id' | 'email'>[] }) {
  const [state, formAction] = useFormState(
    addLocationPlace,
    {
      name: fieldInputValue(''),
      address: fieldInputValue(''),
      ['location-minimum-age']: fieldInputValue(''),
      ['director[id]']: fieldInputValue(''),
    } as LocationPlaceFormStateProps
  );
  const [director, setDirector] = useState<Pick<Admin, 'id' | 'email'> | undefined>(undefined);

  useEffect(() => {
    async function tagToRevalidate(id: number) {
      await redirectToPath(`/admin/locations/${id}`);
    }

    let { message, success, data } = state;

    if (success !== undefined) {

      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{message}</div>
        )
      }, {
        toastId: `create-location-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      })

      if (success && data) {
        tagToRevalidate(data.id!);
      }
    }
  }, [
    state,
  ]);

  return (
    <form action={formAction} className="block space-y-4">
      <div className="space-y-4">
        <InputCustom labelText='Name'
          id='location-name'
          type="text"
          name="name"
          className="bg-secondary border-0"
          placeholder="Name:"
          errorText={state?.name?.errorText}
          validationStatus={state?.name?.validationStatus} />
        <InputCustom labelText='Address'
          id='location-address'
          type="text"
          name="address"
          className="bg-secondary border-0"
          placeholder="Address:"
          errorText={state?.address?.errorText}
          validationStatus={state?.address?.validationStatus} />
        <CustomListbox value={director ?? ''}
          name='director'
          placeholder='Director'
          onChange={(value: any) => { setDirector(value); }}
          items={admins}
          labelText="Director"
          by="id"
          errorText={state?.['director[id]']?.errorText}
          valueClassName={(value: string, placeholder: string) => {
            return `p-2 flex-1 ${value === placeholder ? 'text-secondary-light' : 'text-black'}`
          }}
          listboxDropdownIcon={(open: boolean) => { return (<ListboxIconDropdownOne open={open} />) }}
          validationStatus={state?.['director[id]']?.validationStatus}
          keyDescription="new-form-location" />
        <InputCustom labelText='Minimum Age For Children'
          id='location-minimum-age-for-children'
          type="text"
          name="location-minimum-age"
          className="bg-secondary border-0"
          placeholder="Minimum Age:"
          errorText={state?.['location-minimum-age']?.errorText}
          validationStatus={state?.['location-minimum-age']?.validationStatus} />
      </div>
      <LocationSubmitButton />
    </form>
  )
}