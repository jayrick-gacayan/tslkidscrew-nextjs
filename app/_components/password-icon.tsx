import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import Fa6SolidEyeSlash from "@/app/_components/svg/fa6-solid-eye-slash";
import { SVGProps, Dispatch, SetStateAction, ForwardedRef, forwardRef } from "react";

interface PasswordIconProps extends SVGProps<SVGSVGElement> {
  passwordShow: boolean;
  onPasswordShown: Dispatch<SetStateAction<boolean>>
}

function PasswordIcon(
  { passwordShow, onPasswordShown, ...props }: PasswordIconProps,
  ref: ForwardedRef<SVGSVGElement>
) {
  const IconPassword = passwordShow ? Fa6SolidEyeSlash : Fa6SolidEye;
  return (<IconPassword {...props}
    ref={ref}
    className="text-default/90 absolute right-3 z-20 top-3 block cursor-pointer"
    onClick={() => { onPasswordShown(passwordShow ? false : true); }} />);

}

export default forwardRef(PasswordIcon)