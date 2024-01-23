import { InputProps } from "@/types/props/input-props";
import { ChangeEvent, ReactNode } from "react";

export default function CustomInput({
  labelText,
  fieldInput,
  iconSuffix,
  type,
  onChange,
  inputMode,
}: {
  labelText: string | ReactNode;
  fieldInput: InputProps<string>;
  type: string;
  iconSuffix?: ReactNode;
  onChange: (value: string) => void;
  inputMode?: string;
}) {
  return (
    <div className="w-full space-y-[2px]">
      <label className="block space-y-1 w-full">
        <p className="font-semibold text-black">{labelText}</p>
        <div tabIndex={-1}
          className="flex items-center has-[input:focus]:border-primary border-transparent justify-between gap-4 bg-secondary overflow-hidden rounded border">
          <div className="flex-1 ">
            <input type={type}
              value={fieldInput.value}
              inputMode="numeric"
              className="p-2 w-full outline-0 outline-transparent rounded bg-transparent border-transparent"
              onChange={(event: ChangeEvent<HTMLInputElement>) => { onChange(event.target.value); }}
            />
          </div>
          {iconSuffix && <div className="flex-none">{iconSuffix}</div>}
        </div>
      </label>
    </div>

  )
}