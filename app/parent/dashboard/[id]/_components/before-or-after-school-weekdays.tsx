import InfoContainer from "@/app/admin/(dashboard)/_components/info-container"
import { ReactNode } from "react"

export default function BeforeOrAfterSchoolWeekdays({
  labelText,
  data
}: {
  labelText: string | ReactNode
  data: any[]
}) {
  return (
    <div className="space-y-4 w-full">
      <h4 className="font-medium">{labelText}</h4>
      <div className="rounded p-4 bg-secondary w-full">
        <div className="w-full xl:w-[512px] space-y-2">
          {
            data.map((value: any) => {
              return (
                <InfoContainer key={`before-after-weekdays-${value.labelText}`}
                  label={value.day}
                  data={value.dayChecked ? 'Yes' : 'No'}
                  className="mb-0" />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}