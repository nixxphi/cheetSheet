const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
    unique: true
  },
  Username: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  Location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

UserSchema.index({ Location: '2dsphere' });

const userSchema = mongoose.model('User', UserSchema);

module.exports = userSchema