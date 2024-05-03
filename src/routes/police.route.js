import express from 'express';
import PoliceController from '../controllers/police.controller.js';

const PoliceRouter = express.Router();

// Route to handle emergency requests to police
PoliceRouter.post('/emergency', async (req, res) => {
    try {
        const { type, latitude, longitude } = req.body;
        const result = await PoliceController.handleEmergency(type, latitude, longitude);
        res.json(result);
    } catch (error) {
        console.error('Error handling police emergency:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Route to find the nearest police station
PoliceRouter.get('/nearest', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const nearestPoliceStation = await PoliceController.findNearestPolice(latitude, longitude);
        res.json(nearestPoliceStation);
    } catch (error) {
        console.error('Error finding nearest police station:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default PoliceRouter;
