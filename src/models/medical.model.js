import mongoose from 'mongoose';

// Define the schema for the medical service
const medicalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    contactNumber: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
});

// Creating geospatial index for location
medicalSchema.index({ location: '2dsphere' });

// Create a model using the schema
const MedicalModel = mongoose.model('Medical', medicalSchema);

export default MedicalModel;
