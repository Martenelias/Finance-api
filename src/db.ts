import { ICategory } from './components/categories/categoriesModels';
import { IExpense } from './components/expenses/expensesModels';
import { IIncome } from './components/incomes/incomesModels';
import { IReport } from './components/reports/reportsModels';
import { IUser } from './components/users/usersModels';
import { IBudget } from './components/budgets/budgetsModels';

// Interface defining the structure of the database
interface IDb {
  users: any[];
  incomes: IIncome[];
  expenses: IExpense[];
  categories: ICategory[];
  budgets: IBudget[];
  reports: IReport[];
}

// Mock database with initial test data for users, incomes, expenses, categories, and reports
const db: IDb = {
  users: [
    {
      id: 1,
      email: 'maali@maasikas.ee',
      password: '$2b$10$2UDCPBNtSD78wbEPq/uTtuJRDM9s8paTznupduqa3/3c09MtpHdUC',
      role: 'admin',
      firstName: 'Maali',
      lastName: 'Maasikas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      email: 'juku@juurikas.ee',
      password: '$2b$10$e5xmplQgTGUxd18EeUJEy.NZJRg.wjYZfXgZvWEdc1sQEqHEhMMim',
      role: 'user',
      firstName: 'Juku',
      lastName: 'Juurikas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  incomes: [
    {
      id: 1,
      categoryId: 1,
      userId: 1,
      amount: 100,
      transactionDate: new Date(),
      description: "Sample income description",
      type: "income",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      categoryId: 2,
      userId: 2,
      amount: 200,
      transactionDate: new Date(),
      description: "Another sample income description",
      type: "income",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as IIncome[],
  expenses: [
    {
      id: 1,
      categoryId: 1,
      userId: 1,
      amount: 10,
      transactionDate: new Date(),
      description: "Sample expense description",
      type: "expense",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      categoryId: 2,
      userId: 2,
      amount: 20,
      transactionDate: new Date(),
      description: "Another sample expense description",
      type: "expense",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      categoryId: 3,
      userId: 1,
      amount: 30,
      transactionDate: new Date(),
      description: "Yet another sample expense description",
      type: "expense",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as IExpense[],
  categories: [
    {
      id: 1,
      name: 'Food',
      type: 'expense',
    },
    {
      id: 2,
      name: 'Transport',
      type: 'expense',
    },
    {
      id: 3,
      name: 'Salary',
      type: 'income',
    },
    {
      id: 4,
      name: 'Investment',
      type: 'income',
    },
    {
      id: 3,
      name: 'Entertainment',
      type: 'expense',
    },
  ] as ICategory[],
  budgets: [
    {
      id: 1,
      user_id: 1,
      year: 2024,
      month: 1,
      created_at: new Date(),
      updated_at: new Date(),
      monthly_limit: 40,
    },
    {
      id: 2,
      user_id: 1,
      year: 2024,
      month: 2,
      created_at: new Date(),
      updated_at: new Date(),
      monthly_limit: 330,
    },
    {
      id: 3,
      user_id: 2,
      year: 2024,
      month: 4,
      created_at: new Date(),
      updated_at: new Date(),
      monthly_limit: 65650,
    },
    {
      id: 4,
      user_id: 2,
      year: 2024,
      month: 5,
      created_at: new Date(),
      updated_at: new Date(),
      monthly_limit: 110,
    },
  ] as IBudget[],
  reports: [
    {
      id: 1,
      month: 202401,
      year: 2024,
      balance: 90,
      totalIncome: 600,
      totalExpense: 60,
    },
    {
      id: 2,
      month: 202402,
      year: 2024,
      balance: 630,
      totalIncome: 700,
      totalExpense: 70,
    },
  ] as IReport[],
}

export { db };