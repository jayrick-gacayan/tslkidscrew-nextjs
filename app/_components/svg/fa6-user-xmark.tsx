import { ForwardedRef, forwardRef } from "react";
import type { SVGProps } from 'react';

function Fa6SolidUserXmark(props: SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="1.25em"
      height="1em"
      viewBox="0 0 640 512"
      ref={ref}
      {...props}>
      <path fill="currentColor"
        d="M96 128a128 128 0 1 1 256 0a128 128 0 1 1-256 0M0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3M471 143c9.4-9.4 24.6-9.4 33.9 0l47 47l47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47l47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47l-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47l-47-47c-9.4-9.4-9.4-24.6 0-33.9" />
    </svg>
  );
}

export default forwardRef(Fa6SolidUserXmark)