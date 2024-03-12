import { FormStateProps } from './form-state-props';
import { InputProps } from './input-props';

export interface LocationProgramFormStateProps extends FormStateProps {
  name?: InputProps<string>;
  'name-suffix'?: InputProps<string>;
  'director[id]'?: InputProps<string>;
  capacity?: InputProps<string>;
  price?: InputProps<string>;
  'promo-package'?: boolean;
  active?: boolean;
}