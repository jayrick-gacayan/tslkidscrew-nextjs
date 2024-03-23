export interface Parent {
  id?: number | string;
  customer_id?: number;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  emergency_phone_number?: string | null;
  address_line_one?: string | null;
  address_line_two?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
  how_did_you_hear_about_us?: string | null;
  created_at?: string | null;
  updated_at?: string | null;

  card_last_four?: string | null;
  card_brand?: string | null;
  autopay_enabled?: boolean | null;
  stripe_customer_identifier?: string | null;
  customer_url?: string | null;
  bank_verified?: boolean | null;
  bank_name?: string | null;
  stripe_bank_identifier?: string | null;

}