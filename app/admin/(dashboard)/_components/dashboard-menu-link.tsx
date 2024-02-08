import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardMenuLink({
  href,
  altText,
  current,
  text,
  icon,
  onClick,
}: {
  href: string;
  altText: string;
  current: string;
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={href}
      className={`px-4 py-3 w-full space-x-2 block hover:bg-default-light/[.25] ${altText === current ? 'border-l-[4px] border-l-white bg-default-light/[.25]' : ''}`}
      onClick={() => { onClick && onClick(); }}>
      {icon && icon}
      <span>{text}</span>
    </Link>
  )
}