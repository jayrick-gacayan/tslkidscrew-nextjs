'use client';

import Link from "next/link";
import { useFillInFormHook } from "../_context/use-fill-in-form-hook";
import { useFormStatus } from "react-dom";

export default function FillInFormButtons({
  program_type,
  step,
  programTypePath,
}: {
  program_type: string;
  step: string | undefined;
  programTypePath: (numberStep: number) => void;
}) {
  const { pending } = useFormStatus();
  const { stripeModalToggle, resetForm } = useFillInFormHook();

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex-1">
        <Link href={`/parent/forms/${program_type}`}
          className="transition-all delay-100 px-4 py-2 text-danger rounded border border-danger hover:bg-danger hover:text-white"
          onClick={() => { resetForm(); }}>
          Cancel
        </Link>
      </div>
      <div className="flex-none w-auto">
        <div className="flex w-fit items-center gap-4">
          {
            stepInNumber > 1 &&
            (
              <button type='button'
                className="px-4 py-2 bg-white text-primary rounded border border-primary"
                onClick={async () => {

                  if (stepInNumber > 1) {
                    programTypePath(stepInNumber - 1);
                    // redirectToPath(`/parent/forms/${program_type}/fill-in-form${stepInNumber === 1 ? `` : `?step=${stepInNumber - 1}`}`)
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