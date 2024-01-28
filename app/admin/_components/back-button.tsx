import { Icon } from "@iconify/react";

export default function BackButton({
  onClick
}: {
  onClick: () => void;
}) {
  return (
    <div className="w-fit mr-auto">
      <div tabIndex={0}
        className="hover:bg-primary hover:text-white text-primary rounded cursor-pointer px-3 py-2 group"
        onClick={onClick}>
        <Icon icon="fa6-solid:arrow-left"
          className="transition-all delay-100 inline-block group-hover:-translate-x-1 translate-x-0" />
        <span className="inline-block ml-2 align-middle">Back</span>
      </div>
    </div>
  )
}