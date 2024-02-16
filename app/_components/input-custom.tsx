import { ValidationType } from "@/types/enums/validation-type";
import { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  errorText?: string;
  validationType?: ValidationType;
}

function InputCustom(
  {
    labelText,
    className,
    suffixIcon,
    prefixIcon,
    errorText = '',
    validationType = ValidationType.NONE,
    id,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className='block space-y-[2px] w-full'>
      {
        labelText &&
        (<label htmlFor={id}
          className={
            twMerge(
              "font-medium peer-has-[input:focus]:text-primary",
              validationType === ValidationType.ERROR ? 'text-danger' : ''
            )
          }>{labelText}</label>)
      }
      <div className="relative w-full">
        <input ref={ref}
          id={id}
          className={
            twMerge(
              'transition-all delay-100 w-full bg-white p-3 border border-secondary-light rounded outline-0 outline-transparent' +
              ' placeholder:text-secondary-light font-light' +
              ' disabled:text-secondary-light disabled:cursor-not-allowed' +
              ' focus:border-primary focus:text-inherit',
              className,
              validationType === ValidationType.ERROR ? 'border-danger bg-danger-light' : '',
            )
          } {...props} />
        {prefixIcon && prefixIcon}
        {suffixIcon && suffixIcon}
      </div>
      {errorText !== '' && <div className="text-danger">{errorText}</div>}
    </div>
  )
}

export default forwardRef(InputCustom)


