export function renderMonthContent(month: number, shortMonth: string, fullMonthText: string) {
  return (
    <div className="block py-2 px-3 hover:bg-secondary-light cursor-pointer">
      {fullMonthText}
    </div>);
};