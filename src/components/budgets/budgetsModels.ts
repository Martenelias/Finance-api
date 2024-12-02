import { RowDataPacket } from 'mysql2';

interface IBudget extends RowDataPacket {
  id: number;
  user_id: number;
  year: number;
  month: number;
  monthly_limit: number;
  created_at: Date;
  updated_at: Date;
}

export { IBudget };