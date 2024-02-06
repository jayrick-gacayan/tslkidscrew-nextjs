export interface Admin {
  id?: number;
  name?: string;
  email?: string;
  is_active?: boolean;
  is_super_admin?: boolean;
  created_by?: Admin | null;
  created_at?: string;
  updated_at?: string;
}