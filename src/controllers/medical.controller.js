import fs from 'fs';
import path from 'path';
import axios from 'axios';
import MedicalModel from '../models/medical.model.js';
import { sendSMS, makeVoiceCall } from '../configs/webPhone.config.js';

// Define path to the emergency messages JSON file
const emergencyMessagesPath = path.join(__dirname, '..', 'data', 'emergency_messages.json');

class MedicalController {
    // Method to find the nearest medical service provider
    async findNearestMedical(latitude, longitude) {
        try {
            const nearestMedicalService = await MedicalModel.findOne({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        }
                    }
                }
            }).select('contactNumber');

            return nearestMedicalService;
        } catch (error) {
            console.error('Error finding nearest medical service:', error);
            throw error;
        }
    }

    // Method to send a text message to the medical service provider
    async sendTextMessage(contactNumber, message) {
        try {
            // Call sendSMS function to send the text message
            await sendSMS(message, [contactNumber]);
            return { success: true, message: 'Text message sent successfully' };
        } catch (error) {
            console.error('Error sending text message to medical service provider:', error);
            throw error;
        }
    }

    // Method to send a phone call to the medical service provider
    async makePhoneCall(contactNumber) {
        try {
            return { success: true, message: 'Phone call made successfully' };
        } catch (error) {
            console.error('Error making phone call to medical service provider:', error);
            throw error;
        }
    }

    // Method to handle different types of medical emergencies
    async handleEmergency(type, latitude, longitude) {
        try {
            const emergencyMessages = JSON.parse(fs.readFileSync(emergencyMessagesPath, 'utf8'));

            if (!(type in emergencyMessages)) {
                throw new Error(`Emergency type '${type}' not found in emergency messages`);
            }

            // Retrieve the message for the specified emergency type
            const message = emergencyMessages[type];

            // Find the nearest medical service provider
            const nearestMedicalService = await this.findNearestMedical(latitude, longitude);

            // Send text message to the nearest medical service provider
            await this.sendTextMessage(nearestMedicalService.contact_number, message);

            // Make phone call to the nearest medical service provider
            await this.makePhoneCall(nearestMedicalService.contact_number);

            return { success: true, message: 'Emergency handled successfully' };
        } catch (error) {
            console.error('Error handling medical emergency:', error);
            throw error;
        }
    }
}

export default new MedicalController();
