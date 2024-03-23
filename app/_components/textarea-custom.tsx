import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
}

function TextareaCustom(
  {
    labelText,
    className,
    id,
    ...props
  }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <div className='block space-y-[2px] w-full'>
      {
        labelText &&
        (
          <label htmlFor={id}
            className='font-medium peer-has-[input:invalid]:text-danger peer-has-[input:focus]:text-primary'>
            {labelText}
          </label>
        )
      }
      <div className='relative w-full'>
        <textarea ref={ref}
          className={
            twMerge(
              'peer resize-none w-full bg-white p-3 border border-secondary-light rounded outline-0 outline-transparent' +
              ' placeholder:text-secondary-light font-light' +
              ' disabled:text-secondary-light disabled:cursor-not-allowed' +
              ' focus:border-primary focus:text-inherit' +
              ' invalid:text-danger invalid:border-danger',
              className
            )
          } {...props} />
      </div>
    </div>
  );
}

export default forwardRef(TextareaCustom);