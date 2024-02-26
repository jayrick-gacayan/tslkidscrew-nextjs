import { format } from "date-fns"
import { ForwardedRef, forwardRef } from "react"

function DatepickerMonthYearInputCustom(props: any, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <button ref={ref}
      onClick={props.onClick}
      className='w-full focus:border-primary text-left border bg-white text-black p-3 rounded border-secondary-light'
      type="button">
      <input type='hidden' name={props.name} value={props.value} onChange={() => { }} />
      {format(new Date(props.value), 'MMMM yyyy')}
    </button>
  )
}

export default forwardRef(DatepickerMonthYearInputCustom);