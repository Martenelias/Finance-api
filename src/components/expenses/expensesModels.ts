import { RowDataPacket } from "mysql2";

// Interface defining the shape of an expense object
interface IExpense extends RowDataPacket {
  id: number;
  categoryId: number;
  userId: number;
  amount: number;
  transactionDate: Date;
  description: string;
  type: 'expense';
  createdAt: Date;
  updatedAt: Date;
}

export { IExpense };