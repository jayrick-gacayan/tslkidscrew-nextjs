import { ReactNode } from "react";

export default function FormsRadioButton({
  labelText,
  current,
  value,
  name,
  onChange,
  labelClassName,
  renderRadio,
  disabled,
}: {
  labelText: ReactNode | string;
  value: string;
  current: string;
  name: string;
  onChange: (value: string) => void;
  labelClassName: string;
  renderRadio: (value: string, current: string) => ReactNode;
  disabled?: boolean;
}) {
  return (
    <label className={labelClassName}>
      <input type="radio"
        value={value}
        checked={value === current}
        className="hidden peer"
        name={name}
        disabled={disabled}
        onChange={() => { onChange(current === value ? '' : value) }} />
      {renderRadio(value, current)}
      <span className="inline-block align-middle">{labelText}</span>
    </label>
  )

}