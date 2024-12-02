import { RowDataPacket } from "mysql2";

// Interface defining the structure of a category (either 'income' or 'expense')
interface ICategory extends RowDataPacket {
  id: number;
  name: string;
  type: 'income' | 'expense';
  createdAt: Date;
  updatedAt: Date;
}

export { ICategory };