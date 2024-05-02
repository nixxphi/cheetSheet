import mongoose from 'mongoose';

// Define schema for emergency service providers
const emergencyServiceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // Hospital, Fire Station, Police Station
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    contact_number: { type: String, required: true }
});

// Create Mongoose model for emergency service providers
const EmergencyServiceProvider = mongoose.model('EmergencyServiceProvider', emergencyServiceProviderSchema);

// Database controller for emergency app
const dbController = {
    // Create operation for emergency service providers
    createEmergencyServiceProvider: async (data) => {
        try {
            return await EmergencyServiceProvider.create(data);
        } catch (error) {
            console.error('Error creating emergency service provider:', error);
            throw error;
        }
    },

    // Read operation for all emergency service providers
    getAllEmergencyServiceProviders: async () => {
        try {
            return await EmergencyServiceProvider.find();
        } catch (error) {
            console.error('Error getting all emergency service providers:', error);
            throw error;
        }
    },

    // Read operation for emergency service provider by ID
    getEmergencyServiceProviderById: async (id) => {
        try {
            return await EmergencyServiceProvider.findById(id);
        } catch (error) {
            console.error('Error getting emergency service provider by ID:', error);
            throw error;
        }
    },

    // Update operation for emergency service provider
    updateEmergencyServiceProvider: async (id, newData) => {
        try {
            return await EmergencyServiceProvider.findByIdAndUpdate(id, newData, { new: true });
        } catch (error) {
            console.error('Error updating emergency service provider:', error);
            throw error;
        }
    },

    // Delete operation for emergency service provider
    deleteEmergencyServiceProvider: async (id) => {
        try {
            return await EmergencyServiceProvider.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting emergency service provider:', error);
            throw error;
        }
    },

    // Additional method: Get emergency service providers by type
    getEmergencyServiceProvidersByType: async (type) => {
        try {
            return await EmergencyServiceProvider.find({ type });
        } catch (error) {
            console.error('Error getting emergency service providers by type:', error);
            throw error;
        }
    }
};

export default dbController;
