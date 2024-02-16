import { authSignOut } from "@/actions/auth-actions";
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  redirectTo: string;
}

function LogoutButton(
  {
    redirectTo,
    className,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <form action={async () => { await authSignOut(redirectTo); }}>
      <button ref={ref}
        className={
          twMerge(
            'px-3 py-2 block w-full text-left cursor-pointer',
            className!
          )
        }
        {...props} />
    </form>
  )
}

export default forwardRef<HTMLButtonElement, ButtonProps>(LogoutButton);

