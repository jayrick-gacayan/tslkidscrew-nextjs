import Fa6SolidTrashCan from "@/app/_components/svg/fa6-solid-trash-can";

const emails = [{ id: 1, email: 'jake@kodakollectiv.com' }];

export default function EmailListNotifications() {
  return (
    <div className="block space-y-4">
      {
        emails.map((value: any, index: number) => {
          return (
            <div key={`email-list-notifications-${value.email}`}
              className="flex items-center justify-between p-4 gap-4">
              <div className="flex-1">
                {value.email}
              </div>
              <div className="flex-none">
                <Fa6SolidTrashCan className="text-danger text-[24px]" />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}