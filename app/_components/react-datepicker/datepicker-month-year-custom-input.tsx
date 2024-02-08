import { format } from "date-fns"
import { forwardRef, LegacyRef, MouseEventHandler } from "react"

function DatepickerMonthYearInputCustom(props: any, ref: LegacyRef<HTMLButtonElement> | undefined) {
  return (
    <button ref={ref}
      onClick={props.onClick}
      className='w-full focus:border-primary text-left border bg-white text-black p-3 rounded border-secondary-light'
      type="button">
      {format(new Date(props.value), 'MMMM yyyy')}
    </button>
  )
}

export default forwardRef(DatepickerMonthYearInputCustom);