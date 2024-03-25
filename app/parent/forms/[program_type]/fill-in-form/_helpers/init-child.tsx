import { fieldInputValue } from '@/types/helpers/field-input-value';
import { ChildInputTypes } from '@/types/input-types/child-input-types';

let today = new Date();
let defaultDate = new Date(new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()))

export const childInit: ChildInputTypes = {
  first_name: fieldInputValue(''),
  last_name: fieldInputValue(''),
  birthdate: defaultDate.toISOString(),
  school_attending: fieldInputValue('')
}