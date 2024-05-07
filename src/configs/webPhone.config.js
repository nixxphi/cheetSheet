
export async function makeVoiceCall(emergencyNumber) {
    try {
        window.location.href = `tel:${emergency}`;
        return 'Voice call initiated successfully';
    } catch (error) {
        console.error('Error making voice call:', error);
        throw new Error('Error making voice call');
    }
}

// Function to send an SMS
export async function sendSMS(emergencyNumber, messageBody) {
    try {
       window.location.href = `sms:${emergencyNumber}?body=${encodeURIComponent(messageBody)}`;
        return 'SMS sent successfully';
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw new Error('Error sending SMS');
    }
}
