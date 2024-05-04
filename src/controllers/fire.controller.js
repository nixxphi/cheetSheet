import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FireModel from '../models/fire.model.js';
import { sendSMS, makeVoiceCall } from '../configs/webPhone.config.js';

// Define path to the emergency messages JSON file
const emergencyMessagesPath = path.join(__dirname, '..', 'data', 'emergency_messages.json');

class FireController {
    // Method to find the nearest fire station
    async findNearestFireStation(latitude, longitude) {
        try {
            // Logic to find the nearest fire station based on location coordinates
            const nearestFireStation = await FireModel.findOne({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        }
                    }
                }
            }).select('contactNumber');

            return nearestFireStation;
        } catch (error) {
            console.error('Error finding nearest fire station:', error);
            throw error;
        }
    }

    // Method to send a text message to the fire station
    async sendTextMessage(contactNumber, message) {
        try {
            // Call sendSMS function from webPhoneConfig to send the text message
            await sendSMS(message, [contactNumber]);
            return { success: true, message: 'Text message sent successfully' };
        } catch (error) {
            console.error('Error sending text message to fire station:', error);
            throw error;
        }
    }

    // Method to make a voice call to the fire station
    async makeVoiceCall(contactNumber) {
        try {
            // Call makeVoiceCall function from webPhoneConfig to make the voice call
            await makeVoiceCall(contactNumber);
            return { success: true, message: 'Voice call made successfully' };
        } catch (error) {
            console.error('Error making voice call to fire station:', error);
            throw error;
        }
    }

    // Method to handle fire emergencies
    async handleEmergency(latitude, longitude) {
        try {
            // Load emergency messages from JSON file
            const emergencyMessages = JSON.parse(fs.readFileSync(emergencyMessagesPath, 'utf8'));

            // Retrieve the message for fire emergency
            const message = emergencyMessages['fire'];

            // Find the nearest fire station
            const nearestFireStation = await this.findNearestFireStation(latitude, longitude);

            // Send text message to the nearest fire station
            await this.sendTextMessage(nearestFireStation.contactNumber, message);

            // Make voice call to the nearest fire station
            await this.makeVoiceCall(nearestFireStation.contactNumber);

            return { success: true, message: 'Fire emergency handled successfully' };
        } catch (error) {
            console.error('Error handling fire emergency:', error);
            throw error;
        }
    }
}

export default new FireController();
