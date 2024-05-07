import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Citizen schema
const citizenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  address: String,
  emergencyContact: String,
  medicalHistory: String
});

// Dispatcher schema
const dispatcherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shift: String,
  phoneExtension: String,
  department: String
});

// Responder schema
const responderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: String,
  certifications: [String],
  vehicle: String,
  rank: String
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  role: {
    type: String,
    enum: ['citizen', 'dispatcher', 'responder'],
    default: 'citizen'
  },
  // for different user types. This setup allows us to work with a generic user with an unspecified type
  citizenInfo: citizenSchema,
  dispatcherInfo: dispatcherSchema,
  responderInfo: responderSchema
});

// User password validator
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
