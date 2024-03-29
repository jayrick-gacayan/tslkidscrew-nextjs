import Fa6SolidChevronLeft from "../svg/fa6-solid-chevron-left";
import Fa6SolidChevronRight from "../svg/fa6-solid-chevron-right";

export default function ButtonDPNavHeader({
  onClick,
  disabled,
  direction,
  conditionCustomHeaderCount
}: {
  disabled: boolean;
  direction: string;
  onClick: () => void;
  conditionCustomHeaderCount?: boolean;
}) {
  const Icon = direction === 'left' ? Fa6SolidChevronLeft : Fa6SolidChevronRight;

  return (
    <button type="button"
      onClick={onClick}
      className={`p-3 
        ${disabled ? 'disabled:cursor-not-allowed' : 'cursor-pointer'} 
        ${conditionCustomHeaderCount === undefined || conditionCustomHeaderCount ? 'visible' : 'invisible'}`
      }
      disabled={disabled}>
      <Icon className="inline-block text-[20px] font-medium" />
    </button>
  )
}