import { RowDataPacket } from 'mysql2';

interface IIncome extends RowDataPacket {
  id: number;
  categoryId: number;
  userId: number;
  amount: number;
  transactionDate: Date;
  description: string;
  type: 'income';
  createdAt: Date;
  updatedAt: Date;
}


export { IIncome };
