import connection from '../../database';
import { IReport } from './reportsModels';
import { FieldPacket } from 'mysql2';

// Function to get all monthly reports
const getAllMonthlyReports = async (): Promise<IReport[]> => {
  const [reports]: [IReport[], FieldPacket[]] = await connection.query(
    `
    SELECT 
      DATE_FORMAT(transaction_date, '%Y-%m') AS month,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpense,
      (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
       SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS balance
    FROM 
      transactions
    WHERE 
      deleted_at IS NULL
    GROUP BY 
      month
    ORDER BY 
      month DESC;
    `
  );
  return reports;
};

// Function to get a specific monthly report for a given month
const getMonthlyReportByMonth = async (month: string): Promise<IReport | undefined> => {
  const [report]: [IReport[], FieldPacket[]] = await connection.query(
    `
    SELECT 
      DATE_FORMAT(transaction_date, '%Y-%m') AS month,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpense,
      (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
       SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS balance
    FROM 
      transactions
    WHERE 
      DATE_FORMAT(transaction_date, '%Y-%m') = ? AND deleted_at IS NULL
    GROUP BY 
      month;
    `,
    [month]
  );
  return report[0];
};

// Function to get the savings report
const getSavingsReport = async (userId: number): Promise<IReport[] | undefined> => {
  const [report]: [IReport[], FieldPacket[]] = await connection.query(
    `
    SELECT 
      YEAR(t.transaction_date) AS year,
      MONTH(t.transaction_date) AS month,
      SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) - 
      SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) AS savings
    FROM 
      transactions t
    WHERE 
      t.deleted_at IS NULL AND t.user_id = ?
    GROUP BY 
      YEAR(t.transaction_date), MONTH(t.transaction_date)
    ORDER BY 
      year DESC, month DESC;
    `,
    [userId]
  );
  return report;
};

// Function to get the year-end summary report
const getYearEndSummaryReport = async (userId: number, year: number): Promise<IReport | undefined> => {
  const [report]: [IReport[], FieldPacket[]] = await connection.query(
    `
    SELECT 
      YEAR(t.transaction_date) AS year,
      SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) AS total_expense,
      SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) - 
      SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) AS total_savings
    FROM 
      transactions t
    WHERE 
      t.deleted_at IS NULL AND t.user_id = ? AND YEAR(t.transaction_date) = ?
    GROUP BY 
      YEAR(t.transaction_date)
    ORDER BY 
      year DESC;
    `,
    [userId, year]
  );
  return report[0];
};

// Function to get the transaction frequency report
const getTransactionFrequencyReport = async (userId: number, year: number): Promise<IReport | undefined> => {
  const [report]: [IReport[], FieldPacket[]] = await connection.query(
    `
    SELECT 
        t.type AS transaction_type,
        COUNT(*) AS transaction_count,
        (CASE WHEN t.type = 'income' THEN c.name ELSE NULL END) AS most_frequent_income_category,
        (CASE WHEN t.type = 'expense' THEN c.name ELSE NULL END) AS most_frequent_expense_category
    FROM 
        transactions t
    LEFT JOIN 
        categories c ON t.category_id = c.id
    WHERE 
        t.deleted_at IS NULL AND t.user_id = ?
    GROUP BY 
        t.type, c.name
    ORDER BY 
        transaction_count DESC;
    `,
    [userId, year]
  );
  return report[0];
};

export default { 
  getAllMonthlyReports, 
  getMonthlyReportByMonth, 
  getSavingsReport, 
  getYearEndSummaryReport, 
  getTransactionFrequencyReport 
};
