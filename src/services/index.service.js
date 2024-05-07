import mongoose from 'mongoose';
import GenericService from './generic.service.js';
import PoliceModel from '../models/police.model.js';
import FireModel from '../models/fire.model.js';
import MedicalModel from '../models/medical.model.js';

// Instantiating generic services for specific objects
const policeService = new GenericService(PoliceModel);
const fireService = new GenericService(FireModel);
const medicalService = new GenericService(MedicalModel);

/**
 * Request aid from multiple emergency services.
 * @param {Object} request - Request data containing police, fire, and medical details.
 * @returns {Promise<Array>} Array of responses from each service.
 */
const requestAid = async (request) => {
    try {
        // To validate the request data that we may avoid shege
        if (!request || typeof request !== 'object') {
            throw new Error('Invalid request data.');
        }

        if (!request.police || !request.fire || !request.medical) {
            throw new Error('Missing required fields in request data.');
        }

        let responses = [];

        // For requesting aid from police service
        const policeResponse = await policeService.create(request.police);
        responses.push(policeResponse);

        // For requesting aid from fire service, this comes with medical aid as well.
        const fireRequest = { ...request.fire, medical: request.medical };
        const fireResponse = await fireService.create(fireRequest);
        responses.push(fireResponse);

        // For requesting medical assistance
        const medicalResponse = await medicalService.create(request.medical);
        responses.push(medicalResponse);

        return responses;
    } catch (error) {
        console.error('Error requesting aid:', error);
        throw new Error('An error occurred while processing the request.');
    }
};

export {
    policeService,
    fireService,
    medicalService,
    requestAid
};
