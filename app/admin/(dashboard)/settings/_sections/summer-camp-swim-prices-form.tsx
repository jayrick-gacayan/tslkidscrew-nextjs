import { pathRevalidate } from "@/actions/common-actions";
import { updateSummerCampSwimSettingAction } from "@/actions/program-settings-actions";
import InputCustom from "@/app/_components/input-custom";
import Fa6SolidSquareCheck from "@/app/_components/svg/fa6-solid-square-check";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast, ToastContentProps } from "react-toastify";

export default function SummerCampSwimSettingForm({
  summerCampSwimSetting,
  setFocusId,
  focusId,
}: {
  summerCampSwimSetting: SummerCampSwimSetting
  setFocusId: Dispatch<SetStateAction<number | undefined>>
  focusId?: number;
}) {
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
          <div className="text-black">
            {message}
          </div>
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


  return (
    <div onClick={() => {
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

        <InputCustom type="text"
          inputMode="numeric"
          name="swim-price"
          defaultValue={summerCampSwimSetting.price?.toString() ?? ''}
          className="bg-white text-center" />
        <button type="submit"
          className="cursor-pointer">
          <Fa6SolidSquareCheck className="text-success text-[32px]" />
        </button>

      </form>
    </div>
  )
}