import { CaptionProps, useNavigation } from "react-day-picker";
import ButtonDPNavHeader from "../react-datepicker/button-dp-nav-header";
import { format } from "date-fns";

export default function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth, } = useNavigation();
  return (
    <div className="flex w-full items-center gap-4 text-primary border-b-2 border-b-primary">
      <ButtonDPNavHeader disabled={!previousMonth}
        direction="left"
        onClick={() => { previousMonth && goToMonth(previousMonth) }} />
      <div className='flex-1 text-center'>
        {format(new Date(props.displayMonth), 'MMMM')}
      </div>
      <ButtonDPNavHeader disabled={!nextMonth}
        direction="right"
        onClick={() => nextMonth && goToMonth(nextMonth)} />
    </div>
  );
}