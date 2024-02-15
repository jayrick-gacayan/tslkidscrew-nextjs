'use client';

import CustomListbox from "@/app/_components/listbox-custom";
import InputCustom from "@/app/_components/input-custom";
import { LocationPlace } from "@/models/location";
import { useState } from "react";
import { editLocationPlace } from "@/actions/location-actions";
import { useFormState, useFormStatus } from "react-dom";

let directorItems = [
  { id: 1, email: "alexisLarose.tsl@gmail.com" },
  { id: 2, email: "jake.tsl@gmail.com" },
  { id: 3, email: "missmaria.tsl@gmail.com" },
  { id: 4, email: "rhay26.tsl@gmail.com" },
  { id: 5, email: "peter.harding.tsl@gmail.com" },
];

export function EditFormLocation({
  locationPlace
}: {
  locationPlace: LocationPlace
}) {
  const [state, formAction] = useFormState(editLocationPlace, {} as any);
  const { pending } = useFormStatus();
  const [director, setDirector] = useState<any>(undefined);

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
          errorText={state?.name?.errorText}
          validationType={state?.name?.validationStatus} />
        <InputCustom labelText='Address'
          id='location-address'
          type="text"
          name="address"
          className="bg-secondary border-0"
          placeholder="Address:"
          defaultValue={locationPlace.address!}
          errorText={state?.address?.errorText}
          validationType={state?.address?.validationStatus} />
        <CustomListbox value={director}
          name="director"
          placeholder='Director'
          onChange={(value: any) => {
            setDirector(value);
          }}
          items={directorItems}
          labelText="Director"
          by="id"
          errorText={state?.['director[id]']?.errorText}
          validationStatus={state?.['director[id]']?.validationStatus} />
        <InputCustom labelText='Minimum Age For Children'
          id='location-minimum-age-for-children'
          type="text"
          name="location-minimum-age"
          defaultValue={locationPlace.minimum_age!}
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