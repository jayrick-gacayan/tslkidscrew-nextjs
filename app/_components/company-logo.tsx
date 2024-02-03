import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function CompanyLogo({
  href,
  height,
  width,
  className,
}: {
  href: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Link href={href}
      className={twMerge('block', className!)}
      aria-label="Brand">
      <Image alt="tsl-kids-crew-logo"
        height={`${height}`}
        width={`${width}`}
        src='/static/tsl-kids-crew-logo-white.png'

        style={{ width: width, height: 'auto' }}
      />
    </Link>
  )
}