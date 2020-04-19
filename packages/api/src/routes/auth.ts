import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const authRouter = Router();

/**
 * 1. Check if user with email exists (throw error if not)
 * 2. Compare passwords (throw error if incorrect)
 * 3. Generate a new token, and encrypt the user data in the token
 * 4. Send back the token
 */

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  const throwError = () => {
    res.status(404);
    res.json({
      error: 'Invalid login credentials',
    });
  };
  // don't make the error msg something like 'User not found'
  // bc a potential hacker could find out if someone is/is not in the system
  // don't be too specific about what's incorrect

  if (!user) return throwError();
  if (!bcrypt.compareSync(password, user.password)) return throwError();

  const { password: p, ...userData } = user.toJSON() as User;
  // we're keeping the password out of the token JUST in case someone managed to crack the token and get the password
  const token = jwt.sign(userData, JWT_SECRET);

  res.json({
    token,
  });
});
