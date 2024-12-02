import { RowDataPacket } from "mysql2";

// Interface defining the shape of a user object
interface IUser extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export { IUser };