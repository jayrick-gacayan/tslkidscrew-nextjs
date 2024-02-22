export interface Receipt {
  id?: number;
  registration_record_id?: number | null;
  invoice_id?: number | null;
  customer_id?: number | null;
  amount?: number | null;
  program_name?: string | null;
  payment_for?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  purchase_id?: number | null;
}