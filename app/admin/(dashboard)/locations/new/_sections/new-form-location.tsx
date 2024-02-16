'use client';

import { addLocationPlace } from "@/actions/location-actions";
import InputCustom from "@/app/_components/input-custom";
import CustomListbox from "@/app/_components/listbox-custom";
import { Admin } from "@/models/admin";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export function NewFormLocation({
  admins
}: {
  admins: Partial<Admin>[]
}) {
  const [state, formAction] = useFormState(addLocationPlace, {} as any);
  const { pending } = useFormStatus();
  const [director, setDirector] = useState<Partial<Admin> | undefined>(undefined);

  // console.log('state', state)
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
          validationType={state?.name?.validationStatus} />
        <InputCustom labelText='Address'
          id='location-address'
          type="text"
          name="address"
          className="bg-secondary border-0"
          placeholder="Address:"
          errorText={state?.address?.errorText}
          validationType={state?.address?.validationStatus} />
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
          validationType={state?.['location-minimum-age']?.validationStatus} />
      </div>
      <button className="bg-primary p-2 rounded text-white w-32 block m-auto"
        disabled={pending}>
        {pending ? '...Checking' : 'Submit'}
      </button>
    </form>
  )
}