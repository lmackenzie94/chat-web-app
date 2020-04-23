import { Router } from 'express';

export const meRouter = Router();

// gets your user info
meRouter.get('/', async (_req, res) => {
  // we decrypted the token in 'auth.ts' and passed it to here on the locals property of 'res'
  const { id, firstName, lastName, email } = res.locals.user;
  res.json({ id, firstName, lastName, email });
});
