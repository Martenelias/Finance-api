import connection from '../../database';
import { IUser } from './usersModels';
import hashServices from '../helpers/hashServices';
import { FieldPacket, ResultSetHeader } from 'mysql2';

const getAllUsers = async (): Promise<IUser[]> => {
  const [users]: [IUser[], FieldPacket[]] = await connection.query(
    `SELECT
      id, email, first_name, last_name, role, created_at, updated_at
    FROM users
    WHERE deleted_at IS NULL;`
  );
  return users;
};

const getUserById = async (id: number): Promise<IUser | undefined> => {
  const [user]: [IUser[], FieldPacket[]] = await connection.query(
    `SELECT
      id, email, first_name, last_name, role, created_at, updated_at
    FROM users
    WHERE id = ? AND deleted_at IS NULL;`,
    [id]
  );
  return user[0];
};

const getUserByEmail = async (email: string): Promise<IUser | undefined> => {
  const [users]: [IUser[], FieldPacket[]] = await connection.query(
    'SELECT * FROM users WHERE email = ? AND deleted_at IS NULL',
    [email]
  );
  return users[0];
};

const getUserWithPasswordById = async (id: number): Promise<IUser | undefined> => {
  const [user]: [IUser[], FieldPacket[]] = await connection.query(
    `SELECT * FROM users WHERE id = ? AND deleted_at IS NULL;`,
    [id]
  );
  return user[0];
};

const createUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<number> => {
  const hash = await hashServices.hashPassword(password);
  const newUser = {
    email,
    password: hash,
    role: 'user',
    first_name: firstName,
    last_name: lastName,
  };

  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    'INSERT INTO users SET ?',
    [newUser]
  );
  return result.insertId;
};

const deleteUser = async (id: number): Promise<boolean> => {
  await connection.query('UPDATE users SET deleted_at = NOW() WHERE id = ?', [id]);
  return true;
};

const updateUser = async (id: number, updateUser: any): Promise<boolean> => {
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    'UPDATE users SET ? WHERE id = ? AND deleted_at IS NULL',
    [updateUser, id]
  );
  return result.affectedRows > 0;
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserWithPasswordById,
  createUser,
  deleteUser,
  updateUser,
};
