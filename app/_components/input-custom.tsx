import { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
}

function InputCustom(
  {
    labelText,
    className,
    suffixIcon,
    prefixIcon,
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
          className="font-medium 
          peer-has-[input:invalid]:text-danger peer-has-[input:focus]:text-primary">{labelText}</label>)
      }
      <div className="relative w-full">
        <input ref={ref}
          className={
            twMerge(
              'peer w-full bg-white p-3 border border-secondary-light rounded outline-0 outline-transparent' +
              ' placeholder:text-secondary-light font-light' +
              ' disabled:text-secondary-light disabled:cursor-not-allowed' +
              ' focus:border-primary focus:text-inherit' +
              ' invalid:text-danger invalid:border-danger',
              className
            )
          } {...props} />
        {prefixIcon && prefixIcon}
        {suffixIcon && suffixIcon}
      </div>
    </div>
  )
}

export default forwardRef(InputCustom)


