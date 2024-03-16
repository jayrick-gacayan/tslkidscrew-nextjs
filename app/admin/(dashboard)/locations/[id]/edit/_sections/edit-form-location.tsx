'use client';

import CustomListbox from "@/app/_components/listbox-custom";
import InputCustom from "@/app/_components/input-custom";
import { LocationPlace } from "@/models/location-place";
import { useEffect, useState } from "react";
import { editLocationPlace } from "@/actions/location-actions";
import { useFormState } from "react-dom";
import { Admin } from "@/models/admin";
import { toast, ToastContentProps } from "react-toastify";
import { redirectToPath } from "@/actions/common-actions";
import { LocationPlaceFormStateProps } from "@/types/props/location-place-from-state-props";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import ListboxIconDropdownOne from "@/app/_components/listbox-icon-dropdown-one";
import LocationSubmitButton from "../../../_components/location-submit-button";

export function EditFormLocation({
  locationPlace,
  admins,
}: {
  locationPlace: LocationPlace
  admins: Pick<Admin, "id" | "email">[]
}) {
  const [state, formAction] = useFormState(
    editLocationPlace.bind(null, locationPlace.id?.toString()!),
    {
      name: fieldInputValue(''),
      address: fieldInputValue(''),
      ['location-minimum-age']: fieldInputValue(''),
      ['director[id]']: fieldInputValue(''),
    } as LocationPlaceFormStateProps
  );

  const [director, setDirector] = useState<Partial<Admin> | undefined>(locationPlace?.director ?? undefined);

  useEffect(() => {
    async function pathToBeRedirected() {
      await redirectToPath(`/admin/locations/${locationPlace.id!}`,)
    }

    if (state?.success !== undefined) {

      let { message, success } = state;

      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">
            {message}
          </div>
        )
      }, {
        toastId: `update-location-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      })

      if (success) {
        pathToBeRedirected();
      }
    }
  }, [
    state,
    locationPlace?.id
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
          defaultValue={locationPlace.name!}
          errorText={state.name?.errorText}
          validationStatus={state.name?.validationStatus} />
        <InputCustom labelText='Address'
          id='location-address'
          type="text"
          name="address"
          className="bg-secondary border-0"
          placeholder="Address:"
          defaultValue={locationPlace.address!}
          errorText={state?.address?.errorText}
          validationStatus={state?.address?.validationStatus} />
        <CustomListbox value={director}
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
          keyDescription="edit-form-location" />
        <InputCustom labelText='Minimum Age For Children'
          id='location-minimum-age-for-children'
          type="text"
          name="location-minimum-age"
          defaultValue={locationPlace.minimum_age!}
          className="bg-secondary border-0"
          placeholder="Minimum Age:"
          errorText={state?.['location-minimum-age']?.errorText}
          validationStatus={state?.['location-minimum-age']?.validationStatus} />
      </div>
      <LocationSubmitButton />
    </form>
  )
}