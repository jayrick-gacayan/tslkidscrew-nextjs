import { ReactNode } from "react";

export default function PaginationIcon({
  icon,
  onClick,
  condition,
}: {
  onClick: () => void;
  icon: ReactNode;
  condition: boolean;
}) {
  return (
    <button className="p-3 hover:bg-secondary-light cursor-pointer inline-block disabled:cursor-not-allowed disabled:bg-secondary-light disabled:text-tertiary"
      disabled={condition}
      onClick={() => { onClick(); }}>
      {icon}
    </button>
  )
}