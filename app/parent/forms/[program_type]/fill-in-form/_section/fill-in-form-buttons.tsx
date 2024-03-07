import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Parent } from "@/models/parent";
import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { reduxStore } from "@/react-redux/redux-store";
import { fillInFormReset } from "../_redux/fill-in-form-slice";
import Fa6BrandVisa from "@/app/_components/svg/fa6-brand-visa";

export default function FillInFormButtons({
  program_type,
  step,
  formAction,
  cardDetails,
}: {
  program_type: string;
  step: string | undefined;
  formAction: (formData: FormData) => void;
  cardDetails: Partial<Parent> | undefined
}) {
  const router = useRouter();
  const { pending } = useFormStatus();

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;

  let { card_brand, card_last_four } = cardDetails!;
  return (
    <>
      {
        cardDetails &&
        (<div>Card on File: {<span>{
          card_brand !== 'Visa' ? card_brand :
            <Fa6BrandVisa className="align-middle inline-block text-primary text-[32px]" />
        }</span>} ending ************{card_last_four}</div>)
      }
      <div className="flex items-center justify-center gap-4">
        <div className="flex-1">
          <span className="cursor-pointer transition-all delay-100 px-4 py-2 text-danger rounded border border-danger hover:bg-danger hover:text-white"
            onClick={() => {
              router.push(`/parent/forms/${program_type}`);
              reduxStore.dispatch(fillInFormReset());
            }}>
            Cancel
          </span>
        </div>
        <div className="flex-none w-auto">
          <div className="flex w-fit items-center gap-4">
            {
              stepInNumber > 1 &&
              (
                <button type='button'
                  value='back'
                  name="back-button"
                  className="px-4 py-2 bg-white text-primary rounded border border-primary"
                  onClick={() => {
                    if (stepInNumber > 1) {
                      let formData = new FormData();
                      formData.set('back-button', 'back');
                      formAction(formData);
                    }
                  }}>
                  Previous
                </button>
              )
            }
            {
              stepInNumber !== highestStep ?
                (
                  <button type="submit"
                    className="px-4 py-2 w-48 bg-primary text-white rounded disabled:cursor-not-allowed"
                    disabled={pending}>
                    {
                      !pending ? 'Next' :
                        (
                          <>
                            <Spinners3DotsScale className="inline-block mr-1" />
                            <span className="inline-block">Checking</span>
                          </>
                        )
                    }
                  </button>
                ) :
                (
                  <div>

                    <button type="submit"
                      className={`px-4 py-2 w-48 bg-primary text-white rounded disabled:cursor-not-allowed`}
                      disabled={pending}>
                      {
                        !cardDetails ? 'Submit and Pay' : 'Submit and Pay with Card on File'
                      }
                    </button>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </>

  )
}