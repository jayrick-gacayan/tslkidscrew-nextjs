import { ChangeEvent, ReactNode } from "react";

export default function CustomCheckbox({
  value,
  onChange,
  text,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  text: string | ReactNode;
}) {
  return (
    <div className="block form-control">
      <label className="flex items-center gap-2 w-fit">
        <input type="checkbox"
          className="form-checkbox checked:text-primary h-5 w-5 rounded border border-secondary-light ring-0 ring-transparent"
          checked={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.checked)
          }}
        />
        <span className="block">{text}</span>
      </label>
    </div>
  )
}