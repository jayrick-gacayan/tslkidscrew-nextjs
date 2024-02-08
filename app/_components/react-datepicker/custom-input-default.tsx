
import { format } from "date-fns";
import { LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function CustomInputDefault(props: any, ref: LegacyRef<HTMLButtonElement> | undefined) {
  return (
    <button ref={ref}
      {...props}
      onClick={props.onClick}
      className={
        twMerge(
          'w-full focus:border-primary text-left border bg-secondary text-tertiary p-3 rounded border-secondary-light',
          props.className!
        )
      }
      type="button">
      {props.value === '' ? <>Place a start date:</> : format(new Date(props.value), "MMMM d, yyyy")}
    </button>
  )
}


export default forwardRef(CustomInputDefault);