import InputCustom from "@/app/_components/input-custom";
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { Dispatch, SetStateAction } from "react";
import { useFormStatus } from "react-dom";
import SettingListboxCustom from "../_components/setting-custom-lisbox";

export default function SummerCampPromoPricesForm({
  weekStr,
  setWeekStr,
  summerCampPromoData,
  weekNumbers,
}: {
  weekStr: string;
  setWeekStr: Dispatch<SetStateAction<string>>;
  summerCampPromoData: SummerCampPromoSetting[];
  weekNumbers: number[];
}) {

  const { pending } = useFormStatus();
  return (
    <>
      <div className="flex sm:flex-row flex-col items-start gap-2 sm:items-center">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Promos</h1>
        </div>
        <div className="flex-none sm:w-auto w-full">
          <div className="flex w-full sm:w-72 items-center gap-4">
            <div className="w-full">
              {/* <InputCheckboxCustom labelText="Enabled"
                id={`${weekStr}-summer-camp-promo-setting`}
                name="week-enabled"
                defaultChecked={summerCampPromoData?.with_swim_trip ?? false}
                form="summer-camp-promo-setting-form" /> */}
            </div>
            <SettingListboxCustom listboxData={weekStr}
              onChangeListbox={(value: any) => { setWeekStr(value) }}
              items={weekNumbers.map((numVal) => { return 'week-' + numVal; })}
              keyDescription='show-summer-camp-promo-week-setting' />
          </div>
        </div>
      </div>
      <form id='summer-camp-promo-setting-form'
        className="space-y-4">
        <div className="block bg-secondary p-4">
          <div className="w-full sm:w-8/12 block space-y-4">
            {
              [1, 2, 3].map((value, index: number) => {
                return (
                  <div key={`update-promos-children-${value}`}
                    className="flex sm:flex-row flex-col items-center justify-between gap-4 sm:gap-8">
                    <div className="w-full">
                      <h1 className="font-medium text-[20px]">
                        Children #{value}
                      </h1>
                    </div>
                    <div className="w-full">
                      <InputCustom type="text"
                        prefixIcon={<div className="absolute left-3 z-20 top-2 block">&#36;</div>}
                        inputMode="numeric"
                        className="bg-white p-2 pl-10"
                        defaultValue={summerCampPromoData[index].price ?? ''} />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="w-fit ml-auto block">
          <button className="bg-primary text-white p-2 rounded disabled:cursor-not-allowed"
            disabled={pending}>
            {pending ? '...Processing' : 'Update Promos'}
          </button>
        </div>
      </form>

    </>
  )
}