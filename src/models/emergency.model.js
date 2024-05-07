import mongoose from 'mongoose';

const emergencySchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    contactNumber: { type: String, required: true},
    availablility: { type: boolean, default: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
})

emergencySchema.index({ location: '2dsphere' });

export const EmergencyModel = mongoose.model('EmergencyService', emergencySchema);