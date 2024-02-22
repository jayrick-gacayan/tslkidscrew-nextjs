import { FormStateProps } from "./form-state-props";
import { InputProps } from "./input-props";

export interface ParentRegisterFormStateProps extends FormStateProps {
  email?: InputProps<string>;
  password?: InputProps<string>;
  confirm_password?: InputProps<string>;

}