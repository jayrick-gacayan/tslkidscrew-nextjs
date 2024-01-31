'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function FillInFormButtons({
  program_type,
  step,
}: {
  program_type: string;
  step: string | undefined;
}) {
  const router = useRouter();

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;

  const programTypePath = useCallback((numberStep: number) => {
    router.push(`/parent/forms/${program_type}/fill-in-form${numberStep === 1 ? `` : `?step=${numberStep}`}`);
  }, [program_type, router])

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex-1">
        <Link href={`/parent/forms/${program_type}`}
          className="transition-all delay-100 px-4 py-2 text-danger rounded border border-danger hover:bg-danger hover:text-white">
          Cancel
        </Link>
      </div>
      <div className="flex-none w-auto">
        <div className="flex w-fit items-center gap-4">
          {
            stepInNumber > 1 &&
            (
              <button className="px-4 py-2 bg-white text-primary rounded border border-primary"
                onClick={() => {
                  if (stepInNumber > 1) {
                    programTypePath(stepInNumber - 1)
                  }
                }}>
                Previous
              </button>
            )
          }

          <button className="px-4 py-2 bg-primary text-white rounded"
            onClick={() => {
              if (stepInNumber < highestStep) {
                programTypePath(stepInNumber + 1)
              }

            }}>
            {stepInNumber === highestStep ? 'Proceed to Payment' : 'Next'}
          </button>
        </div>

      </div>
    </div>
  )
}