import { InputProps } from "@/types/props/input-props";
import { ChangeEvent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function CustomInput({
  labelText,
  fieldInput,
  iconSuffix,
  iconPrefix,
  type,
  onChange,
  inputMode,
  className,
  name,
  disabled = false,
  placeholder,
}: {
  labelText?: string | ReactNode;
  fieldInput: InputProps<string>;
  type: string;
  iconPrefix?: ReactNode;
  iconSuffix?: ReactNode;
  onChange?: (value: string) => void;
  inputMode?: "text" | "email" | "search" | "none" | "tel" | "url" | "numeric" | "decimal";
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
}) {

  return (
    <div className="w-full space-y-[2px]">
      <label className="block space-y-1 w-full">
        {labelText && (<p className="font-semibold text-black">{labelText}</p>)}
        <div tabIndex={-1}
          className={
            twMerge(
              'flex items-center has-[input:disabled]:cursor-not-allowed has-[input:focus]:border-primary border-transparent justify-between gap-4 bg-secondary overflow-hidden rounded border',
              `${className!}`
            )
          }>
          {iconPrefix && <div className="flex-none">{iconPrefix}</div>}
          <div className="flex-1">
            <input type={type}
              placeholder={placeholder!}
              inputMode={inputMode!}
              disabled={disabled}
              name={name!}
              defaultValue={fieldInput.value}
              className={
                twMerge(
                  'p-2 placeholder:text-secondary-light disabled:cursor-not-allowed block w-full outline-0 outline-transparent rounded bg-transparent border-transparent',
                  type === 'month' ? 'appearance-none' : ''
                )
              }
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange && onChange(event.target.value);
              }}
            />
          </div>
          {iconSuffix && <div className="flex-none">{iconSuffix}</div>}
        </div>
      </label>
    </div>
  )
}