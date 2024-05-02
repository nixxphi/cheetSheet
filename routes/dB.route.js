import express from 'express';
import dbController from '../controllers/dbController.js';

const router = express.Router();

// Route for creating a new service
router.post('/services', async (req, res) => {
    try {
        const data = req.body;
        const createdService = await dbController.createService(data);
        res.status(201).json(createdService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for retrieving all services
router.get('/services', async (req, res) => {
    try {
        const services = await dbController.getAllServices();
        res.json(services);
    } catch (error) {
        console.error('Error getting all services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for retrieving a specific service by ID
router.get('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const service = await dbController.getServiceById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.error('Error getting service by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for updating an existing service
router.put('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatedService = await dbController.updateService(id, newData);
        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(updatedService);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for deleting an existing service
router.delete('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await dbController.deleteService(id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
