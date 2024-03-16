import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import PopperWeekPromos from "./popper-week-promos";

export default function WeekPromos({
  weekNum,
  summerCampPerWeekPromos,
  promoPackage,
  onChange,
  summerCampWeeksForPromo,
  weeksForSummerCamp,
  onCheckboxChange,
}: {
  weekNum: number
  summerCampPerWeekPromos: SummerCampPromoSetting[],
  promoPackage: SummerCampPromoSetting | undefined;
  onChange: (val: SummerCampPromoSetting) => void;
  summerCampWeeksForPromo: Partial<SummerCampWeekSetting>[];
  weeksForSummerCamp: Partial<SummerCampWeekSetting>[];
  onCheckboxChange: (summerCampWeek: Partial<SummerCampWeekSetting>) => void;
}) {

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="font-bold flex-none">{weekNum} weeks promos</div>
      <div className="block space-y-2 flex-1">
        {
          summerCampPerWeekPromos.length === 0 ?
            (
              <div className="text-danger flex items-center justify-center h-full">
                <div className="w-full">No Promos Available</div>
              </div>
            ) :
            (
              <>
                {
                  summerCampPerWeekPromos.map((val: SummerCampPromoSetting, index: number) => {
                    return (
                      <PopperWeekPromos key={`${val.id}-${index}`}
                        sumCampWeekPromo={val}
                        promoPackage={promoPackage}
                        onRadioButtonChange={onChange}
                        summerCampWeeksForPromo={summerCampWeeksForPromo}
                        weeksForSummerCamp={weeksForSummerCamp}
                        onCheckboxChange={onCheckboxChange} />
                    )
                  })
                }
              </>
            )
        }
      </div>
    </div>
  )
}