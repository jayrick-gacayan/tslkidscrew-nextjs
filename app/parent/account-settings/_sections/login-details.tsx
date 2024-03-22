import Fa6SolidEnvelope from '@/app/_components/svg/fa6-solid-envelope';
import { Tab } from '@headlessui/react';
import InputCustom from '@/app/_components/input-custom';
import Fa6SolidLock from '@/app/_components/svg/fa6-solid-lock';
import PasswordIcon from '@/app/_components/password-icon';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { changePasswordAction } from '@/actions/parent-password-actions';
import { ToastContentProps, toast } from 'react-toastify';
import LoginDetailsButtonSubmit from './login-details-button-submit';

export default function LoginDetails({ email }: { email: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmationShow, setPasswordConfirmationShow] = useState<boolean>(false);

  const [state, formAction] = useFormState(changePasswordAction, {} as any);

  useEffect(() => {
    if (state.success !== undefined) {
      let { message, success } = state;

      toast((props: ToastContentProps<unknown>) => {
        return (<div className='text-black'>{message}</div>)
      }, {
        toastId: `change-password-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });

      if (success) {
        formRef.current?.reset();
      }
    }

  }, [state])

  return (
    <Tab.Panel as='div' className='space-y-8'>
      <h1 className='text-[32px] font-medium'>Login Details</h1>
      <form action={formAction}
        ref={formRef}
        className='space-y-8'>
        <div className='space-y-4'>
          <InputCustom labelText='Email'
            id='email-address'
            name='email-address'
            defaultValue={email}
            className='bg-secondary p-2 pl-10 border-transparent'
            placeholder='Email Address:'
            type='text'
            disabled={true}
            prefixIcon={<PrefixEnvelopeIcon />} />
          <InputCustom labelText='Password'
            id='password'
            name='password'
            className='bg-secondary p-2 pl-10 pr-10 border-transparent'
            placeholder='Password:'
            type={passwordShow ? 'text' : 'password'}
            suffixIcon={<PasswordIcon passwordShow={passwordShow} onPasswordShown={setPasswordShow} />}
            prefixIcon={<PrefixLockIcon />}
            errorText={state?.password?.errorText}
            validationStatus={state?.password?.validationStatus} />
          <InputCustom labelText='Confirm Password'
            id='password-confirmation'
            name='password-confirmation'
            className='bg-secondary p-2 pl-10 border-transparent'
            placeholder='Confirm Password:'
            type={passwordConfirmationShow ? 'text' : 'password'}
            suffixIcon={<PasswordIcon passwordShow={passwordConfirmationShow} onPasswordShown={setPasswordConfirmationShow} />}
            prefixIcon={<PrefixLockIcon />}
            errorText={state?.['password-confirmation']?.errorText}
            validationStatus={state?.['password-confirmation']?.validationStatus} />
        </div>
        <LoginDetailsButtonSubmit />
      </form>
    </Tab.Panel>
  );
}

/* Prefix icons */
const PrefixEnvelopeIcon = () => {
  return (<Fa6SolidEnvelope className='text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger' />);
}

const PrefixLockIcon = () => {
  return (<Fa6SolidLock className='text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger' />);
}
