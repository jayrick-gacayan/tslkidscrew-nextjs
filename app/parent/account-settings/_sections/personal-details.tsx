import { Tab } from '@headlessui/react';
import InputCustom from '@/app/_components/input-custom';
import Fa6SolidPhone from '@/app/_components/svg/fa6-solid-phone';
import Fa6SolidLocationDot from '@/app/_components/svg/fa6-solid-location-dot';
import { useFormState } from 'react-dom';
import { updateCustomerInfoAction } from '@/actions/parent-info-actions';
import { CustomerInfoFormStateProps } from '@/types/props/customer-info-form-state-props';
import { fieldInputValue } from '@/types/helpers/field-input-value';
import { useEffect } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { pathRevalidate } from '@/actions/common-actions';
import { AccountInfoForParent } from '../prop-types/custom-pick-parent';
import PersonalDetailsButtons from './personal-details-button';

export default function PersonalDetails({ parent }: { parent: Omit<AccountInfoForParent, 'email'> | undefined }) {
  const [state, formAction] = useFormState(updateCustomerInfoAction, {
    first_name: fieldInputValue(parent?.first_name ?? ''),
    last_name: fieldInputValue(parent?.last_name ?? '')
  } as Partial<CustomerInfoFormStateProps>);

  useEffect(() => {
    async function pathToRevalidate() {
      await pathRevalidate('/parent/account-settings')
    }

    let { message, success } = state;

    if (success !== undefined) {
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className='text-black'>{message}</div>
        )
      }, {
        toastId: `create-location-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      })

      if (success) {
        pathToRevalidate();
      }
    }

  }, [state])

  return (
    <Tab.Panel as='div' className='space-y-8'>
      <h1 className='text-[32px] font-medium'>Personal Details</h1>
      <form action={formAction} className='space-y-8'>
        <div className='space-y-4'>
          <div className='flex items-stretch gap-4'>
            <InputCustom labelText='Firstname'
              id='firstName'
              name='first_name'
              className='bg-secondary p-2 border-transparent'
              placeholder='Firstname:'
              type='text'
              defaultValue={parent?.first_name ?? ''}
              errorText={state.first_name?.errorText}
              validationStatus={state.first_name?.validationStatus} />
            <InputCustom labelText='Lastname'
              id='lastName'
              name='last_name'
              className='bg-secondary p-2 border-transparent'
              placeholder='Lastname:'
              type='text'
              defaultValue={parent?.last_name ?? ''}
              errorText={state.last_name?.errorText}
              validationStatus={state.last_name?.validationStatus} />
          </div>
        </div>

        <div className='space-y-4'>
          <InputCustom labelText='Emergency Number'
            id='emergency-number'
            name='emergency-number'
            defaultValue={parent?.emergency_phone_number ?? ''}
            className='bg-secondary p-2 pl-10 border-transparent'
            placeholder='Emergency Number:'
            type='text'
            prefixIcon={<PrefixPhoneIcon />} />

          <InputCustom labelText='Phone Number'
            id='phone-number'
            name='phone-number'
            defaultValue={parent?.phone_number ?? ''}
            className='bg-secondary p-2 pl-10 border-transparent'
            placeholder='Phone Number:'
            type='text'
            prefixIcon={<PrefixPhoneIcon />} />
        </div>

        <div className='space-y-4'>
          <h3 className='text-tertiary'>LOCATION</h3>
          <InputCustom labelText='Address Line 1'
            id='address-line-one'
            name='address-line-one'
            defaultValue={parent?.address_line_one ?? ''}
            className='bg-secondary p-2 pl-10 border-transparent'
            placeholder='Address Line 1:'
            type='text'
            prefixIcon={<PrefixLocationDotIcon />} />
          <InputCustom labelText='Address Line 2'
            id='address-line-two'
            name='address-line-two'
            defaultValue={parent?.address_line_two ?? ''}
            className='bg-secondary p-2 pl-10 border-transparent'
            placeholder='Address Line 2:'
            type='text'
            prefixIcon={<PrefixLocationDotIcon />} />
          <InputCustom labelText='City'
            id='address-city'
            name='address-city'
            defaultValue={parent?.city ?? ''}
            className='bg-secondary p-2 pl-10 border-transparent'
            placeholder='City:'
            type='text'
            prefixIcon={<PrefixLocationDotIcon />} />
          <InputCustom labelText='State'
            id='address-state'
            name='address-state'
            defaultValue={parent?.state ?? ''}
            className='bg-secondary p-2 pl-10 border-transparent'
            placeholder='State:'
            type='text'
            prefixIcon={<PrefixLocationDotIcon />} />
          <InputCustom labelText='Zipcode'
            id='address-zipcode'
            name='address-zipcode'
            defaultValue={parent?.zip_code ?? ''}
            className='bg-secondary p-2 pl-10 border-transparent'
            placeholder='Zipcode:'
            type='text'
            inputMode='numeric'
            prefixIcon={<PrefixLocationDotIcon />} />
        </div>
        <PersonalDetailsButtons />
      </form>
    </Tab.Panel>
  )
}

/* Prefix icons */
const PrefixPhoneIcon = () => {
  return (<Fa6SolidPhone className='text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger' />);
}

const PrefixLocationDotIcon = () => {
  return (<Fa6SolidLocationDot className='text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger' />);
}