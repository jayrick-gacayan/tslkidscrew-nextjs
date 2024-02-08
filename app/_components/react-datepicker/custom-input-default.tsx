
import { format } from "date-fns";
import { LegacyRef, forwardRef } from "react";

function CustomInputDefault(props: any, ref: LegacyRef<HTMLButtonElement> | undefined) {

  return (
    <button ref={ref}
      onClick={props.onClick}
      className='w-full focus:border-primary text-left border bg-secondary text-tertiary p-3 rounded border-secondary-light'
      type="button">
      {format(new Date(props.value), "MMMM d, yyyy")}
    </button>
  )
}


export default forwardRef(CustomInputDefault);