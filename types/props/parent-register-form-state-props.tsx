import { InputProps } from "./input-props";
import { LoginFormStateProps } from "./login-form-state-props";

export interface ParentRegisterFormStateProps extends LoginFormStateProps {
  confirm_password?: InputProps<string>;
}