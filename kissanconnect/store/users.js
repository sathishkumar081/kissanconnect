import { KEYS, read, write } from './storage.js';

export const getUsers = () => read(KEYS.USERS);
export const addUser = (userData) => {
  const users = getUsers();
  if (users.find(u => u.email === userData.email)) return false;
  const newUser = { id: `${userData.role}${Date.now()}`, ...userData };
  users.push(newUser);
  write(KEYS.USERS, users);
  return true;
};
export const getFarmerById = (id) => getUsers().find(u => u.id === id && u.role === 'farmer');

