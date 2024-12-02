-- Create the database
CREATE DATABASE IF NOT EXISTS finance_tracker_db;
USE finance_tracker_db;

-- Table for users with soft delete and timestamps
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Table for categories (e.g., Food, Rent, Salary) with soft delete and timestamps
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Table for transactions with foreign keys, soft delete, and timestamps
CREATE TABLE IF NOT EXISTS transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date DATE NOT NULL,
    description TEXT,
    type ENUM('income', 'expense') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Table for budgets to allow users to set spending limits for categories
CREATE TABLE IF NOT EXISTS budgets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  monthly_limit DECIMAL(10, 2) NOT NULL,
  year INT NOT NULL,
  month INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL
);

-- Seed data for users
INSERT INTO users (id, email, password, role, first_name, last_name, created_at, updated_at) VALUES
(1, 'maali@maasikas.ee', '$2b$10$2UDCPBNtSD78wbEPq/uTtuJRDM9s8paTznupduqa3/3c09MtpHdUC', 'admin', 'Maali', 'Maasikas', NOW(), NOW()),
(2, 'juku@juurikas.ee', '$2b$10$e5xmplQgTGUxd18EeUJEy.NZJRg.wjYZfXgZvWEdc1sQEqHEhMMim', 'user', 'Juku', 'Juurikas', NOW(), NOW());

-- Seed data for categories
INSERT IGNORE INTO categories (name, type, description, created_at, updated_at) VALUES
('Salary', 'income', 'Income from job', NOW(), NOW()),
('Groceries', 'expense', 'Money spent on groceries', NOW(), NOW()),
('Rent', 'expense', 'Monthly rent payment', NOW(), NOW()),
('Investments', 'income', 'Income from investments', NOW(), NOW()),
('Utilities', 'expense', 'Monthly utility bills', NOW(), NOW()),
('Dining Out', 'expense', 'Money spent on dining out', NOW(), NOW()),
('Freelance', 'income', 'Earnings from freelance projects', NOW(), NOW()),
('Savings', 'expense', 'Money set aside for savings', NOW(), NOW());

-- Seed data for transactions across multiple months and years
INSERT INTO transactions (user_id, category_id, amount, transaction_date, description, type, created_at, updated_at) VALUES
-- 2023 transactions
(1, 1, 3000.00, '2023-01-15', 'January Salary', 'income', NOW(), NOW()),
(1, 2, 200.00, '2023-01-20', 'Groceries', 'expense', NOW(), NOW()),
(1, 3, 800.00, '2023-01-01', 'January Rent', 'expense', NOW(), NOW()),
(1, 5, 100.00, '2023-01-18', 'Utilities Bill', 'expense', NOW(), NOW()),
(1, 4, 200.00, '2023-01-25', 'Investment Return', 'income', NOW(), NOW()),

(1, 1, 3000.00, '2023-02-15', 'February Salary', 'income', NOW(), NOW()),
(1, 2, 180.00, '2023-02-10', 'Groceries', 'expense', NOW(), NOW()),
(1, 3, 800.00, '2023-02-01', 'February Rent', 'expense', NOW(), NOW()),
(1, 6, 90.00, '2023-02-05', 'Dining Out', 'expense', NOW(), NOW()),

(1, 1, 3000.00, '2023-03-15', 'March Salary', 'income', NOW(), NOW()),
(1, 3, 800.00, '2023-03-01', 'March Rent', 'expense', NOW(), NOW()),
(1, 5, 120.00, '2023-03-20', 'Utilities', 'expense', NOW(), NOW()),
(1, 6, 150.00, '2023-03-25', 'Dining Out', 'expense', NOW(), NOW()),

(2, 1, 2400.00, '2023-01-15', 'January Salary', 'income', NOW(), NOW()),
(2, 2, 150.00, '2023-01-20', 'Groceries', 'expense', NOW(), NOW()),
(2, 3, 800.00, '2023-01-05', 'January Rent', 'expense', NOW(), NOW()),

(2, 1, 2500.00, '2023-02-15', 'February Salary', 'income', NOW(), NOW()),
(2, 2, 180.00, '2023-02-10', 'Groceries', 'expense', NOW(), NOW()),
(2, 3, 800.00, '2023-02-01', 'February Rent', 'expense', NOW(), NOW()),

(2, 1, 2500.00, '2023-03-15', 'March Salary', 'income', NOW(), NOW()),
(2, 5, 100.00, '2023-03-12', 'Utilities', 'expense', NOW(), NOW()),
(2, 3, 800.00, '2023-03-01', 'March Rent', 'expense', NOW(), NOW()),

(2, 1, 2500.00, '2023-04-15', 'April Salary', 'income', NOW(), NOW()),
(2, 2, 200.00, '2023-04-08', 'Groceries', 'expense', NOW(), NOW()),
(2, 6, 150.00, '2023-04-20', 'Dining Out', 'expense', NOW(), NOW()),

-- 2024 transactions
(1, 1, 3200.00, '2024-01-15', 'January Salary', 'income', NOW(), NOW()),
(1, 2, 150.00, '2024-01-20', 'Weekly Groceries', 'expense', NOW(), NOW()),
(1, 3, 800.00, '2024-01-01', 'January Rent', 'expense', NOW(), NOW()),
(1, 5, 60.00, '2024-01-18', 'Electricity bill', 'expense', NOW(), NOW()),

(1, 1, 3200.00, '2024-02-15', 'February Salary', 'income', NOW(), NOW()),
(1, 2, 180.00, '2024-02-10', 'Groceries', 'expense', NOW(), NOW()),
(1, 3, 800.00, '2024-02-01', 'February Rent', 'expense', NOW(), NOW()),
(1, 6, 120.00, '2024-02-08', 'Dining Out', 'expense', NOW(), NOW()),

(1, 1, 3200.00, '2024-03-15', 'March Salary', 'income', NOW(), NOW()),
(1, 3, 800.00, '2024-03-01', 'March Rent', 'expense', NOW(), NOW()),
(1, 7, 500.00, '2024-03-20', 'Freelance Project', 'income', NOW(), NOW()),
(1, 5, 90.00, '2024-03-10', 'Water bill', 'expense', NOW(), NOW()),
(2, 1, 2500.00, '2024-01-15', 'January Salary', 'income', NOW(), NOW()),
(2, 2, 180.00, '2024-01-20', 'Groceries', 'expense', NOW(), NOW()),
(2, 3, 800.00, '2024-01-01', 'January Rent', 'expense', NOW(), NOW()),
(2, 1, 2500.00, '2024-02-15', 'February Salary', 'income', NOW(), NOW()),
(2, 2, 200.00, '2024-02-10', 'Groceries', 'expense', NOW(), NOW());

-- Seed data for budgets (targets for specific months)
INSERT INTO budgets (user_id, monthly_limit, year, month, created_at, updated_at) VALUES
(1, 1000.00, 2024, 1, NOW(), NOW()),
(1, 300.00, 2024, 4, NOW(), NOW()),
(1, 200.00, 2024, 5, NOW(), NOW()),
(2, 400.00, 2024, 6, NOW(), NOW()),
(1, 500.00, 2024, 7, NOW(), NOW()),
(2, 100.00, 2023, 1, NOW(), NOW()),
(2, 200.00, 2023, 2, NOW(), NOW()),
(2, 300.00, 2023, 3, NOW(), NOW()),
(1, 400.00, 2023, 4, NOW(), NOW()),
(1, 500.00, 2023, 5, NOW(), NOW()),
(1, 600.00, 2023, 6, NOW(), NOW()),
(1, 100.00, 2023, 7, NOW(), NOW());