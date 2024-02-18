import { forwardRef, ForwardedRef, HTMLAttributes } from "react";
import { ToastContentProps } from "react-toastify";

export interface ToastProps<T> extends ToastContentProps<T>,
  HTMLAttributes<HTMLDivElement> {

}

function ToastComponent<T>(
  {
    className,
    ...props
  }: ToastProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return <div ref={ref} {...props} />
}

export default forwardRef(ToastComponent);