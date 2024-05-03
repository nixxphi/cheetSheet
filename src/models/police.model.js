import mongoose from 'mongoose';

// Defining the schema for the police service
const PoliceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

// Creating a model for the police service
const PoliceModel = mongoose.model('Police', PoliceSchema);

export default PoliceModel;
