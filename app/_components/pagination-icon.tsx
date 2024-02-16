import Link from "next/link";
import Fa6SolidChevronLeft from "./svg/fa6-solid-chevron-left";
import Fa6SolidChevronRight from "./svg/fa6-solid-chevron-right";

export default function PaginationIcon({
  href,
  condition,
  direction,
}: {
  href: string;
  direction: string;
  condition: boolean;
}) {
  const Icon = direction === 'left' ? Fa6SolidChevronLeft : Fa6SolidChevronRight;

  return (
    <Link href={``}
      className={
        `transition-all delay-100 px-3 py-2 inline-block hover:bg-secondary-light 
        ${condition ? 'pointer-events-none cursor-not-allowed bg-secondary-light text-tertiary' :
          'cursor-pointer'}`
      }>
      <Icon className="inline-block text-primary text-sm" />
    </Link>
  )
}