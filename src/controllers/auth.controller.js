import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js'; 

// Controller function for user login
async function login(req, res, next) {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
        req.login(user, { session: false }, async (err) => {
            if (err) {
                return next(err);
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ token });
        });
    })(req, res, next);
}

// Controller function for user registration
async function register(req, res, next) {
    try {
        const { username, password } = req.body;
        // Check if user with the given username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return next(error);
    }
}

export { login, register };
