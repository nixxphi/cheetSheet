import express from 'express';
import GenericServiceController from '../controllers/genericServiceController.js';

const dbrouter = express.Router();
const serviceController = new GenericServiceController();

// Route for creating a new service
dbrouter.post('/services', async (req, res) => {
    try {
        const data = req.body;
        const createdService = await serviceController.create(data);
        res.status(201).json(createdService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for retrieving all services
dbrouter.get('/services', async (req, res) => {
    try {
        const services = await serviceController.getAll();
        res.json(services);
    } catch (error) {
        console.error('Error getting all services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for retrieving a specific service by ID
dbrouter.get('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const service = await serviceController.getById(id);
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
dbrouter.put('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatedService = await serviceController.update(id, newData);
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
dbrouter.delete('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await serviceController.delete(id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default dbrouter;
