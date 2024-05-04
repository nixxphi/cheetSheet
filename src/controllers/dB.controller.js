import mongoose from 'mongoose';

// Define schema for services
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // Type of service (e.g., fire, police, ambulance)
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    contactNumber: { type: String, required: true }
});

// Create Mongoose model for services
const Service = mongoose.model('Service', serviceSchema);

// Database controller for services
const dbController = {
    // Create operation for services
    createService: async (data) => {
        try {
            return await Service.create(data);
        } catch (error) {
            console.error('Error creating service:', error);
            throw error;
        }
    },

    // Read operation for all services
    getAllServices: async () => {
        try {
            return await Service.find();
        } catch (error) {
            console.error('Error getting all services:', error);
            throw error;
        }
    },

    // Read operation for service by ID
    getServiceById: async (id) => {
        try {
            return await Service.findById(id);
        } catch (error) {
            console.error('Error getting service by ID:', error);
            throw error;
        }
    },

    // Update operation for service
    updateService: async (id, newData) => {
        try {
            return await Service.findByIdAndUpdate(id, newData, { new: true });
        } catch (error) {
            console.error('Error updating service:', error);
            throw error;
        }
    },

    // Delete operation for service
    deleteService: async (id) => {
        try {
            return await Service.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting service:', error);
            throw error;
        }
    }
};

export default dbController;
