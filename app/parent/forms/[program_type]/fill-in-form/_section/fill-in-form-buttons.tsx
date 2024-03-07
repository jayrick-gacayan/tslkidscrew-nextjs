import { useFillInFormHook } from "../_context/use-fill-in-form-hook";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export default function FillInFormButtons({
  program_type,
  step,
  formAction,
}: {
  program_type: string;
  step: string | undefined;
  formAction: (formData: FormData) => void;
}) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const { resetForm } = useFillInFormHook();

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex-1">
        <span className="cursor-pointer transition-all delay-100 px-4 py-2 text-danger rounded border border-danger hover:bg-danger hover:text-white"
          onClick={() => {
            router.push(`/parent/forms/${program_type}`);
            resetForm();
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
          <button type="submit"
            className="px-4 py-2 bg-primary text-white rounded disabled:cursor-not-allowed"
            disabled={pending}>
            {stepInNumber === highestStep ? 'Proceed to Payment' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}