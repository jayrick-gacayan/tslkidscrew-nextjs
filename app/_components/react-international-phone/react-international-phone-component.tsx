import { ValidationType } from '@/types/enums/validation-type';
import { ComponentProps, ReactNode, useState } from 'react';
import { ParsedCountry, defaultCountries, usePhoneInput } from 'react-international-phone';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends ComponentProps<'input'> {
  labelText?: string;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  errorText?: string;
  validationStatus?: ValidationType;
};

export default function ReactInternationalPhoneComponent({
  labelText,
  className,
  suffixIcon,
  prefixIcon,
  errorText = '',
  validationStatus = ValidationType.NONE,
  id,
  ...props
}: InputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(`${props.defaultValue ?? ''}` ?? '');

  const { inputValue, handlePhoneValueChange, inputRef } =
    usePhoneInput({
      defaultCountry: 'us',
      value: phoneNumber,
      countries: defaultCountries,
      onChange: (data:
        {
          phone: string;
          inputValue: string;
          country: ParsedCountry;
        }) => {
        setPhoneNumber(data.phone);
      },
    });

  return (
    <div className='block space-y-[2px] w-full'>
      {
        labelText &&
        (
          <label htmlFor={id}
            className={
              twMerge(
                'font-medium peer-has-[input:focus]:text-primary',
                validationStatus === ValidationType.ERROR ? 'text-danger' : ''
              )
            }>
            {labelText}
          </label>
        )
      }
      <div className='relative w-full'>
        <input ref={inputRef}
          value={inputValue}
          onChange={handlePhoneValueChange}
          id={id}
          className={
            twMerge(
              'transition-all delay-100 w-full bg-white p-3 border border-secondary-light rounded outline-0 outline-transparent' +
              ' placeholder:text-secondary-light font-light' +
              ' disabled:text-secondary-light disabled:cursor-not-allowed' +
              ' focus:border-primary focus:text-inherit',
              className,
              validationStatus === ValidationType.ERROR ? 'border-danger bg-danger-light' : '',
            )
          }
          {...props} />
        {prefixIcon && prefixIcon}
        {suffixIcon && suffixIcon}
      </div>
      {errorText !== '' && <div className='text-danger'>{errorText}</div>}
    </div>
  );
}