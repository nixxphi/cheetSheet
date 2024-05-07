import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from './models/user.model.js'; 

// Configuring local strategy(which i just found on stackOF) for username/password authentication.Lets hope this works right.
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // Find user by username in the database
        const user = await User.findOne({ username });

        // If user not found or password does not match, return error
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect username or password' });
        }

        // If the user is found and the password matches...
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Configuring JWT strategy for token-based authentication
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        // Find user by ID in the database
        const user = await User.findById(payload.id);

        // If user not found, return error
        if (!user) {
            return done(null, false);
        }

        // If user found, return user object
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

export default passport;
