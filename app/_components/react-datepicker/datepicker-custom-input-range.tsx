import { format } from "date-fns";
import { forwardRef, LegacyRef } from "react"

function DatepickerInputCustomRange(props: any, ref: LegacyRef<HTMLButtonElement> | undefined) {
  const splitValue = props.value.split(' - ');

  return (
    <button ref={ref}
      onClick={props.onClick}
      className='w-full focus:border-primary text-left border bg-white text-black p-3 rounded border-secondary-light'
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