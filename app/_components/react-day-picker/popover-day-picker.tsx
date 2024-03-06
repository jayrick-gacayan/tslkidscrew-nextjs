import {
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  offset,
  flip,
  shift,
} from "@floating-ui/react";
import { format } from 'date-fns';
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import CustomCaption from "@/app/_components/react-day-picker/custom-caption";

export default function PopoverReactDayPicker({
  selected,
  placeholder,
  options,
  inputName,
}: {
  selected: Date | Date[] | undefined;
  placeholder: string;
  options: any;
  inputName: string;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: popoverOpen,
    onOpenChange: setPopoverOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss
  ]);

  return (
    <div className="relative w-full">
      <button ref={refs.setReference}
        type="button"
        className="w-full focus:border-primary text-left border bg-white text-black p-3 rounded border-secondary-light"
        {...getReferenceProps()}>
        <input type='hidden' name={inputName} value={
          !selected ? '' :
            !Array.isArray(selected) ?
              format(selected, 'yyyy-MM-dd') :
              selected.length === 0 ? '' :
                selected.map((value: Date) => {
                  return format(value, 'LLLL-d-yyyy')
                }).join(',')
        } />
        {
          !selected ? placeholder :
            !Array.isArray(selected) ? format(selected, inputName === 'week-start-date' ? 'MM/dd/yyyy' : 'MMMM d, yyyy') :
              selected.length === 0 ? placeholder :
                selected.map((value: Date) => {
                  return format(value, 'LLL. d, yyyy')
                }).join(', ')
        }
      </button>
      {
        popoverOpen &&
        (
          <div ref={refs.setFloating}
            style={floatingStyles}
            className="w-full z-[99999]"
            {...getFloatingProps()}>
            <DayPicker components={{ Caption: CustomCaption }}
              formatters={{
                formatWeekdayName: (date) => { return format(date, 'EEE') }
              }}
              classNames={{
                root: 'flex items-stretch sm:flex-row flex-col bg-white rounded border border-secondary-light shadow-lg sm:max-h-fit max-h-[352px] overflow-auto w-full',
                months: 'w-full',
                month: 'w-full',
                table: "w-full border-collapse",
                head_row: "font-medium",
                head_cell: "p-2 w-auto font-medium text-sm text-center",
                cell: "w-auto text-center text-sm ",
                day: "p-2 text-primary w-full hover:bg-secondary-light rounded",
                day_selected: "bg-primary text-white",
              }}

              {...options} />
          </div>
        )
      }
    </div>
  )
}