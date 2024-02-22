import { FormStateProps } from "./form-state-props";
import { InputProps } from "./input-props";

export interface LocationPlaceFormStateProps extends FormStateProps {
  name?: InputProps<string>;
  address?: InputProps<string>;
  ['location-minimum-age']?: InputProps<string>;
  ['director[id]']?: InputProps<string>;
}