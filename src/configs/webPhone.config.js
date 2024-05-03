import axios from 'axios';

// Function to send an SMS message
async function sendSMS(messageBody, destinationNumbers) {
    try {
        // Construct request data
        const smsData = {
            body: messageBody,
            to: destinationNumbers,
        };

        // Send SMS message using Twilio API
        const response = await axios.post(`${process.env.TWILIO_API_URL}/messages`, smsData, {
            auth: {
                username: process.env.TWILIO_ACCOUNT_SID,
                password: process.env.TWILIO_AUTH_TOKEN,
            },
        });

        console.log('SMS message sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error.response.data);
        throw error;
    }
}

// Function to make a voice call
async function makeVoiceCall(messageBody, destinationNumber) {
    try {
        // Construct request data
        const callData = {
            twiml: `<Response><Say>${messageBody}</Say></Response>`,
            to: destinationNumber,
        };

        // Make voice call using Twilio API
        const response = await axios.post(`${process.env.TWILIO_API_URL}/calls`, callData, {
            auth: {
                username: process.env.TWILIO_ACCOUNT_SID,
                password: process.env.TWILIO_AUTH_TOKEN,
            },
        });

        console.log('Voice call initiated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error making voice call:', error.response.data);
        throw error;
    }
}

export default {
    sendSMS,
    makeVoiceCall,
};
