import { ForwardedRef, forwardRef } from "react";
import type { SVGProps } from 'react';

function Fa6SolidLock(props: SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="0.88em" height="1em"
      viewBox="0 0 448 512"
      ref={ref}
      {...props}>
      <path fill="currentColor"
        d="M144 144v48h160v-48c0-44.2-35.8-80-80-80s-80 35.8-80 80m-64 48v-48C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64v192c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64z" />
    </svg>
  );
}


export default forwardRef(Fa6SolidLock)

