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
      <label className="flex items-center gap-2">
        <input type="checkbox"
          className="border-[.1rem] border-secondary-light h-5 w-5 inline-block checkbox checked:border-primary [--chkbg:theme(colors.white)] [--chkfg:theme(colors.primary)] rounded"
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