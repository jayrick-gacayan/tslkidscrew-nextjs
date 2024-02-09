import { format } from "date-fns";
import { ForwardedRef, forwardRef } from "react"

function DatepickerInputCustomRange(props: any, ref: ForwardedRef<HTMLButtonElement>) {
  const splitValue = props.value.split(' - ');

  return (
    <button ref={ref}
      onClick={props.onClick}
      className='relative z-0 w-full focus:border-primary text-left border bg-white text-black p-3 rounded border-secondary-light'
      type="button">
      {
        splitValue[1] !== '' ?
          (
            <>
              {format(new Date(splitValue[0]), 'MMMM d, yyyy')} to {format(new Date(splitValue[1]), 'MMMM d, yyyy')}
            </>
          ) : (<>&nbsp;</>)
      }

    </button>
  )
}

export default forwardRef(DatepickerInputCustomRange);