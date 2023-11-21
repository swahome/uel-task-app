import { openDB } from 'idb';

const dbName = 'taskDB';
const storeName = 'tasks';

const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    }
  },
});

export const addTask = async (task) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.add(task);
};

export const getAllTasks = async () => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  return store.getAll();
};
