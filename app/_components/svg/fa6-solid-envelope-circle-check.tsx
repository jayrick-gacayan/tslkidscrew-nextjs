import React, { forwardRef } from 'react';
import type { ForwardedRef, SVGProps } from 'react';

function Fa6SolidEnvelopeCircleCheck(props: SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg'
      width='1.25em'
      height='1em'
      viewBox='0 0 640 512'
      ref={ref}
      {...props}>
      <path fill='currentColor'
        d='M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4l217.6 163.2c11.4 8.5 27 8.5 38.4 0l57.4-43c23.9-59.8 79.7-103.3 146.3-109.8l13.9-10.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48zm246.4 275.2a63.9 63.9 0 0 1-76.8 0L0 176v208c0 35.3 28.7 64 64 64h296.2c-25.1-30.4-40.2-69.5-40.2-112c0-5.6.3-11.1.8-16.6zM640 336a144 144 0 1 0-288 0a144 144 0 1 0 288 0m-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l28.7 28.7l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0' />
    </svg>
  );
}

export default forwardRef(Fa6SolidEnvelopeCircleCheck);
