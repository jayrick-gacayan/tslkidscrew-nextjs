import { Parent } from "@/models/parent";

export type AccountInfoForParent = Pick<Parent, 'first_name' | 'last_name' | 'phone_number' | 'emergency_phone_number' | 'address_line_one' | 'address_line_two' | 'city' | 'state' | 'zip_code' | 'email'>