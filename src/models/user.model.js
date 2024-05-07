import mongoose from 'mongoose';

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
    }
  },
  role: {
    type: String,
    enum: ['citizen', 'responder', 'admin'],
    default: 'citizen'
  },
});

const User = mongoose.model('User', userSchema);

export default User;
