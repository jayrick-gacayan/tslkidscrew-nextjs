import { ReactNode } from "react";

export default function FormsRadioButton({
  labelText,
  current,
  value,
  onChange,
  labelClassName,
  renderRadio,
}: {
  labelText: ReactNode | string;
  value: string;
  current: string;
  onChange: (value: string) => void;
  labelClassName: string;
  renderRadio: (value: string, current: string) => ReactNode
}) {
  return (
    <label className={labelClassName}>
      <input type="radio"
        checked={value === current}
        className="hidden peer"
        onChange={() => { onChange(current === value ? '' : value) }} />
      {renderRadio(value, current)}
      <span className="inline-block align-middle">{labelText}</span>
    </label>
  )

}