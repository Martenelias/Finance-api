import connection from '../../database';
import { IIncome } from './incomesModels';
import { FieldPacket, ResultSetHeader } from 'mysql2';

const getAllIncomes = async (): Promise<IIncome[]> => {
  const [incomes]: [IIncome[], FieldPacket[]] = await connection.query(
    `SELECT * FROM transactions
    WHERE type = "income"
    AND deleted_at IS NULL
    ORDER BY transaction_date DESC`
  );
  return incomes;
};

const getIncomeById = async (id: number): Promise<IIncome | undefined> => {
  const [income]: [IIncome[], FieldPacket[]] = await connection.query(
    'SELECT * FROM transactions WHERE id = ? AND type = "income" AND deleted_at IS NULL',
    [id]
  );
  return income[0];
};

const updateIncome = async (
  id: number,
  updateData: Partial<IIncome>
): Promise<boolean> => {
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    `UPDATE transactions 
     SET category_id = ?, amount = ?, description = ?, transaction_date = ?, updated_at = NOW() 
     WHERE id = ? AND deleted_at IS NULL`,
    [
      updateData.categoryId,
      updateData.amount,
      updateData.description,
      updateData.transactionDate,
      id,
    ]
  );
  return result.affectedRows > 0;
};

const validateCategory = async (categoryId: number): Promise<void> => {
  const [category]: any = await connection.query(
    'SELECT id FROM categories WHERE id = ?',
    [categoryId]
  );
  if (category.length === 0) {
    throw new Error('Invalid categoryId: Category does not exist.');
  }
};

const createIncome = async (
  userId: number,
  categoryId: number,
  amount: number,
  transactionDate: Date,
  description: string
): Promise<number> => {
  await validateCategory(categoryId);
  const newIncome = {
    user_id: userId,
    category_id: categoryId,
    amount,
    transaction_date: transactionDate,
    description,
    type: 'income',
  };
  const [categoryCheck]: any = await connection.query(
    'SELECT id FROM categories WHERE id = ?',
    [categoryId]
  );
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    'INSERT INTO transactions SET ?',
    [newIncome]
  );
  return result.insertId;
};

const deleteIncome = async (id: number): Promise<boolean> => {
  await connection.query(
    'UPDATE transactions SET deleted_at = NOW() WHERE id = ?',
    [id]
  );
  return true;
};

export default { getAllIncomes, getIncomeById, createIncome, updateIncome, deleteIncome  };