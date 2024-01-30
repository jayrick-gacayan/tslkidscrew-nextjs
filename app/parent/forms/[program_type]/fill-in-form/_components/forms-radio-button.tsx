import { ReactNode } from "react";

export default function FormsRadioButton({
  labelText,
  current,
  value,
  onChange,
}: {
  labelText: ReactNode | string;
  value: string;
  current: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white
      rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer">
      <input type="radio"
        checked={value === current}
        className="hidden peer"
        onChange={() => { onChange(current === value ? '' : value) }} />
      <span className="rounded-full border border-warning h-5 w-5 p-1">
        <span className={`transition-all duration-100 ${value === current ? 'bg-warning' : 'bg-transparent'} h-full w-full block rounded-full`} />
      </span>
      <span>{labelText}</span>
    </label>
  )

}