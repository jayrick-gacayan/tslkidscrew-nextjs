import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting"
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { currencyFormat } from "@/types/helpers/currency-format";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useInteractions,
  FloatingFocusManager,
  useFocus
} from "@floating-ui/react";
import { useState } from "react";

export default function PopperWeekPromos({
  sumCampWeekPromo,
  promoPackage,
  onRadioButtonChange,
  summerCampWeeksForPromo,
  weeksForSummerCamp,
  onCheckboxChange,
}: {
  sumCampWeekPromo: SummerCampPromoSetting;
  promoPackage: SummerCampPromoSetting | undefined;
  onRadioButtonChange: (sumCampWeekPromo: SummerCampPromoSetting) => void;
  summerCampWeeksForPromo: Partial<SummerCampWeekSetting>[];
  weeksForSummerCamp: Partial<SummerCampWeekSetting>[];
  onCheckboxChange: (sumCampWeek: Partial<SummerCampWeekSetting>) => void;
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
  const focus = useFocus(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    focus
  ]);

  return (
    <div className="relative">
      <button type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        className="block">
        <label htmlFor={`${sumCampWeekPromo.id}-${sumCampWeekPromo.name}`}
          className="space-x-2 block cursor-pointer">
          <input type='hidden' name='summer-camp-promo-week' value={sumCampWeekPromo.week_count!} />
          <input type="radio"
            name='summer-camp-promo'
            id={`${sumCampWeekPromo.id}-${sumCampWeekPromo.name}`}
            className="transition-all form-radio border border-secondary-light h-6 w-6"
            value={sumCampWeekPromo.id}
            checked={promoPackage?.id === sumCampWeekPromo.id}
            onChange={() => { onRadioButtonChange(sumCampWeekPromo) }}
          />
          <span className="align-middle">
            {
              currencyFormat('en-US',
                { style: 'currency', currency: 'USD' },
                sumCampWeekPromo.price ?? 0
              )
            }
          </span>
        </label>
      </button>
      {
        popoverOpen &&
        <FloatingFocusManager closeOnFocusOut={true} context={context}>
          <div ref={refs.setFloating}
            style={floatingStyles}
            className="rounded-lg z-[99999] drop-shadow bg-white p-2 w-[360px] h-[360px] overflow-auto"
            {...getFloatingProps({ autoFocus: false })} >
            <div className="space-y-2 p-4">
              {
                summerCampWeeksForPromo.map((summerCampWeek: Partial<SummerCampWeekSetting>) => {
                  return (
                    <InputCheckboxCustom key={`summer-camp-reg-weeks-${summerCampWeek.id}`}
                      id={`summer-camp-reg-weeks-${summerCampWeek.id}`}
                      labelText={summerCampWeek.name}
                      name='summer-camp-reg-weeks[]'
                      checked={weeksForSummerCamp.find((value: Partial<SummerCampWeekSetting>) => {
                        return value.id === summerCampWeek.id;
                      }) ? true : false}
                      onChange={() => { onCheckboxChange(summerCampWeek); }}
                      value={summerCampWeek.id} />
                  );
                })
              }
            </div>
          </div>
        </FloatingFocusManager>
      }
    </div>
  )
}