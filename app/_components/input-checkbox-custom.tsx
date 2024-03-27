import { ValidationType } from "@/types/enums/validation-type";
import { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
export interface InputPropsCheckbox extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string | ReactNode;
  errorText?: string;
  validationType?: ValidationType;
}

function InputCustomCheckbox(
  {
    labelText,
    errorText = '',
    validationType = ValidationType.NONE,
    className,
    id,
    checked,
    ...props
  }: InputPropsCheckbox,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="block">
      <label htmlFor={id}
        className="flex items-center gap-3 w-fit">
        <input id={id}
          type='checkbox'
          checked={checked}
          className={
            twMerge(
              'peer form-checkbox h-5 w-5 rounded border border-secondary-light ring-0 ring-transparent outline-0 outline-transparent' +
              ' checked:text-primary' +
              ' disabled:text-secondary-light disabled:cursor-not-allowed',
              className!,
              errorText !== '' ? 'border-danger bg-danger-light' : '',
            )
          }
          {...props} />
        {labelText && <span className="block">{labelText}</span>}
      </label>
      {errorText !== '' && <div className="text-danger">{errorText}</div>}
    </div>
  )
}

export default forwardRef(InputCustomCheckbox);