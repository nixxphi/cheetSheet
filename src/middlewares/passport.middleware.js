import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './models/user.model.js';
import { userService } from '../services/index.service'
// Please make sure that user model is in the right place. I mean you David.

// Using local strategy for username/password authentication
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    // To find user by email
    const user = await User.findOne({ email });

    // If the user isn't found or the password is wrong.
    if (!user || !await user.isValidPassword(password)) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // Authentication successful, return user, yay!!
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// JWT strategy for token-based authentication
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}, async (payload, done) => {
  try {
    // Find user by ID from JWT payload
    const user = await User.findById(payload.id);

    // If user not found
    if (!user) {
      return done(null, false);
    }

    // Authentication successful, return user
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

export default passport;
