import { pathRevalidate } from "@/actions/common-actions";
import { updateSummerCampSwimSettingAction } from "@/actions/program-settings-actions";
import InputCustom from "@/app/_components/input-custom";
import Fa6SolidSquareCheck from "@/app/_components/svg/fa6-solid-square-check";
import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";
import { currencyFormat } from "@/types/helpers/currency-format";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { SummerCampSwimSettingFormStateProps } from "@/types/props/summer-camp-swim-setting-form-state-props";
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast, ToastContentProps } from "react-toastify";

function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit"
      disabled={pending}
      className="cursor-pointer disabled:cursor-not-allowed">
      {
        pending ? <Spinners3DotsScale className="text-success text-[32px]" /> : <Fa6SolidSquareCheck className="text-success text-[32px]" />
      }
    </button>
  )
}

export default function SummerCampSwimSettingTableFormData({
  summerCampSwimSetting,
  setFocusId,
  focusId,
}: {
  summerCampSwimSetting: SummerCampSwimSetting
  setFocusId: Dispatch<SetStateAction<number | undefined>>
  focusId?: number;
}) {
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [state, formAction] = useFormState(
    updateSummerCampSwimSettingAction.bind(null, summerCampSwimSetting.id!),
    {
      ["summer-camp-swim-price"]: fieldInputValue(summerCampSwimSetting.price?.toString() ?? '')
    } as SummerCampSwimSettingFormStateProps
  )

  useEffect(() => {
    async function pathToRevalidate() {
      await pathRevalidate('/admin/settings')
    }
    let { message, success } = state;
    if (success !== undefined) {
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{message}</div>
        )
      }, {
        toastId: `update-summer-camp-swim-setting-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      })
      pathToRevalidate();
      setFocusId(undefined)
    }
  }, [
    state,
    setFocusId,
  ])

  return (
    <div ref={formContainerRef}
      id={`summer-camp-swim-prices-${summerCampSwimSetting.id!}`}
      className="relative">
      <div className={(focusId && summerCampSwimSetting.id === focusId) ? 'block' : 'hidden'}>
        <form className='relative z-0 flex items-center justify-between gap-[4px]'
          id={`summer-camp-swim-setting-${summerCampSwimSetting.with_swim_trip}-${summerCampSwimSetting.id}`}
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            let formData = new FormData(event.currentTarget)
            formAction(formData)
          }}>
          <input type="hidden"
            value={summerCampSwimSetting.child_record_count}
            name='summer-camp-swim-chlld-record-count' />
          <input type="hidden"
            value={summerCampSwimSetting.week_count}
            name='summer-camp-swim-week-count' />
          <input type="hidden"
            value={summerCampSwimSetting.with_swim_trip ? 'true' : 'false'}
            name='summer-camp-swim-with-swim-trip' />
          <InputCustom type="text"
            id={`summer-camp-swim-prices-input-${summerCampSwimSetting.id!}`}
            inputMode="numeric"
            name="summer-camp-swim-price"
            defaultValue={summerCampSwimSetting.price?.toString() ?? ''}
            className="bg-white text-center" />
          <ButtonSubmit />
        </form>
      </div>
      <span className={`border border-secondary-light p-3 bg-white rounded text-center 
         ${summerCampSwimSetting.id !== focusId ? 'block' : 'hidden'}`}
        onClick={() => { setFocusId(summerCampSwimSetting.id) }}>
        {
          currencyFormat('en-US', { style: "currency", currency: 'USD', }, summerCampSwimSetting.price ?? 0)
        }
      </span>
    </div>
  )
}