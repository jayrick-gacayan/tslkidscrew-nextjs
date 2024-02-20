import { addYears, format } from "date-fns"
import { ForwardedRef, forwardRef } from "react"

function DatepickerYearToYearInputCustom(props: any, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <button ref={ref}
      onClick={props.onClick}
      className='w-full focus:border-primary text-center border bg-white text-black p-3 rounded border-secondary-light'
      type="button">
      {format(new Date(props.value), 'yyyy')}-{format(addYears(new Date(props.value), 1), 'yyyy')}
    </button>
  )
}

export default forwardRef(DatepickerYearToYearInputCustom);