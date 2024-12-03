import express, { Express, Request, Response } from 'express';
import config from './config';
import logging from './middlewares/loggingMiddleware';
import usersRoutes from './components/users/usersRoutes';
import categoriesRoutes from './components/categories/categoriesRoutes';
import incomesRoutes from './components/incomes/incomesRoutes';
import expensesRoutes from './components/expenses/expensesRoutes';
import reportsRoutes from './components/reports/reportsRoutes';
import budgetsRoutes from './components/budgets/budgetsRoutes';
import authControllers from './components/auth/authControllers';
import isLoggedIn from './middlewares/isLoggedIn';
import isAdmin from './middlewares/isAdmin';
import errorMiddleware from './middlewares/errorMiddleware';
import notFound from './middlewares/notFoundMiddleware';
import { error } from 'console';
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.options('*', cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// HTTP request logger
app.use(logging);

// GET / - alive check
app.get('/', (req: Request, res: Response) => {
  return res.status(200).json(
    {
      success: true,
      message: 'Alive',
      endpoints: [
        '/users',
        '/users/:id',
        '/incomes',
        '/incomes/:id',
        '/expenses',
        '/expenses/:id',
        '/categories',
        '/categories/:id',
        '/budgets',
        '/budgets/:year/:month',
        '/reports',
        '/reports/:month',
        '/reports/savings/:userId',
        '/reports/year-summary/:userId/:year',
        '/reports/transaction-frequency/:userId/:year',
        '/login',
        '/signup',
      ],
    }
  )
});

app.post('/signup', authControllers.signup);
app.post('/login', authControllers.login);
app.use('/categories', categoriesRoutes);
app.use(isLoggedIn);
app.use('/incomes', incomesRoutes);
app.use('/expenses', expensesRoutes);
app.use('/budgets', budgetsRoutes);
app.use('/reports', reportsRoutes);
app.use(isAdmin);
app.use('/users', usersRoutes);

app.use(errorMiddleware);
app.use('*',notFound);

app.listen(config.port, () => {
  console.log(`API is running on http://localhost:${config.port}`);
});
