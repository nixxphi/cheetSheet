import axios from 'axios';
import fs from 'fs';
import path from 'path';

const sendNetMessage = async (messageBody, destinationNumbers, options = {}) => {
    try {
        // Construct request parameters
        const encodedParams = new URLSearchParams();
        encodedParams.set('body', messageBody);
        encodedParams.set('destination', destinationNumbers.join(','));

        // Add optional parameters
        Object.entries(options).forEach(([key, value]) => {
            encodedParams.set(key, value);
        });

        // Construct request options
        const requestOptions = {
            method: 'POST',
            url: process.env.API_URL,
            params: {
                username: options.username,
                password: options.password
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-API-Key': process.env.API_KEY,
                'X-API-Host': process.env.API_HOST
            },
            data: encodedParams
        };

        // Send SMS message
        const response = await axios.request(requestOptions);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

// Load emergency messages from JSON file
const emergencyMessagesPath = path.join(__dirname, 'data', 'emergency_messages.json');
const emergencyMessages = JSON.parse(fs.readFileSync(emergencyMessagesPath, 'utf8'));

// Load emergency contacts from JSON file
const emergencyContactsPath = path.join(__dirname, 'data', 'emergency_contacts.json');
const emergencyContacts = JSON.parse(fs.readFileSync(emergencyContactsPath, 'utf8'));

export { sendNetMessage, emergencyMessages, emergencyContacts };
