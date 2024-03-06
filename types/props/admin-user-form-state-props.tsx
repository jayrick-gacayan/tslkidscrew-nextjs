import { FormStateProps } from "./form-state-props";
import { InputProps } from "./input-props";

export interface AdminUserFormStateProps extends FormStateProps {
  'admin-user-email'?: InputProps<string>;
  'admin-user-name'?: InputProps<string>;
  'admin-user-active'?: boolean;
  'admin-user-is-super-admin'?: boolean;
}