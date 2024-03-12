import { ForwardedRef, forwardRef } from "react";
import type { SVGProps } from 'react';

function FluentTableDismiss16Filled(props: SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      ref={ref}
      {...props}>
      <path fill="currentColor"
        d="M4.5 2A2.5 2.5 0 0 0 2 4.5V5h3V2zM6 2v3h4V2zM5 6H2v4h3zm1 1.337A5.531 5.531 0 0 1 7.337 6H6zM5 11H2v.5A2.5 2.5 0 0 0 4.5 14H5zm9-6v-.5A2.5 2.5 0 0 0 11.5 2H11v3zm1 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.646-1.146a.5.5 0 0 0-.708-.708L10.5 9.793L9.354 8.646a.5.5 0 1 0-.708.708L9.793 10.5l-1.147 1.146a.5.5 0 0 0 .708.708l1.146-1.147l1.146 1.147a.5.5 0 0 0 .708-.708L11.207 10.5z" />
    </svg>
  );
}

export default forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(FluentTableDismiss16Filled);