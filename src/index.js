import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import mainRouter from './routes/main.route.js';
import { requestAid } from './services/index.service.js';
import { getLocation } from './utils/location.utils.js';
import synonymMapping from './utils/synonymMapping.utils.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/v1/', mainRouter);

// Route to handle emergency requests
app.post('/api/v1/emergency', async (req, res) => {
    try {
        const { type, location } = req.body;

        // For determining the appropriate emergency service based on the type
        let serviceType = synonymMapping[type.toLowerCase()];
        if (!serviceType) {
            return res.status(400).json({ message: 'Invalid emergency type' });
        }

        // Get the user's location
        const { latitude, longitude } = await getLocation(location);

        // Request aid from the appropriate service
        const result = await requestAid({ [serviceType]: { type, latitude, longitude } });

        // Respond with the result
        res.json(result);
    } catch (error) {
        console.error('Error handling emergency:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Save!Me API');
});

// Starting the server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
