import Fa6SolidChevronLeft from "./svg/fa6-solid-chevron-left";
import Fa6SolidChevronRight from "./svg/fa6-solid-chevron-right";

export default function PaginationIcon({
  onClick,
  condition,
  direction,
}: {
  onClick: () => void;
  direction: string;
  condition: boolean;
}) {
  const Icon = direction === 'left' ? Fa6SolidChevronLeft : Fa6SolidChevronRight;

  return (
    <button className="transition-all delay-100 px-3 py-2 hover:bg-secondary-light cursor-pointer inline-block disabled:cursor-not-allowed disabled:bg-secondary-light disabled:text-tertiary"
      disabled={condition}
      onClick={() => { onClick(); }}>
      <Icon className="inline-block text-primary text-sm" />
    </button>
  )
}