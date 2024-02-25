'use client';

import { pathRevalidate, redirectToPath } from "@/actions/common-actions";
import { addLocationPlace } from "@/actions/location-actions";
import InputCustom from "@/app/_components/input-custom";
import CustomListbox from "@/app/_components/listbox-custom";
import { Admin } from "@/models/admin";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { LocationPlaceFormStateProps } from "@/types/props/location-place-from-state-props";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ToastContentProps, toast } from "react-toastify";

export function NewFormLocation({
  admins
}: {
  admins: Partial<Admin>[]
}) {
  const [state, formAction] = useFormState(
    addLocationPlace,
    {
      name: fieldInputValue(''),
      address: fieldInputValue(''),
      ['location-minimum-age']: fieldInputValue(''),
      ['director[id]']: fieldInputValue(''),
    } as LocationPlaceFormStateProps
  );
  const { pending } = useFormStatus();
  const [director, setDirector] = useState<Partial<Admin> | undefined>(undefined);

  useEffect(() => {
    async function pathToRedirect(id: number) {
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
        pathToRedirect(data.id!);
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
        <CustomListbox value={director}
          name='director'
          placeholder='Director'
          onChange={(value: any) => { setDirector(value); }}
          items={admins}
          labelText="Director"
          by="id"
          errorText={state?.['director[id]']?.errorText}
          validationStatus={state?.['director[id]']?.validationStatus} />
        <InputCustom labelText='Minimum Age For Children'
          id='location-minimum-age-for-children'
          type="text"
          name="location-minimum-age"
          className="bg-secondary border-0"
          placeholder="Minimum Age:"
          errorText={state?.['location-minimum-age']?.errorText}
          validationStatus={state?.['location-minimum-age']?.validationStatus} />
      </div>
      <button className="bg-primary p-2 rounded text-white w-32 block m-auto disabled:cursor-not-allowed"
        disabled={pending}>
        {pending ? '...Checking' : 'Submit'}
      </button>
    </form>
  )
}