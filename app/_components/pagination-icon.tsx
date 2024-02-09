export default function PaginationIcon({
  icon,
  onClick,
  condition,
}: {
  onClick: () => void;
  icon: any
  condition: boolean;
}) {
  let Icon = icon;
  return (
    <button className="transition-all delay-100 px-3 py-2 hover:bg-secondary-light cursor-pointer inline-block disabled:cursor-not-allowed disabled:bg-secondary-light disabled:text-tertiary"
      disabled={condition}
      onClick={() => { onClick(); }}>
      <Icon className="inline-block text-primary text-sm" />
    </button>
  )
}