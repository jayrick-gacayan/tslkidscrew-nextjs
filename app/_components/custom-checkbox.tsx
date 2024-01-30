import { ChangeEvent, ReactNode } from "react";

export default function CustomCheckbox({
  value,
  onChange,
  text,
  name,
}: {
  value: boolean;
  onChange?: (value: boolean) => void;
  text: string | ReactNode;
  name?: string
}) {
  return (
    <div className="block form-control">
      <label className="flex items-center gap-4 w-fit">
        <input type="checkbox"
          className="form-checkbox checked:text-primary h-5 w-5 rounded border border-secondary-light ring-0 ring-transparent"
          checked={value}
          name={name!}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(event.target.checked)
          }}
        />
        <span className="block">{text}</span>
      </label>
    </div>
  )
}