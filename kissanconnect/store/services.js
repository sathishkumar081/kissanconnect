import { KEYS, read, write, getRoom } from './storage.js';

export const getAgriServices = () => read(KEYS.AGRI_SERVICES);
export const addAgriService = (kind, data) => {
  const all = getAgriServices();
  const id = `${kind}${Date.now()}`;
  const entry = { id, ...data };
  if (kind === 'tractor') all.tractors.push(entry);
  else if (kind === 'drone') all.drones.push(entry);
  else if (kind === 'fertilizer' && all.fertilizers) all.fertilizers.push(entry);
  write(KEYS.AGRI_SERVICES, all);
  const room = getRoom(); if (room) try { room.collection('agri_service').create({ kind, ...entry }); } catch(e) {}
};

