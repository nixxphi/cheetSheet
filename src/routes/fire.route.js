import express from 'express';
import FireController from '../controllers/fire.controller.js';

const FireRouter = express.Router();

// Route for handling fire emergencies
FireRouter.post('/emergency', async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const result = await FireController.handleEmergency(latitude, longitude);
        res.json(result);
    } catch (error) {
        console.error('Error handling fire emergency:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for getting the nearest fire service provider
FireRouter.get('/nearest', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const nearestFireStation = await FireController.findNearestFireStation(latitude, longitude);
        
        // Check the availability status and include it in the response
        const response = {
            ...nearestFireStation.toObject(),
            availability: nearestFireStation.isAvailable() ? 'Available' : 'Unavailable'
        };
        
        res.json(response);
    } catch (error) {
        console.error('Error finding nearest fire station:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default FireRouter;
