import connection from '../../database';
import { IExpense } from './expensesModels';
import { FieldPacket, ResultSetHeader } from 'mysql2';

const getAllExpenses = async (): Promise<IExpense[]> => {
  const [expenses]: [IExpense[], FieldPacket[]] = await connection.query(
    `SELECT * FROM transactions
    WHERE type = "expense"
    AND deleted_at IS NULL
    ORDER BY transaction_date DESC`
  );
  return expenses;
};

const getExpenseById = async (id: number): Promise<IExpense | undefined> => {
  const [expense]: [IExpense[], FieldPacket[]] = await connection.query(
    'SELECT * FROM transactions WHERE id = ? AND type = "expense" AND deleted_at IS NULL',
    [id]
  );
  return expense[0];
};

const updateExpense = async (
  id: number,
  updateData: Partial<IExpense>
): Promise<boolean> => {
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    'UPDATE transactions SET category_id = ?, amount = ?, description = ?, transaction_date = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL',
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

const createExpense = async (
  userId: number,
  categoryId: number,
  amount: number,
  transactionDate: Date,
  description: string
): Promise<number> => {
  await validateCategory(categoryId);
  const newExpense = {
    user_id: userId,
    category_id: categoryId,
    amount,
    transaction_date: transactionDate,
    description,
    type: 'expense',
  };
  const [categoryCheck]: any = await connection.query(
    'SELECT id FROM categories WHERE id = ?',
    [categoryId]
  );
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    'INSERT INTO transactions SET ?',
    [newExpense]
  );
  return result.insertId;
};

const deleteExpense = async (id: number): Promise<boolean> => {
  await connection.query(
    'UPDATE transactions SET deleted_at = NOW() WHERE id = ?',
    [id]
  );
  return true;
}

export default { getAllExpenses, getExpenseById, updateExpense, createExpense, deleteExpense };

function NOW(): any {
  throw new Error('Function not implemented.');
}
