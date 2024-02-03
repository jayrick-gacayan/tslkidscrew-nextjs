export default function UpdateYearCycle() {
  return (
    <div className="space-y-4">
      <h1 className="font-medium text-[24px] text-black">Update Year Cycle</h1>
      <div className="rounded bg-secondary p-4">
        <div className="space-y-4 w-[576px]">
          <div className="flex items-center w-full gap-4">
            <div className="w-full">
              <h6 className="font-medium">Current year</h6>
            </div>
            <div className="w-full flex items-center gap-4 justify-between">
              <div className="flex-1">
                <input type='text' className="p-2 w-full bg-white rounded outline-0 outline-transparent" />
              </div>
              <div>to</div>
              <div className="flex-1">
                <input type='text' className="p-2 w-full bg-white rounded outline-0 outline-transparent" />
              </div>
            </div>
          </div>
          <div className="flex items-center w-full gap-4">
            <div className="w-full">
              <h6 className="font-medium">Next Year</h6>
            </div>
            <div className="w-full flex items-center gap-4 justify-between">
              <div className="flex-1">
                <input type='text' className="p-2 w-full bg-white rounded outline-0 outline-transparent" />
              </div>
              <div>to</div>
              <div className="flex-1">
                <input type='text' className="p-2 w-full bg-white rounded outline-0 outline-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}