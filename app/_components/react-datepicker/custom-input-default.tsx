
import { format } from "date-fns";
import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function CustomInputDefault(props: any, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <button ref={ref}
      {...props}
      className={
        twMerge(
          'w-full focus:border-primary text-left border bg-secondary text-tertiary p-3 rounded border-secondary-light',
          props.className!
        )
      }
      type="button">
      <input type='hidden' name={props.name} value={props.value} onChange={() => { }} />
      {props.value === '' ? <>Place a start date:</> : format(new Date(props.value), "MMMM d, yyyy")}
    </button>
  )
}



export default forwardRef(CustomInputDefault);