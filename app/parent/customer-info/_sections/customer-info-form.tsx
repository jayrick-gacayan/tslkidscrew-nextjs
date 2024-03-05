'use client';

import { registerCustomerAction } from "@/actions/auth-actions";
import InputCustom from "@/app/_components/input-custom";
import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { Parent } from "@/models/parent";
import { HOW_DID_YOU_HEAR_ABOUT_US } from "@/types/constants/how-did-you-hear-about-us";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { CustomerInfoFormStateProps } from "@/types/props/customer-info-form-state-props";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import CustomListbox from "@/app/_components/listbox-custom";
import { ToastContentProps, toast } from "react-toastify";
import { redirectToPath } from "@/actions/common-actions";
import ListboxIconDropdownOne from "@/app/_components/listbox-icon-dropdown-one";

function CustomerInfoFormButton() {
  const { pending } = useFormStatus();

  return (
    <button className="w-48 m-auto block bg-primary text-white rounded p-2 disabled:cursor-not-allowed"
      disabled={pending}>
      {
        pending ? (<><Spinners3DotsScale className="inline-block" /> <span>Checking</span></>) : 'Submit'
      }
    </button>
  )
}

export default function CustomerInfoForm({ parent }: { parent: Parent }) {
  const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState<string>('')

  const [state, formAction] = useFormState(
    registerCustomerAction.bind(null, parent.email!),
    {
      first_name: fieldInputValue(''),
      last_name: fieldInputValue('')
    } as CustomerInfoFormStateProps
  );

  useEffect(() => {
    async function pathToRedirect() {
      await redirectToPath('/parent/forms')
    }

    let { message, success } = state;

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

      if (success) {
        pathToRedirect();
      }
    }

  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        <h5 className="font-semibold text-[24px]">Contact Information</h5>
        <div className="block">
          <div className="w-full lg:w-2/3 block space-y-4">
            <InputCustom id='firstname'
              labelText="Firstname"
              name='first_name'
              type="text"
              placeholder="Firstname:"
              className="bg-secondary border-transparent p-2 px-3"
              defaultValue={state.first_name?.value}
              errorText={state.first_name?.errorText}
              validationStatus={state.first_name?.validationStatus} />
            <InputCustom id='lastname'
              labelText="Lastname"
              name='last_name'
              type="text"
              placeholder="Lastname:"
              className="bg-secondary border-transparent p-2 px-3"
              defaultValue={state.last_name?.value}
              errorText={state.last_name?.errorText}
              validationStatus={state.last_name?.validationStatus} />

            <InputCustom id='phone-number'
              labelText="Phone Number"
              name='phone-number'
              type="text"
              placeholder="Phone Number:"
              className="bg-secondary border-transparent p-2 px-3" />
            <InputCustom id='emergency-number'
              labelText="Emergency Number"
              name='emergency-number'
              type="text"
              placeholder="Emergency Number:"
              className="bg-secondary border-transparent p-2 px-3" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="font-semibold text-[24px]">Address Information</h5>
        <div className="space-y-4">
          <InputCustom id='address-line-one'
            name='address-line-one'
            labelText="Address Line One"
            type="text"
            placeholder="Address Line One:"
            className="bg-secondary border-transparent p-2 px-3" />
          <InputCustom id='address-line-two'
            name='address-line-two'
            labelText="Address Line Two"
            type="text"
            placeholder="Address Line Two:"
            className="bg-secondary border-transparent p-2 px-3" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-evenly gap-4">
          <div className="flex-1 w-full">
            <InputCustom id='address-city'
              name='address-city'
              labelText="City"
              type="text"
              placeholder="City"
              className="bg-secondary border-transparent p-2 px-3" />
          </div>
          <div className="flex-none lg:w-96 w-full">
            <InputCustom id='State'
              name='address-state'
              labelText="State"
              type="text"
              placeholder="State :"
              className="bg-secondary border-transparent p-2 px-3" />
          </div>
          <div className="flex-none lg:w-48 w-full">
            <InputCustom id='Zip Code'
              name='address-zipcode'
              labelText="Zipcode"
              type="text"
              inputMode="numeric"
              placeholder="ZipCode :"
              className="bg-secondary border-transparent p-2 px-3" />
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full">
        <CustomListbox value={howDidYouHearAboutUs}
          name='how_did_you_hear_about_us'
          placeholder='How did you hear about us?'
          onChange={(value: any) => { setHowDidYouHearAboutUs(value); }}
          items={HOW_DID_YOU_HEAR_ABOUT_US}
          valueClassName={(value: string, placeholder: string) => {
            return `p-2 flex-1 ${value === placeholder ? 'text-secondary-light' : 'text-black'}`
          }}
          listboxDropdownIcon={(open: boolean) => { return (<ListboxIconDropdownOne open={open} />) }}
          labelText="How did you hear about us"
          keyDescription="how-did-you-hear-about-us-customer-info-form" />
      </div>
      <CustomerInfoFormButton />
    </form>
  )

}