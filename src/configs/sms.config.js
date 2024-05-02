import axios from 'axios';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.MESSAGE_BIRD_API_KEY;

const sendMessage = async (messageBody, destinationNumbers, emergencyType) => {
    try {
        // Read emergency contacts from JSON file
        const emergencyContactsPath = path.join(__dirname, '..', 'data', 'emergency_contacts.json');
        const emergencyContacts = JSON.parse(fs.readFileSync(emergencyContactsPath, 'utf8'));

        // Get the contact number based on the emergency type
        const contactNumber = emergencyContacts[emergencyType];
        if (!contactNumber) {
            throw new Error(`Emergency contact number not found for type: ${emergencyType}`);
        }

        // Construct request parameters
        const encodedParams = new URLSearchParams();
        encodedParams.set('body', messageBody);
        encodedParams.set('destination', destinationNumbers.join(','));

        // Construct request options
        const requestOptions = {
            method: 'POST',
            url: 'https://messagebird-sms-gateway.p.rapidapi.com/sms',
            params: {
                username: '<REQUIRED>',
                password: '<REQUIRED>'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'messagebird-sms-gateway.p.rapidapi.com'
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

export default sendMessage;
