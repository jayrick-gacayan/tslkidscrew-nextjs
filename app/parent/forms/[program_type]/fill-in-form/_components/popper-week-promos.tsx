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
  useInteractions,
  useDismiss,
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
    onOpenChange(isOpen, event, reason) {
      setPopoverOpen(isOpen);
      event && console.log('event', event);
      reason && console.log('reason', reason);
    },
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
    <div className="relative">
      <label ref={refs.setReference}
        {...getReferenceProps()}
        htmlFor={`${sumCampWeekPromo.id}-${sumCampWeekPromo.name}`}
        className="space-x-2 w-fit block cursor-pointer">
        <input type='hidden' name='summer-camp-promo-week' value={sumCampWeekPromo.week_count!} />
        <input type="radio"
          name='summer-camp-promo'
          id={`${sumCampWeekPromo.id}-${sumCampWeekPromo.name}`}
          className="transition-all form-radio border border-secondary-light h-6 w-6"
          value={sumCampWeekPromo.id}
          checked={promoPackage?.id === sumCampWeekPromo.id}
          onChange={() => {
            onRadioButtonChange(sumCampWeekPromo)
          }}
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
      {
        popoverOpen &&
        <div ref={refs.setFloating}
          style={floatingStyles}
          className="rounded-lg z-[99999] drop-shadow bg-white p-2 w-[360px] h-[360px] overflow-auto"
          {...getFloatingProps()}>
          <div className="p-4">
            <div className="space-y-2">
              {
                summerCampWeeksForPromo.map((summerCampWeek: Partial<SummerCampWeekSetting>, index: number) => {
                  return (
                    <InputCheckboxCustom key={`summer-camp-reg-weeks-${summerCampWeek.id}-${index}`}
                      id={`summer-camp-reg-weeks-${summerCampWeek.id}`}
                      labelText={summerCampWeek.name}
                      checked={weeksForSummerCamp.find((value: Partial<SummerCampWeekSetting>) => {
                        return value.id === summerCampWeek.id;
                      }) ? true : false}
                      onChange={() => {
                        onCheckboxChange(summerCampWeek);
                      }}
                      value={summerCampWeek.id!}
                    />
                  );
                })
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}