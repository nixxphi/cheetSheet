const mongoose = require('mongoose');



const EmergencyService = new  mongoose.Schema({
    incidentType: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['point'],
            required: true
        },
         coordinates: {
            type: [Number],
            enum: ['open', 'in-progress', 'closed'],
            default: ['open']
        },
    },
    description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['open', 'in-progress', 'closed'],
        default: 'open',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
    
});
  
EmergencyService.index({location:"2dsphere"}); //create the index for geospatial queries

const databaseService =  mongoose.model( "EmergencyService", EmergencyService);

module.exports = databaseService
