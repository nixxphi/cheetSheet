import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import dbRouter from './routes/dB.route.js';
import policeRouter from './routes/police.route.js';
import fireRouter from './routes/fire.route.js';
import medicalRouter from './routes/medical.route.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev')); 
app.use(cors()); 

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/db', dbRouter);
app.use('/api/police', policeRouter);
app.use('/api/fire', fireRouter);
app.use('/api/medical', medicalRouter);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Emergency Services API');
});

// Start the server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
