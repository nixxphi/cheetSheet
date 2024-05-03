import mongoose from 'mongoose';

const { Schema } = mongoose;

// Defining the schema for the FireService
const fireServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  contactNumber: {
    type: String,
    required: true,
  },
});

// Indexing the location field for geospatial queries
fireServiceSchema.index({ location: '2dsphere' });

// Creating the model using the schema
const FireModel = mongoose.model('FireService', fireServiceSchema);

export default FireModel;
