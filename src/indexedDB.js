import { openDB } from 'idb';

const DB_NAME = 'todos-database';
const STORE_NAME = 'todos-store';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    }
  });
};

export const addTodo = async (todo) => {
  const db = await initDB();
  return db.add(STORE_NAME, todo);
};

export const updateTodo = async (id, updateTodo) => {
  const db = await initDB();
  return db.put(STORE_NAME, { ...updateTodo, id });
};

export const deleteTodos = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};

export const getTodos = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
