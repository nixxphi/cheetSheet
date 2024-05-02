import axios from 'axios';
import fs from 'fs';
import path from 'path';
import PoliceModel from '../models/police.model.js';

// Define path to the emergency messages JSON file
const emergencyMessagesPath = path.join(__dirname, '..', 'data', 'emergency_messages.json');

// Define path to the phone numbers JSON file
const phoneNumbersPath = path.join(__dirname, '..', 'data', 'phone_numbers.json');

// Import sendMessage function from sms.config.js
import sendNetMessage from '../config/sms.config.js';

class PoliceController {
    // Method to find the nearest police station
    async findNearestPolice(latitude, longitude) {
        try {
            // Logic to find the nearest police station based on location coordinates
            // For simplicity, let's assume you have a geospatial index on the location field
            const nearestPoliceStation = await PoliceModel.findOne({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        }
                    }
                }
            }).select('contact_number');

            return nearestPoliceStation;
        } catch (error) {
            console.error('Error finding nearest police station:', error);
            throw error;
        }
    }

    // Method to send a text message to the police station
    async sendTextMessage(contactNumber, message) {
        try {
            // Call sendNetMessage function to send the text message
            await sendNetMessage(message, [contactNumber]);
            return { success: true, message: 'Text message sent successfully' };
        } catch (error) {
            console.error('Error sending text message to police station:', error);
            throw error;
        }
    }

    // Method to send a phone call to the police station
    async makePhoneCall(contactNumber) {
        try {
            // Load phone numbers from JSON file
            const phoneNumbers = JSON.parse(fs.readFileSync(phoneNumbersPath, 'utf8'));

            // Check if the contact number exists in the phone numbers
            if (!phoneNumbers.includes(contactNumber)) {
                throw new Error(`Contact number '${contactNumber}' not found in allowed phone numbers`);
            }

            // Logic to make a phone call to the specified contact number

            
            return { success: true, message: 'Phone call made successfully' };
        } catch (error) {
            console.error('Error making phone call to police station:', error);
            throw error;
        }
    }

    // Method to handle different types of police emergencies
    async handleEmergency(type, latitude, longitude) {
        try {
            // Load emergency messages from JSON file
            const emergencyMessages = JSON.parse(fs.readFileSync(emergencyMessagesPath, 'utf8'));

            // Check if the emergency type exists in the messages
            if (!(type in emergencyMessages)) {
                throw new Error(`Emergency type '${type}' not found in emergency messages`);
            }

            // Retrieve the message for the specified emergency type
            const message = emergencyMessages[type];

            // Find the nearest police station
            const nearestPoliceStation = await this.findNearestPolice(latitude, longitude);

            // Send text message to the nearest police station
            await this.sendTextMessage(nearestPoliceStation.contact_number, message);

            // Make phone call to the nearest police station
            await this.makePhoneCall(nearestPoliceStation.contact_number);

            return { success: true, message: 'Emergency handled successfully' };
        } catch (error) {
            console.error('Error handling police emergency:', error);
            throw error;
        }
    }
}

export default new PoliceController();
