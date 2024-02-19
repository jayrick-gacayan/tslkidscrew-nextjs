'use client';

import CustomListbox from "@/app/_components/listbox-custom";
import InputCustom from "@/app/_components/input-custom";
import { LocationPlace } from "@/models/location";
import { useEffect, useState } from "react";
import { editLocationPlace } from "@/actions/location-actions";
import { useFormState, useFormStatus } from "react-dom";
import { Admin } from "@/models/admin";
import { toast, ToastContentProps } from "react-toastify";
import { useRouter } from "next/navigation";

export function EditFormLocation({
  locationPlace,
  admins,
}: {
  locationPlace: LocationPlace
  admins: Partial<Admin>[]
}) {
  const router = useRouter();
  const [state, formAction] = useFormState(editLocationPlace.bind(null, locationPlace.id?.toString()!), {} as any);
  const { pending } = useFormStatus();
  const [director, setDirector] = useState<Partial<Admin> | undefined>(locationPlace?.director ?? undefined);

  useEffect(() => {
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
        router.push(`/admin/locations/${locationPlace.id!}`);
      }
    }
  }, [
    state?.message,
    state?.success,
    locationPlace?.id
  ]);

  console.log('state', state?.message, state?.success);

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
          validationStatus={state?.name?.validationStatus} />
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
          validationStatus={state?.['director[id]']?.validationStatus} />
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
      <button className="bg-primary p-2 rounded text-white w-32 block m-auto"
        disabled={pending}>
        {pending ? '...Checking' : 'Submit'}
      </button>
    </form>
  )
}