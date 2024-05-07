import express from 'express';
import passport from 'passport';
import { generateJwtToken } from '../utils/jwt.utils.js';
import { authenticateUser } from './passport.middleware.js';

const authRouter = express.Router();

// start with the route for user login and authentication
authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user) {
      // error messages for different authentication failures
      if (info && info.message === 'Missing credentials') {
        return res.status(400).json({ message: 'Missing email or password' });
      }
      if (info && info.message === 'Invalid email') {
        return res.status(401).json({ message: 'User not found' });
      }
      if (info && info.message === 'Invalid password') {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // When the user is found and authenticated, generates JWT token
    const token = generateJwtToken(user);
    return res.status(200).json({ token });
  })(req, res, next);
});

authRouter.get('/profile', authenticateUser, (req, res) => {
  res.json(req.user);
});

export default authRouter;
