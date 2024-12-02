import { RowDataPacket } from "mysql2";

// Interface defining the shape of a report object
interface IReport extends RowDataPacket {
  year: number;
  month: number;
  savings?: number;
  total_income?: number;
  total_expense?: number;
  total_savings?: number;
  transaction_type?: string;
  transaction_count?: number;
  most_frequent_income_category?: string;
  most_frequent_expense_category?: string;
}

export { IReport };