import connection from '../../database';
import { ICategory } from './categoriesModels';
import { FieldPacket, ResultSetHeader } from 'mysql2';

const getAllCategories = async (): Promise<ICategory[]> => {
  const [categories]: [ICategory[], FieldPacket[]] = await connection.query(
    'SELECT * FROM categories WHERE deleted_at IS NULL'
  );
  return categories;
};

const getCategoryById = async (id: number): Promise<ICategory | undefined> => {
  const [category]: [ICategory[], FieldPacket[]] = await connection.query(
    'SELECT * FROM categories WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
  return category[0];
};

const updateCategory = async (
  id: number,
  updateData: { name: string, type: 'income' | 'expense' })
: Promise<boolean> => {
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    'UPDATE categories SET name = ?, type = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [
      updateData.name,
      updateData.type,
      id,
    ]
  );
  return result.affectedRows > 0;
};

const createCategory = async (
  name: string,
  type: 'income' | 'expense',
): Promise<number | null> => {
  
  const [existingCategories]: [ICategory[], FieldPacket[]] = await connection.query(
    'SELECT id FROM categories WHERE name = ? AND type = ? AND deleted_at IS NULL',
    [name, type]
  );

  if (existingCategories.length > 0) {
    return null;
  }

  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    'INSERT INTO categories (name, type, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
    [name, type]
  );

  return result.insertId;
};


const deleteCategory = async (id: number): Promise<boolean> => {
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    'UPDATE categories SET deleted_at = NOW() WHERE id = ?',
    [id]
  );
  return true;
};

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };