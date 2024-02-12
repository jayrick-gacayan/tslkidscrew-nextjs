import { ForwardedRef, forwardRef } from "react";
import type { SVGProps } from 'react';

function Fa6SolidChevronRight(props: SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="0.63em"
      height="1em"
      viewBox="0 0 320 512"
      ref={ref}
      {...props}>
      <path fill="currentColor"
        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256L73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
}


export default forwardRef(Fa6SolidChevronRight)