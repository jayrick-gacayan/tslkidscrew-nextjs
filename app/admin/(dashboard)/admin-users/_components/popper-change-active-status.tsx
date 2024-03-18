import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useFocus,
  useInteractions,
  FloatingFocusManager
} from "@floating-ui/react";
import { useState } from "react";
import Fa6UserXmark from "@/app/_components/svg/fa6-solid-user-xmark";
import Fa6SolidUserCheck from "@/app/_components/svg/fa6-solid-user-check";

export default function PopoverChangeActiveStatus({
  activeAdmin,
  onClick
}: {
  activeAdmin: 'Yes' | 'No',
  onClick: () => Promise<void>
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: popoverOpen,
    onOpenChange(isOpen, event, reason) {
      setPopoverOpen(isOpen);
      event && console.log(event);
      reason && console.log(reason);
    },
    middleware: [
      offset(4),
      flip({ fallbackAxisSideDirection: "end" }),
      shift()
    ],

    whileElementsMounted: autoUpdate
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const focus = useFocus(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    focus
  ]);

  let ActiveIcon = activeAdmin === 'Yes' ? Fa6UserXmark : Fa6SolidUserCheck;

  // console.log('getFloatingProps', context);
  return (
    <div className="relative">
      <button type="button"
        ref={refs.setReference}

        {...getReferenceProps()}
        className="group/activeStatus block space-x-2">
        <span className="align-middle">{activeAdmin}</span>
        <span className={`transtion-all delay-100 inline-block align-middle ${popoverOpen ? '-rotate-90' : 'rotate-0'}`}>
          <Fa6SolidChevronDown />
        </span>
      </button>
      {
        popoverOpen &&
        <FloatingFocusManager closeOnFocusOut={true} context={context}>
          <div ref={refs.setFloating}
            style={floatingStyles}
            className="rounded-lg z-[99999] drop-shadow bg-white w-36 overflow-hidden"
            {...getFloatingProps()}>
            <button type="button"
              onClick={async () => {
                context.onOpenChange(!popoverOpen);
                onClick();
              }}
              className={`py-2 w-full overflow-hidden ${activeAdmin === 'No' ? 'bg-success hover:bg-success/55' : 'bg-danger hover:bg-danger-light/90'} text-white`}>
              <ActiveIcon className="inline-block mr-[6px]" />
              <span className="inline-block align-middle">{activeAdmin === 'Yes' ? 'Deactivate' : 'Activate'}</span>
            </button>
            {/* <div className="space-y-2 p-4">
              {
                summerCampWeeksForPromo.map((summerCampWeek: Partial<SummerCampWeekSetting>) => {
                  return (
                    <InputCheckboxCustom key={`summer-camp-reg-weeks-${summerCampWeek.id}`}
                      id={`summer-camp-reg-weeks-${summerCampWeek.id}`}
                      labelText={summerCampWeek.name}
                      autoFocus={false}
                      checked={weeksForSummerCamp.find((value: Partial<SummerCampWeekSetting>) => {
                        return value.id === summerCampWeek.id;
                      }) ? true : false}
                      onChange={() => { onCheckboxChange(summerCampWeek); }}
                      value={summerCampWeek.id} />
                  );
                })
              }
            </div> */}
          </div>
        </FloatingFocusManager>
      }
    </div>
  )
}