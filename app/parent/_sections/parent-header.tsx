import Link from "next/link";
import Image from "next/image";

export default function ParentHeader() {
  return (
    <div className="sticky top-0 left-0 z-[20] bg-primary text-white w-full">
      <div className="flex items-center justify-between px-12 py-4 gap-4 w-full">
        <div className="flex-none lg:hidden">
          <label htmlFor="admin-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div className="flex-none">
          <Link href='/'
            className="block"
            aria-label="Brand">
            <Image alt="tsl-kids-crew-logo"
              src={`/static/tsl-kids-crew-logo-white.png`}
              width={128}
              height={64}
              className="h-[64px] w-[128px] " />
          </Link>
        </div>
        <div >
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-full bg-white inline-block" />
            <div>Deanver</div>
          </div>
        </div>
      </div>
    </div>
  )
}