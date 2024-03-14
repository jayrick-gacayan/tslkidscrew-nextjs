import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { currencyFormat } from "@/types/helpers/currency-format";

export default function WeekPromos({
  weekNum,
  summerCampPerWeekPromos,
  promoPackage,
  onChange,
}: {
  weekNum: number
  summerCampPerWeekPromos: SummerCampPromoSetting[],
  promoPackage: SummerCampPromoSetting | undefined;
  onChange: (val: SummerCampPromoSetting) => void;
}) {
  return (
    <div className="space-y-4 w-full">
      <div className="font-bold">{weekNum} weeks promos</div>
      <div className="block space-y-2">
        {
          summerCampPerWeekPromos.length === 0 ?
            (<div className="text-danger">No Promos Available</div>) :
            (
              <>
                {
                  summerCampPerWeekPromos.map((val: SummerCampPromoSetting, index: number) => {
                    return (
                      <label key={`${val.id}-${index}`}
                        htmlFor={`${val.id}-${index}`}
                        className="space-x-2 block cursor-pointer">
                        <input type="radio"
                          id={`${val.id}-${index}`}
                          className="form-radio border border-secondary-light h-5 w-5"
                          value={val.id}
                          checked={promoPackage?.id === val.id}
                          onChange={() => { onChange(val) }}
                        />
                        <span className="align-middle">
                          {
                            currencyFormat('en-US',
                              { style: 'currency', currency: 'USD' },
                              val.price ?? 0
                            )
                          }
                        </span>
                      </label>
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