export interface Invoice {
  id?: number;
  registration_record_id?: number | null;
  amount?: number | null;
  paid?: boolean | null;
  memo?: string | null;
  due_date?: string | null;
  created_at: string | null;
  updated_at: string | null;
  amount_paid?: number | null;

  invoice_amount?: number | null;
  discount?: number | null;
  fees?: number | null;
  due?: number | null;
}