import { openDB } from 'idb';

const dbName = 'taskAppDB';
const storeName = 'tasks';

const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains('users')) {
      db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    }
  },
});


//add a store for users and add a user to the store
//get all users from the store
//get a user by id from the store
//update a user in the store
//delete a user from the store
//delete all users from the store
//add a store for tasks and add a task to the store
//get all tasks from the store
//get a task by id from the store
//update a task in the store
//delete a task from the store
//delete all tasks from the store

export const addUser = async (user) => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  await store.add(user);
}

export const getAllUsers = async () => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  return store.getAll();
}

export const getUserById = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const users = await store.getAll();
  return users.find((user) => user.id === id);
}

//get user by email
export const getUserByEmail = async (email) => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const users = await store.getAll();
  return users.find((user) => user.email === email);
  
}

//hash user password using sha512
export const hashPassword = async (password) => {
  const msgUint8 = new TextEncoder().encode(password);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);            // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                      // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');  // convert bytes to hex string
  return hashHex.toString();
}


export const updateUser = async (user) => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  await store.put(user);
}

export const deleteUser = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  await store.delete(id);
}

export const deleteAllUsers = async () => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  await store.clear();
}

export const addTask = async (task) => {
  const db = await dbPromise;
  const tx = db.transaction('tasks', 'readwrite');
  const store = tx.objectStore('tasks');
  await store.add(task);
}

export const getAllTasks = async () => {
  const db = await dbPromise;
  const tx = db.transaction('tasks', 'readonly');
  const store = tx.objectStore('tasks');
  return store.getAll();
}

export const getTaskById = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction('tasks', 'readonly');
  const store = tx.objectStore('tasks');
  return store.get(id);
}

export const updateTask = async (task) => {
  const db = await dbPromise;
  const tx = db.transaction('tasks', 'readwrite');
  const store = tx.objectStore('tasks');
  await store.put(task);
}

export const deleteTask = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction('tasks', 'readwrite');
  const store = tx.objectStore('tasks');
  await store.delete(id);
}

export const deleteAllTasks = async () => {
  const db = await dbPromise;
  const tx = db.transaction('tasks', 'readwrite');
  const store = tx.objectStore('tasks');
  await store.clear();
}


// Path: src/db.js
