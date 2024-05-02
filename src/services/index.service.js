
import mongoose from 'mongoose';
import GenericService from './generic.service.js';
import PoliceModel from './models/police.model.js';
import FireModel from './models/fire.model.js';
import MedicalModel from './models/medical.model.js';

// Instantiate generic services for specific objects
const policeService = new GenericService(PoliceModel);
const fireService = new GenericService(FireModel);
const medicalService = new GenericService(MedicalModel);

// Function to request aid from services
const requestAid = async (request) => {
    try {
        let responses = [];

        // Request aid from police service
        const policeResponse = await policeService.create(request.police);
        responses.push(policeResponse);

        // Request aid from fire service
        const fireRequest = { ...request.fire, medical: request.medical }; // Include medical services in fire request
        const fireResponse = await fireService.create(fireRequest);
        responses.push(fireResponse);

        // Request medical assistance
        const medicalResponse = await medicalService.create(request.medical);
        responses.push(medicalResponse);

        return responses;
    } catch (error) {
        console.error('Error requesting aid:', error);
        throw error;
    }
};

// Export services and requestAid function
export {
    policeService,
    fireService,
    medicalService,
    requestAid
};
