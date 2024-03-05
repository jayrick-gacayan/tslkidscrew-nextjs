import InputCustom from "@/app/_components/input-custom";
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { Dispatch, SetStateAction, useEffect } from "react";
import SettingListboxCustom from "../_components/setting-custom-lisbox";
import SettingFormSubmit from "../_components/setting-form-submit";
import { useFormState } from "react-dom";
import { updateSummerCampPromoSettingsAction } from "@/actions/program-settings-actions";
import { ValidationType } from "@/types/enums/validation-type";
import { pathRevalidate } from "@/actions/common-actions";
import { toast, ToastContentProps } from "react-toastify";

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

  const [state, formAction] = useFormState(updateSummerCampPromoSettingsAction, undefined as any)

  useEffect(() => {
    async function pathToRevalidate() {
      await pathRevalidate('/admin/settings')
    }

    if (state?.success !== undefined) {
      let { message, success } = state;
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{message}</div>
        )
      }, {
        toastId: `update-summer-camp-promo-setting-success-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });


      pathToRevalidate();
    }
  }, [state])

  return (
    <>
      <div className="flex sm:flex-row flex-col items-start gap-2 sm:items-center">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Promos</h1>
        </div>
        <div className="flex-none sm:w-auto w-full">
          <div className="flex w-full sm:w-72 items-center gap-4">
            <div className="w-full">

            </div>
            <SettingListboxCustom listboxData={weekStr}
              onChangeListbox={(value: any) => { setWeekStr(value) }}
              items={weekNumbers.map((numVal) => { return 'week-' + numVal; })}
              keyDescription='show-summer-camp-promo-week-setting' />
          </div>
        </div>
      </div>
      <form id='summer-camp-promo-setting-form-action'
        action={formAction}
        className="space-y-4">
        <div className="block bg-secondary p-4">
          <div className="w-full sm:w-8/12 block space-y-4">
            {
              summerCampPromoData.sort((b: SummerCampPromoSetting, a: SummerCampPromoSetting) => {
                return b.child_record_count! - a.child_record_count!
              }).map((value, index: number) => {
                console.log('errorText', state?.errors?.find((val: any) => { return val.id === value.id?.toString() }))
                return (
                  <div key={`update-promos-children-${index}`}
                    className="flex sm:flex-row flex-col items-center justify-between gap-4 sm:gap-8">
                    <div className="w-full">
                      <h1 className="font-medium text-[20px]">
                        Children #{value?.child_record_count}
                      </h1>
                    </div>
                    <div className="w-full">
                      <input type="hidden" name="summer-camp-promo[][id]" value={value?.id ?? 1} />
                      <input type="hidden" name="summer-camp-promo[][week-count]" value={value?.week_count ?? 1} />
                      <input type="hidden" name="summer-camp-promo[][child-record-count]" value={value?.child_record_count ?? 1} />
                      <input type="hidden" name="summer-camp-promo[][name]" value={value?.name ?? 1} />
                      <input type="hidden" name="summer-camp-promo[][swim-trip]"
                        value={(value?.with_swim_trip ? 'true' : 'false') ?? 'false'} />
                      <InputCustom type="text"
                        name='summer-camp-promo[][price]'
                        prefixIcon={<div className="absolute left-3 z-20 top-2 block">&#36;</div>}
                        inputMode="numeric"
                        className="bg-white p-2 pl-10"
                        defaultValue={value?.price ?? ''}
                        errorText={
                          state?.errors?.find((val: any) => { return val.id === value.id?.toString() })?.price?.errorText ?? ''
                        }
                        validationStatus={
                          state?.errors?.find((val: any) => { return val.id === value.id?.toString() })?.price?.validationStatus ?? ValidationType.NONE
                        } />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <SettingFormSubmit text='Update Promos' />
      </form>
    </>
  )
}