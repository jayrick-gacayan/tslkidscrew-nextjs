import { FormStateProps } from "./form-state-props";
import { InputProps } from "./input-props";

export interface CustomerInfoFormStateProps extends FormStateProps {
  first_name?: InputProps<string>;
  last_name?: InputProps<string>;
  phone_number?: string;
  emergency_phone_number?: string;
  address_line_one?: string;
  address_line_two?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  how_did_you_hear_about_us?: string;
}