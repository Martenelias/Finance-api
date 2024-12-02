import connection from '../../database';
import { IBudget } from './budgetsModels';
import { FieldPacket, ResultSetHeader } from 'mysql2';

const getAllBudgets = async (): Promise<IBudget[]> => {
  const [budgets]: [IBudget[], FieldPacket[]] = await connection.query(
    'SELECT * FROM budgets WHERE deleted_at IS NULL'
  );
  return budgets;
};

const getBudgetByMonth = async (year: number, month: number): Promise<IBudget | undefined> => {
  const [budget]: [IBudget[], FieldPacket[]] = await connection.query(
    'SELECT id, user_id, year, month, monthly_limit FROM budgets WHERE year = ? AND month = ? AND deleted_at IS NULL',
    [year, month]
  );
  return budget[0];
};

const addBudget = async (
  userId: number,
  monthly_limit: number,
  year: number,
  month: number
): Promise<number> => {
  const newBudget = {
    user_id: userId,
    monthly_limit,
    year,
    month,
  };

  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    `
    INSERT INTO budgets (user_id, monthly_limit, year, month, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `,
    [
      newBudget.user_id,
      newBudget.monthly_limit,
      newBudget.year,
      newBudget.month,
    ]
  );

  return result.insertId;
};

const updateBudget = async (
  year: number,
  month: number,
  updateData: Partial<IBudget>
): Promise<boolean> => {
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    `
    UPDATE budgets 
    SET monthly_limit = ?, year = ?, month = ?, updated_at = NOW() 
    WHERE year = ? AND month = ? AND deleted_at IS NULL
    `,
    [
      updateData.monthly_limit,
      updateData.year,
      updateData.month,
      year,
      month
    ]
  );

  return result.affectedRows > 0;
};

const deleteBudget = async (id: number): Promise<boolean> => {
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    'UPDATE budgets SET deleted_at = NOW() WHERE id = ?',
    [id]
  );

  return result.affectedRows > 0;
};

export default {
  getAllBudgets,
  getBudgetByMonth,
  addBudget,
  updateBudget,
  deleteBudget
};