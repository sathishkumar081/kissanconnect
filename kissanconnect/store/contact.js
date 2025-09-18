import { KEYS, read, write, getRoom } from './storage.js';

export const addContactSubmission = (submission) => {
  const submissions = read(KEYS.CONTACTS);
  submissions.push(submission);
  write(KEYS.CONTACTS, submissions);
  const room = getRoom(); if (room) room.collection('contact_submission').create(submission);
};

