import Link from "next/link";
import Image, { getImageProps } from "next/image";
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

  const {
    props: {
      srcSet,
      ...rest
    },
  } = getImageProps({
    alt: 'tsl-kids-crew-logo',
    width: width,
    height: height,
    src: '/static/tsl-kids-crew-logo-white.png',
    quality: 100,
  })

  return (
    <Link href={href}
      className={twMerge('block', className!)}
      aria-label="Brand">
      <picture>
        <img alt='tsl-kids-crew-logo' {...rest} />
      </picture>

    </Link>
  )
}