import { useFormStatus } from "react-dom";
import { Parent } from "@/models/parent";
import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import Fa6BrandVisa from "@/app/_components/svg/fa6-brand-visa";
import ButtonForPlaid from "./button-for-plaid";
import Link from "next/link";


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
  const { pending } = useFormStatus();

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;

  return (
    <>
      {
        cardDetails && (stepInNumber === highestStep) &&
        (<div>Card on File: {<span>{
          cardDetails?.card_brand !== 'Visa' ? cardDetails?.card_brand :
            <Fa6BrandVisa className="align-middle inline-block text-primary text-[32px]" />
        }</span>} ending ************{cardDetails?.card_last_four}</div>)
      }
      <div className="flex items-center justify-center gap-4">
        <div className="flex-1">
          <Link href={`/parent/forms/${program_type}`} className="cursor-pointer transition-all delay-100 px-4 py-2 text-danger rounded border border-danger hover:bg-danger hover:text-white">
            Cancel
          </Link>
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
                  <div className="space-x-2">
                    <ButtonForPlaid />
                    <button type="submit"
                      className={`px-4 py-2 w-44 bg-primary text-white rounded disabled:cursor-not-allowed`}
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