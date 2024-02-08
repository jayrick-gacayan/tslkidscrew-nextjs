export default function renderDayContents(dayOfMonth: number, date?: Date | undefined) {
  return (
    <div className="">
      {date?.getDate()}
    </div>
  )
}