import { ChildInfoType } from "@/types/input-types/child-info-type";

let today = new Date();
let defaultDate = new Date(new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()))

export const initChild: ChildInfoType = {
  first_name: '',
  last_name: '',
  birthdate: defaultDate.toISOString(),
  school_attending: ''
}