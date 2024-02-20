import { pathRevalidate } from "@/actions/common-actions";
import { updateSummerCampSwimSettingAction } from "@/actions/program-settings-actions";
import InputCustom from "@/app/_components/input-custom";
import Fa6SolidSquareCheck from "@/app/_components/svg/fa6-solid-square-check";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast, ToastContentProps } from "react-toastify";
import { useOnClickOutside } from "usehooks-ts";

export default function SummerCampSwimSettingForm({
  summerCampSwimSetting,
  setFocusId,
  focusId,
}: {
  summerCampSwimSetting: SummerCampSwimSetting
  setFocusId: Dispatch<SetStateAction<number | undefined>>
  focusId?: number;
}) {
  const formContainerRef = useRef(null);
  const [state, formAction] = useFormState(
    updateSummerCampSwimSettingAction.bind(null, summerCampSwimSetting.id!),
    {
      ["swim-price"]: fieldInputValue(summerCampSwimSetting.price?.toString() ?? '')
    }
  )
  const { pending } = useFormStatus();

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
        toastId: `update-summer-camp-swim-setting-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      })

      if (success) {
        pathToRevalidate();
        setFocusId(undefined)
      }
    }
  }, [
    state?.message,
    state?.success
  ])

  useOnClickOutside(formContainerRef, () => {
    setFocusId(undefined);
  })

  return (
    <div ref={formContainerRef} onClick={() => {
      setFocusId(summerCampSwimSetting.id)
    }}>
      <span className={`border border-secondary-light p-3 bg-white rounded text-center 
        ${focusId === summerCampSwimSetting.id ? 'hidden' : 'block'}`}>
        {
          Intl.NumberFormat('en-US', {
            style: "currency",
            currency: 'USD',
          }).format(summerCampSwimSetting.price!)
        }
      </span>

      <form action={formAction}
        id={`summer-camp-swim-setting-${summerCampSwimSetting.id}`}
        className={`items-center justify-between gap-[4px] 
        ${focusId === summerCampSwimSetting.id ? 'flex' : 'hidden'}`}>
        <input type="hidden" value={summerCampSwimSetting.child_record_count} name='chlld-record-count' />
        <input type="hidden" value={summerCampSwimSetting.week_count} name='week-count' />
        <input type="hidden" value={summerCampSwimSetting.with_swim_trip ? 'true' : 'false'} name='with-swim-trip' />
        <InputCustom type="text"
          inputMode="numeric"
          name="swim-price"
          defaultValue={summerCampSwimSetting.price?.toString() ?? ''}
          className="bg-white text-center" />
        <button type="submit"
          disabled={pending}
          className="cursor-pointer disabled:cursor-not-allowed">
          <Fa6SolidSquareCheck className="text-success text-[32px]" />
        </button>

      </form>
    </div>
  )
}