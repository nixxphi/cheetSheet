import express from 'express';
import MedicalController from '../controllers/medical.controller.js';

const MedicalRouter = express.Router();

// Route to handle medical emergency
MedicalRouter.post('/emergency', async (req, res) => {
    try {
        const { type, latitude, longitude } = req.body;
        const result = await MedicalController.handleEmergency(type, latitude, longitude);
        res.json(result);
    } catch (error) {
        console.error('Error handling medical emergency:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get the nearest medical service provider
MedicalRouter.get('/nearest', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const nearestMedicalService = await MedicalController.findNearestMedical(latitude, longitude);
        res.json(nearestMedicalService);
    } catch (error) {
        console.error('Error finding nearest medical service provider:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default MedicalRouter;
